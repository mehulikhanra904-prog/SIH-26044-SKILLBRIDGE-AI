import mongoose from "mongoose";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import Student from "../models/Student.js";

const normalizeSkills = (skills) => {
  const values = Array.isArray(skills) ? skills : String(skills || "").split(",");
  return [...new Set(values.map((skill) => String(skill).trim()).filter(Boolean))];
};

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const toJobResponse = (job, recommendation = {}) => ({
  id: job._id,
  title: job.title,
  type: job.type,
  location: job.location,
  salary: job.salary,
  experience: job.experience,
  skills: job.skills,
  deadline: job.deadline,
  description: job.description,
  status: job.status,
  createdAt: job.createdAt,
  company: {
    id: job.company?._id,
    name: job.company?.companyName || job.company?.user?.name || "Company",
  },
  ...recommendation,
});

const getCompanyProfile = (userId) => Company.findOne({ user: userId });

// @route POST /api/jobs
// @access Private / Company
const createJob = async (req, res, next) => {
  try {
    const { title, type, location, salary, experience, skills, deadline, description, status } = req.body;
    const requiredSkills = normalizeSkills(skills);

    if (!title || !type || !location || !description || !deadline || !requiredSkills.length) {
      return res.status(400).json({ message: "Title, type, location, skills, description and deadline are required" });
    }
    if (Number.isNaN(new Date(deadline).getTime())) {
      return res.status(400).json({ message: "Please provide a valid application deadline" });
    }
    if (status && !["draft", "published", "closed"].includes(status)) {
      return res.status(400).json({ message: "Status must be draft, published, or closed" });
    }

    const company = await getCompanyProfile(req.user.id);
    if (!company) return res.status(404).json({ message: "Company profile not found" });

    const job = await Job.create({
      company: company._id, title, type, location, salary, experience,
      skills: requiredSkills, deadline, description, status: status || "published",
    });
    await job.populate({ path: "company", populate: { path: "user", select: "name" } });

    return res.status(201).json({ message: "Job created successfully", job: toJobResponse(job) });
  } catch (error) {
    return next(error);
  }
};

// @route GET /api/jobs/mine
// @access Private / Company
const getCompanyJobs = async (req, res, next) => {
  try {
    const company = await getCompanyProfile(req.user.id);
    if (!company) return res.status(404).json({ message: "Company profile not found" });

    const jobs = await Job.find({ company: company._id })
      .populate({ path: "company", populate: { path: "user", select: "name" } })
      .sort({ createdAt: -1 });
    return res.json({ jobs: jobs.map((job) => toJobResponse(job)) });
  } catch (error) {
    return next(error);
  }
};

// @route GET /api/jobs/recommendations
// @access Private / Student
const getRecommendedJobs = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });

    const query = { status: "published", deadline: { $gte: new Date() } };
    if (req.query.type) query.type = req.query.type;
    if (req.query.location) query.location = new RegExp(`^${escapeRegExp(req.query.location)}$`, "i");
    if (req.query.search) {
      const search = new RegExp(escapeRegExp(req.query.search), "i");
      query.$or = [{ title: search }, { location: search }, { skills: search }];
    }

    const jobs = await Job.find(query)
      .populate({ path: "company", populate: { path: "user", select: "name" } });
    const studentSkills = new Set(normalizeSkills(student.skills).map((skill) => skill.toLowerCase()));
    const preferredRole = (student.preferredRole || "").toLowerCase();
    const preferredDomain = (student.preferredDomain || "").toLowerCase();

    const recommendations = jobs.map((job) => {
      const matchedSkills = job.skills.filter((skill) => studentSkills.has(skill.toLowerCase()));
      const missingSkills = job.skills.filter((skill) => !studentSkills.has(skill.toLowerCase()));
      const skillScore = job.skills.length ? (matchedSkills.length / job.skills.length) * 85 : 0;
      const jobText = `${job.title} ${job.description} ${job.skills.join(" ")}`.toLowerCase();
      const preferenceScore = (preferredRole && jobText.includes(preferredRole) ? 10 : 0)
        + (preferredDomain && jobText.includes(preferredDomain) ? 5 : 0);
      const matchScore = Math.min(100, Math.round(skillScore + preferenceScore));

      return toJobResponse(job, { matchScore, matchedSkills, missingSkills });
    }).sort((first, second) => second.matchScore - first.matchScore || new Date(second.createdAt) - new Date(first.createdAt));

    return res.json({ recommendations });
  } catch (error) {
    return next(error);
  }
};

// @route GET /api/jobs/:id
// @access Private
const getJobById = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ message: "Job not found" });
    const job = await Job.findById(req.params.id).populate({ path: "company", populate: { path: "user", select: "name" } });
    if (!job) return res.status(404).json({ message: "Job not found" });
    return res.json({ job: toJobResponse(job) });
  } catch (error) {
    return next(error);
  }
};

const findOwnedJob = async (jobId, userId) => {
  if (!isValidId(jobId)) return null;
  const company = await getCompanyProfile(userId);
  return company ? Job.findOne({ _id: jobId, company: company._id }) : null;
};

// @route PUT /api/jobs/:id
// @access Private / Company owner
const updateJob = async (req, res, next) => {
  try {
    const job = await findOwnedJob(req.params.id, req.user.id);
    if (!job) return res.status(404).json({ message: "Job not found or access denied" });

    const fields = ["title", "type", "location", "salary", "experience", "deadline", "description", "status"];
    fields.forEach((field) => { if (req.body[field] !== undefined) job[field] = req.body[field]; });
    if (req.body.skills !== undefined) job.skills = normalizeSkills(req.body.skills);
    if (!job.skills.length) return res.status(400).json({ message: "At least one required skill is needed" });

    await job.save();
    await job.populate({ path: "company", populate: { path: "user", select: "name" } });
    return res.json({ message: "Job updated successfully", job: toJobResponse(job) });
  } catch (error) {
    return next(error);
  }
};

// @route DELETE /api/jobs/:id
// @access Private / Company owner
const deleteJob = async (req, res, next) => {
  try {
    const job = await findOwnedJob(req.params.id, req.user.id);
    if (!job) return res.status(404).json({ message: "Job not found or access denied" });
    await job.deleteOne();
    return res.json({ message: "Job deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export { createJob, getCompanyJobs, getJobById, updateJob, deleteJob, getRecommendedJobs };
