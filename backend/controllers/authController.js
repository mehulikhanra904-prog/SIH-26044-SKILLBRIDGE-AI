import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Student from "../models/Student.js";
import College from "../models/College.js";
import Company from "../models/Company.js";
import generateToken from "../utils/generateToken.js";

const VALID_ROLES = ["student", "college", "company"];

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!name || !normalizedEmail || !password || !role) {
      return res.status(400).json({ message: "Please provide name, email, password and role" });
    }

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ message: "Role must be student, college, or company" });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "A user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    if (role === "student") {
      await Student.create({ user: user._id });
    } else if (role === "college") {
      await College.create({ user: user._id });
    } else if (role === "company") {
      await Company.create({ user: user._id });
    }

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/auth/login
// @desc    Login an existing user
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalizedEmail || !password || !role) {
      return res.status(400).json({ message: "Please provide email, password and role" });
    }

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.role || !VALID_ROLES.includes(user.role)) {
      return res.status(500).json({ message: "This account has an invalid or missing role. Please contact the administrator." });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: `This account is registered as ${user.role}. Please select ${user.role} in Login As.`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/auth/me
// @desc    Get the currently logged-in user's info
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.role || !VALID_ROLES.includes(user.role)) {
      return res.status(500).json({ message: "This account has an invalid or missing role" });
    }

    return res.status(200).json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, getMe };
