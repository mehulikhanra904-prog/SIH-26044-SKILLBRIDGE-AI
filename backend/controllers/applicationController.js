import mongoose from "mongoose";
import Application from "../models/Application.js";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import Student from "../models/Student.js";

const allowedStatuses = ["under_review", "shortlisted", "interview", "selected", "rejected"];
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const normalizeSkills = (skills = []) => skills.map((skill) => String(skill).trim().toLowerCase()).filter(Boolean);

const toApplicationResponse = (application, extra = {}) => ({
  id: application._id,
  status: application.status,
  coverLetter: application.coverLetter,
  appliedAt: application.createdAt,
  updatedAt: application.updatedAt,
  job: application.job && {
    id: application.job._id,
    title: application.job.title,
    type: application.job.type,
    location: application.job.location,
    salary: application.job.salary,
    skills: application.job.skills,
    deadline: application.job.deadline,
    company: application.job.company && {
      id: application.job.company._id,
      name: application.job.company.companyName || application.job.company.user?.name,
    },
  },
  student: application.student && {
    id: application.student._id,
    name: application.student.user?.name,
    email: application.student.user?.email,
    collegeName: application.student.collegeName,
    course: application.student.course,
    skills: application.student.skills,
    resumeUrl: application.student.resumeUrl,
  },
  ...extra,
});

const applicationPopulate = [
  { path: "job", populate: { path: "company", populate: { path: "user", select: "name" } } },
  { path: "student", populate: { path: "user", select: "name email" } },
];

// @route POST /api/applications/jobs/:jobId
// @access Private / Student
const applyToJob = async (req, res, next) => {
  try {
    if (!isValidId(req.params.jobId)) return res.status(404).json({ message: "Job not found" });
    const [student, job] = await Promise.all([
      Student.findOne({ user: req.user.id }),
      Job.findById(req.params.jobId),
    ]);
    if (!student) return res.status(404).json({ message: "Student profile not found" });
    if (!job || job.status !== "published" || job.deadline < new Date()) {
      return res.status(400).json({ message: "This job is not accepting applications" });
    }

    const existingApplication = await Application.findOne({ job: job._id, student: student._id });
    if (existingApplication) return res.status(409).json({ message: "You have already applied to this job" });

    const application = await Application.create({ job: job._id, student: student._id, coverLetter: req.body.coverLetter });
    await application.populate(applicationPopulate);
    return res.status(201).json({ message: "Application submitted successfully", application: toApplicationResponse(application) });
  } catch (error) {
    return next(error);
  }
};

// @route GET /api/applications/mine
// @access Private / Student
const getStudentApplications = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });
    const applications = await Application.find({ student: student._id }).populate(applicationPopulate).sort({ createdAt: -1 });
    return res.json({ applications: applications.map((application) => toApplicationResponse(application)) });
  } catch (error) {
    return next(error);
  }
};

// @route PATCH /api/applications/:id/withdraw
// @access Private / Student owner
const withdrawApplication = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ message: "Application not found" });
    const student = await Student.findOne({ user: req.user.id });
    const application = student && await Application.findOne({ _id: req.params.id, student: student._id });
    if (!application) return res.status(404).json({ message: "Application not found" });
    if (["selected", "rejected", "withdrawn"].includes(application.status)) {
      return res.status(400).json({ message: "This application can no longer be withdrawn" });
    }
    application.status = "withdrawn";
    await application.save();
    await application.populate(applicationPopulate);
    return res.json({ message: "Application withdrawn", application: toApplicationResponse(application) });
  } catch (error) {
    return next(error);
  }
};

// @route GET /api/applications/company
// @access Private / Company
const getCompanyApplications = async (req, res, next) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    if (!company) return res.status(404).json({ message: "Company profile not found" });
    const jobs = await Job.find({ company: company._id }).select("_id");
    const applications = await Application.find({ job: { $in: jobs.map((job) => job._id) } }).populate(applicationPopulate).sort({ createdAt: -1 });

    const results = applications.map((application) => {
      const studentSkills = new Set(normalizeSkills(application.student?.skills));
      const jobSkills = normalizeSkills(application.job?.skills);
      const matchScore = jobSkills.length ? Math.round((jobSkills.filter((skill) => studentSkills.has(skill)).length / jobSkills.length) * 100) : 0;
      return toApplicationResponse(application, { matchScore });
    });
    return res.json({ applications: results });
  } catch (error) {
    return next(error);
  }
};

// @route PATCH /api/applications/:id/status
// @access Private / Company that owns the job
const updateApplicationStatus = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ message: "Application not found" });
    if (!allowedStatuses.includes(req.body.status)) {
      return res.status(400).json({ message: "Please provide a valid application status" });
    }
    const company = await Company.findOne({ user: req.user.id });
    const application = company && await Application.findById(req.params.id).populate("job");
    if (!application || String(application.job.company) !== String(company._id)) {
      return res.status(404).json({ message: "Application not found or access denied" });
    }
    if (application.status === "withdrawn") return res.status(400).json({ message: "A withdrawn application cannot be updated" });

    application.status = req.body.status;
    await application.save();
    await application.populate(applicationPopulate);
    return res.json({ message: "Application status updated", application: toApplicationResponse(application) });
  } catch (error) {
    return next(error);
  }
};

export { applyToJob, getStudentApplications, withdrawApplication, getCompanyApplications, updateApplicationStatus };
