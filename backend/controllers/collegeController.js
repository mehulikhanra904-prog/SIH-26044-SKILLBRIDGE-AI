import User from "../models/User.js";
import Student from "../models/Student.js";
import College from "../models/College.js";
import Application from "../models/Application.js";

const normalize = (value) => String(value || "").trim().toLowerCase();
const getCollege = async (userId) => College.findOne({ user: userId });

const getProfile = async (req, res, next) => {
  try {
    const [user, college] = await Promise.all([User.findById(req.user.id).select("name email role"), getCollege(req.user.id)]);
    if (!user || !college) return res.status(404).json({ message: "College profile not found" });
    return res.json({ college: { id: college._id, name: user.name, email: user.email, ...college.toObject() } });
  } catch (error) { return next(error); }
};

const updateProfile = async (req, res, next) => {
  try {
    const college = await getCollege(req.user.id);
    const user = await User.findById(req.user.id);
    if (!college || !user) return res.status(404).json({ message: "College profile not found" });
    if (req.body.name !== undefined) user.name = req.body.name;
    if (req.body.email !== undefined) {
      const email = String(req.body.email).trim().toLowerCase();
      const duplicate = await User.findOne({ email, _id: { $ne: user._id } });
      if (duplicate) return res.status(400).json({ message: "A user with this email already exists" });
      user.email = email;
    }
    for (const field of ["collegeName", "address", "website", "contactNumber"]) if (req.body[field] !== undefined) college[field] = req.body[field];
    await Promise.all([user.save(), college.save()]);
    return res.json({ message: "College profile updated successfully", college: { id: college._id, name: user.name, email: user.email, ...college.toObject() } });
  } catch (error) { return next(error); }
};

const listStudents = async (req, res, next) => {
  try {
    const college = await getCollege(req.user.id);
    if (!college) return res.status(404).json({ message: "College profile not found" });
    const search = normalize(req.query.search);
    const students = await Student.find({ collegeName: college.collegeName }).populate("user", "name email role").sort({ updatedAt: -1 });
    const results = students.filter((student) => {
      if (!search) return true;
      const text = [student.user?.name, student.user?.email, student.department, student.course, student.location, student.preferredRole, ...(student.skills || [])].map(normalize).join(" ");
      return text.includes(search);
    }).map((student) => ({ id: student._id, name: student.user?.name || "Student", email: student.user?.email || "", department: student.department || "Not specified", degree: student.course || "Not specified", graduationYear: student.graduationYear || null, skills: student.skills || [], role: student.preferredRole || "Not specified", location: student.location || "Not specified", resumeUrl: student.resumeUrl || "", projects: student.projects || [] }));
    return res.json({ students: results, count: results.length });
  } catch (error) { return next(error); }
};

const getAnalytics = async (req, res, next) => {
  try {
    const college = await getCollege(req.user.id);
    if (!college) return res.status(404).json({ message: "College profile not found" });
    const students = await Student.find({ collegeName: college.collegeName }).select("_id skills preferredRole department");
    const ids = students.map((student) => student._id);
    const applications = await Application.find({ student: { $in: ids } }).populate({ path: "job", populate: { path: "company", select: "companyName industry" } });
    const skillCounts = {};
    students.forEach((student) => (student.skills || []).forEach((skill) => { const key = String(skill).trim(); if (key) skillCounts[key] = (skillCounts[key] || 0) + 1; }));
    const roleCounts = {};
    students.forEach((student) => { const key = student.preferredRole || "Not specified"; roleCounts[key] = (roleCounts[key] || 0) + 1; });
    const selected = applications.filter((a) => a.status === "selected").length;
    const shortlisted = applications.filter((a) => ["shortlisted", "interview", "selected"].includes(a.status)).length;
    const companies = new Set(applications.map((a) => a.job?.company?.companyName).filter(Boolean));
    return res.json({ totalStudents: students.length, totalApplications: applications.length, shortlisted, selected, placementRate: students.length ? Math.round((selected / students.length) * 100) : 0, companiesEngaged: companies.size, topSkills: Object.entries(skillCounts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([skill, count]) => ({ skill, count })), careerRoles: Object.entries(roleCounts).sort((a, b) => b[1] - a[1]).map(([role, count]) => ({ role, count })) });
  } catch (error) { return next(error); }
};

const getStudent = async (req, res, next) => {
  try {
    const college = await getCollege(req.user.id);
    if (!college) return res.status(404).json({ message: "College profile not found" });
    const student = await Student.findById(req.params.id).populate("user", "name email role");
    if (!student || normalize(student.collegeName) !== normalize(college.collegeName)) return res.status(404).json({ message: "Student not found" });
    return res.json({ student: { id: student._id, name: student.user?.name, email: student.user?.email, department: student.department, course: student.course, graduationYear: student.graduationYear, skills: student.skills || [], preferredRole: student.preferredRole, preferredDomain: student.preferredDomain, location: student.location, resumeUrl: student.resumeUrl, projects: student.projects || [] } });
  } catch (error) { return next(error); }
};

export { getProfile, updateProfile, listStudents, getAnalytics, getStudent };
