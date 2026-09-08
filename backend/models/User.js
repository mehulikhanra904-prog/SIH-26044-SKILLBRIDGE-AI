import mongoose from "mongoose";

// =====================================================
// USER SCHEMA
// =====================================================
// This is the main authentication model.
//
// Every user who logs into SkillBridge AI has one
// User document.
//
// Roles:
// - student
// - college
// - company
//
// Additional role-specific information can be stored
// in separate models and linked using the user's _id.
// =====================================================

const userSchema = new mongoose.Schema(
  {
    // =================================================
    // NAME
    // =================================================
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },

    // =================================================
    // EMAIL
    // =================================================
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },

    // =================================================
    // PASSWORD
    // =================================================
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,

      // Password will NOT be returned in normal queries.
      //
      // During login we explicitly request it using:
      //
      // User.findOne({ email }).select("+password")
      //
      select: false
    },

    // =================================================
    // ROLE
    // =================================================
    role: {
      type: String,
      enum: ["student", "college", "company"],
      required: [true, "Role is required"]
    }
  },

  // Automatically adds:
  // createdAt
  // updatedAt
  {
    timestamps: true
  }
);


// =====================================================
// EXPORT MODEL
// =====================================================

export default mongoose.model("User", userSchema);