import User from "../models/User.js";
import Student from "../models/Student.js";
import { buildSkillEvidence } from "../intelligence/skillEvidence.js";

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
    const role = roleRequirements[req.query.role]
      ? req.query.role
      : "Full Stack Developer";
    const evidence = buildSkillEvidence(role, student.skills || []);
    const missing = evidence.missing;

    return res.json({
      ...evidence,
      message: evidence.score >= 80
        ? "Strong profile coverage"
        : evidence.score >= 50
          ? "Some important skills are not listed yet"
          : "Your profile needs more role-specific evidence",
      description: missing.length
        ? `Your profile does not currently list ${missing.map((skill) => skill.name).join(", ")}. Add a skill only after gaining practical experience.`
        : "All listed role requirements appear in your saved profile. Validate them with projects and practical assessments.",
      recommendations: missing.map((skill) => ({
        title: `Build evidence for ${skill.name}`,
        description: skill.priority === "critical"
          ? `Prioritize ${skill.name}. Add a small, demonstrable project or practical exercise before marking it as a strength.`
          : `Practice ${skill.name} and attach a project, coursework, or work sample to your profile.`,
        priority: skill.priority,
      })),
    });
  } catch (error) {
    return next(error);
  }
};

const ROLE_PROJECTS = {
  "Full Stack Developer": "Build and deploy a role-based application with authentication, REST APIs, database persistence, validation, and tests.",
  "AI / ML Engineer": "Build a reproducible ML project with a documented dataset, baseline, evaluation metrics, error analysis, and inference API.",
  "Data Scientist": "Complete an end-to-end analysis with data cleaning, exploratory analysis, statistical reasoning, visualizations, and a concise findings report.",
  "Frontend Developer": "Build an accessible, responsive interface with reusable components, form validation, loading/error states, and performance checks.",
};

const getCareerRoadmap = async (req, res, next) => {
  try {
    const student = await getOrCreateStudentProfile(req.user.id);
    const role = roleRequirements[req.query.role]
      ? req.query.role
      : (roleRequirements[student.preferredRole] ? student.preferredRole : "Full Stack Developer");
    const evidence = buildSkillEvidence(role, student.skills || []);
    const priorities = evidence.missing;

    const stages = [
      {
        title: "Validate your starting point",
        description: "Review the skills detected from your profile. Add only skills you can demonstrate with coursework, projects, or practical work.",
        skills: evidence.skills.filter((skill) => skill.progress).map((skill) => skill.name),
        progress: evidence.matchedCount === evidence.totalCount ? 100 : 0,
        status: evidence.matchedCount === evidence.totalCount ? "Completed" : "In Progress",
        action: "Update your profile with accurate skill evidence.",
        estimatedEffort: "30–60 minutes",
      },
      ...priorities.map((skill) => ({
        title: `Develop ${skill.name}`,
        description: skill.priority === "critical"
          ? "This is a high-priority requirement for the selected role. Learn the fundamentals and practise with a focused exercise."
          : "Build practical familiarity and connect this skill to a small, demonstrable task.",
        skills: [skill.name],
        progress: 0,
        status: "Upcoming",
        action: `Complete a practical exercise in ${skill.name} and add the evidence to your profile.`,
        estimatedEffort: skill.priority === "critical" ? "2–3 weeks" : "1–2 weeks",
      })),
      {
        title: "Build a role-relevant portfolio project",
        description: ROLE_PROJECTS[role],
        skills: ["Project work", "Documentation", "Testing"],
        progress: 0,
        status: "Upcoming",
        action: "Publish a working demo and document the decisions, trade-offs, and limitations.",
        estimatedEffort: "2–4 weeks",
      },
      {
        title: "Check job-readiness with evidence",
        description: "Review a real job description, map each requirement to a project or practical example, and identify remaining gaps.",
        skills: ["Portfolio review", "Interview practice"],
        progress: 0,
        status: "Upcoming",
        action: "Prepare two project walkthroughs and practise role-specific technical questions.",
        estimatedEffort: "1 week",
      },
    ];

    const nextStage = stages.find((stage) => stage.status !== "Completed") || stages[stages.length - 1];

    return res.json({
      role,
      readiness: evidence.score,
      readinessLabel: "Profile coverage",
      readinessDisclaimer: evidence.scoreDisclaimer,
      matchedSkills: evidence.skills.filter((skill) => skill.progress).map((skill) => skill.name),
      priorityGaps: priorities.map(({ name, priority }) => ({ name, priority })),
      stages,
      nextStep: {
        title: nextStage.title,
        description: nextStage.action,
        skills: nextStage.skills,
        estimatedEffort: nextStage.estimatedEffort,
      },
    });
  } catch (error) {
    return next(error);
  }
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
