import mongoose from "mongoose";

// Extra profile fields ONLY for users whose role is "student".
// "user" links this document back to the shared User (auth) document.
const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one Student profile per User
    },
    collegeName: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    course: {
      type: String,
      trim: true,
    },
    graduationYear: {
      type: Number,
    },
    skills: {
      type: [String],
      default: [],
    },
    resumeUrl: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    preferredRole: {
      type: String,
      trim: true,
    },
    preferredDomain: {
      type: String,
      trim: true,
    },
    resumeHeadline: {
      type: String,
      trim: true,
    },
    resumeSummary: {
      type: String,
      trim: true,
      maxlength: 3000,
    },
    projects: {
      type: [{
        name: { type: String, trim: true },
        description: { type: String, trim: true },
      }],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);