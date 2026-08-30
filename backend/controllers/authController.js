const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Student = require("../models/Student");
const College = require("../models/College");
const Company = require("../models/Company");
const generateToken = require("../utils/generateToken");

// @route   POST /api/auth/register
// @desc    Register a new user (student, college, or company)
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please provide name, email, password and role" });
    }

    if (!["student", "college", "company"].includes(role)) {
      return res.status(400).json({ message: "Role must be student, college, or company" });
    }

    // 2. Check if a user with this email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "A user with this email already exists" });
    }

    // 3. Hash the password before saving (NEVER store plain text passwords)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the core User document
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // 5. Create the matching role-specific profile document, empty for now —
    // the user can fill in details later via a "complete profile" route.
    if (role === "student") {
      await Student.create({ user: user._id });
    } else if (role === "college") {
      await College.create({ user: user._id });
    } else if (role === "company") {
      await Company.create({ user: user._id });
    }

    // 6. Generate a JWT so the user is logged in immediately after registering
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error); // hand off to the central error handler
  }
};

// @route   POST /api/auth/login
// @desc    Login an existing user
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // .select("+password") because the schema hides password by default
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the submitted password with the hashed one in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
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
// @access  Private (requires valid JWT — see middleware/authMiddleware.js)
const getMe = async (req, res, next) => {
  try {
    // req.user was attached by the verifyToken middleware
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getMe };
