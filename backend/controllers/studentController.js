import User from "../models/User.js";
import Student from "../models/Student.js";

// Builds the public student payload returned to the frontend. Password is never
// selected from the User model, so it cannot be exposed through this endpoint.
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
  },
});

// @route   GET /api/students/profile
// @desc    Get the profile belonging to the authenticated student
// @access  Private / Student
const getStudentProfile = async (req, res, next) => {
  try {
    const [user, student] = await Promise.all([
      User.findById(req.user.id),
      Student.findOne({ user: req.user.id }),
    ]);

    if (!user || !student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    return res.status(200).json({ student: formatStudent(user, student) });
  } catch (error) {
    return next(error);
  }
};

// @route   PUT /api/students/profile
// @desc    Update the profile belonging to the authenticated student
// @access  Private / Student
const updateStudentProfile = async (req, res, next) => {
  try {
    const {
      name,
      email,
      collegeName,
      department,
      course,
      graduationYear,
      skills,
      resumeUrl,
      phone,
      location,
      preferredRole,
      preferredDomain,
    } = req.body;
    const user = await User.findById(req.user.id);
    const student = await Student.findOne({ user: req.user.id });

    if (!user || !student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    if (name !== undefined) user.name = name;

    if (email !== undefined) {
      const normalizedEmail = String(email).trim().toLowerCase();
      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: user._id },
      });

      if (existingUser) {
        return res.status(400).json({ message: "A user with this email already exists" });
      }

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

    if (graduationYear !== undefined) {
      const year = Number(graduationYear);
      if (!Number.isInteger(year)) {
        return res.status(400).json({ message: "Graduation year must be a whole number" });
      }
      student.graduationYear = year;
    }

    if (skills !== undefined) {
      if (!Array.isArray(skills) || !skills.every((skill) => typeof skill === "string")) {
        return res.status(400).json({ message: "Skills must be an array of strings" });
      }
      student.skills = skills.map((skill) => skill.trim()).filter(Boolean);
    }

    await Promise.all([user.save(), student.save()]);

    return res.status(200).json({
      message: "Student profile updated successfully",
      student: formatStudent(user, student),
    });
  } catch (error) {
    return next(error);
  }
};

export { getStudentProfile, updateStudentProfile };
