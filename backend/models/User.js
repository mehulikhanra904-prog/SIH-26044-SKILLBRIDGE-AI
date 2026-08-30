const mongoose = require("mongoose");

// This is the CORE authentication model.
// Every person who logs in (student, college, or company) has one User document.
// Role-specific extra info lives in separate Student/College/Company models,
// linked back to this one via the "user" field (see those model files).
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never return password field by default in queries
    },
    role: {
      type: String,
      enum: ["student", "college", "company"],
      required: [true, "Role is required"],
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

module.exports = mongoose.model("User", userSchema);
