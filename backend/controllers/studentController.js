import User from "../models/User.js";
import Student from "../models/Student.js";

const roleRequirements = {
  "Full Stack Developer": ["React", "Node.js", "REST APIs", "Docker", "Git"],
  "AI / ML Engineer": ["Python", "Machine Learning", "Deep Learning", "NLP", "SQL"],
  "Data Scientist": ["Python", "SQL", "Statistics", "Pandas", "Machine Learning"],
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Accessibility"],
};

const normalize = (value) => String(value || "").trim().toLowerCase();

const getOrCreateStudentProfile = (userId) =>
  Student.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

const analyzeSkills = async (req, res, next) => {
  try {
    const student = await getOrCreateStudentProfile(req.user.id);
    const role = roleRequirements[req.query.role] ? req.query.role : "Full Stack Developer";
    const currentSkills = new Set((student.skills || []).map(normalize));
    const skills = roleRequirements[role].map((name) => {
      const present = currentSkills.has(normalize(name));
      return { name, required: "Industry relevant", progress: present ? 100 : 0, status: present ? "Strong" : "Skill Gap", className: present ? "strong" : "missing" };
    });
    const score = Math.round((skills.filter((skill) => skill.progress > 0).length / skills.length) * 100);
    const missing = skills.filter((skill) => !currentSkills.has(normalize(skill.name)));
    return res.json({ role, score, message: score >= 80 ? "Strong Progress" : score >= 50 ? "Good Progress" : "Needs Improvement", description: missing.length ? `Add or strengthen ${missing.map((skill) => skill.name).join(", ")} to improve your readiness for this role.` : "Your saved profile skills cover the current requirements for this role.", skills, recommendations: missing.map((skill) => ({ title: `Learn ${skill.name}`, description: `Add practical ${skill.name} experience through a project, course, or application.` })) });
  } catch (error) { return next(error); }
};

const getCareerRoadmap = async (req, res, next) => {
  try {
    const student = await getOrCreateStudentProfile(req.user.id);
    const role = roleRequirements[req.query.role] ? req.query.role : (roleRequirements[student.preferredRole] ? student.preferredRole : "Full Stack Developer");
    const currentSkills = new Set((student.skills || []).map(normalize));
    const stages = [
      { title: "Core Foundations", skills: role === "Frontend Developer" ? ["HTML", "CSS", "JavaScript"] : ["JavaScript", "Git"] },
      { title: "Role Fundamentals", skills: roleRequirements[role].slice(0, 2) },
      { title: "Production Skills", skills: roleRequirements[role].slice(2, 4) },
      { title: "Portfolio Project", skills: ["Projects", "Documentation"] },
    ].map((stage) => {
      const matched = stage.skills.filter((skill) => currentSkills.has(normalize(skill))).length;
      const progress = Math.round((matched / stage.skills.length) * 100);
      return { ...stage, progress, status: progress === 100 ? "Completed" : progress > 0 ? "In Progress" : "Upcoming", description: progress === 100 ? "Your saved profile shows these skills are covered." : `Build practical experience with ${stage.skills.join(", ")}.` };
    });
    const nextStage = stages.find((stage) => stage.progress < 100) || stages[stages.length - 1];
    return res.json({ role, readiness: Math.round(stages.reduce((total, stage) => total + stage.progress, 0) / stages.length), stages, nextStep: nextStage });
  } catch (error) { return next(error); }
};

const formatStudent = (user, student) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  profile: {
    id: student._id,
    collegeName: student.collegeName,
    department: student.department,
    course: student.course,
    graduationYear: student.graduationYear,
    skills: student.skills,
    resumeUrl: student.resumeUrl,
    phone: student.phone,
    location: student.location,
    preferredRole: student.preferredRole,
    preferredDomain: student.preferredDomain,
    resumeHeadline: student.resumeHeadline,
    resumeSummary: student.resumeSummary,
    projects: student.projects,
  },
});

const getStudentProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Student user not found" });
    const student = await getOrCreateStudentProfile(req.user.id);
    return res.status(200).json({ student: formatStudent(user, student) });
  } catch (error) { return next(error); }
};

const updateStudentProfile = async (req, res, next) => {
  try {
    const { name, email, collegeName, department, course, graduationYear, skills, resumeUrl, phone, location, preferredRole, preferredDomain, resumeHeadline, resumeSummary, projects } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Student user not found" });
    const student = await getOrCreateStudentProfile(req.user.id);
    if (name !== undefined) user.name = name;
    if (email !== undefined) {
      const normalizedEmail = String(email).trim().toLowerCase();
      const existingUser = await User.findOne({ email: normalizedEmail, _id: { $ne: user._id } });
      if (existingUser) return res.status(400).json({ message: "A user with this email already exists" });
      user.email = normalizedEmail;
    }
    if (collegeName !== undefined) student.collegeName = collegeName;
    if (department !== undefined) student.department = department;
    if (course !== undefined) student.course = course;
    if (resumeUrl !== undefined) student.resumeUrl = resumeUrl;
    if (phone !== undefined) student.phone = phone;
    if (location !== undefined) student.location = location;
    if (preferredRole !== undefined) student.preferredRole = preferredRole;
    if (preferredDomain !== undefined) student.preferredDomain = preferredDomain;
    if (resumeHeadline !== undefined) student.resumeHeadline = resumeHeadline;
    if (resumeSummary !== undefined) student.resumeSummary = resumeSummary;
    if (projects !== undefined) {
      if (!Array.isArray(projects) || !projects.every((project) => project && typeof project.name === "string" && typeof project.description === "string")) return res.status(400).json({ message: "Projects must be an array with name and description" });
      student.projects = projects.map((project) => ({ name: project.name.trim(), description: project.description.trim() })).filter((project) => project.name || project.description);
    }
    if (graduationYear !== undefined) {
      const year = Number(graduationYear);
      if (!Number.isInteger(year)) return res.status(400).json({ message: "Graduation year must be a whole number" });
      student.graduationYear = year;
    }
    if (skills !== undefined) {
      if (!Array.isArray(skills) || !skills.every((skill) => typeof skill === "string")) return res.status(400).json({ message: "Skills must be an array of strings" });
      student.skills = skills.map((skill) => skill.trim()).filter(Boolean);
    }
    await Promise.all([user.save(), student.save()]);
    return res.status(200).json({ message: "Student profile updated successfully", student: formatStudent(user, student) });
  } catch (error) { return next(error); }
};

export { getStudentProfile, updateStudentProfile, analyzeSkills, getCareerRoadmap };
