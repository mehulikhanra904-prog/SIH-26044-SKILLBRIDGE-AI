import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    education: {
      type: String,
      default: ""
    },

    branch: {
      type: String,
      default: ""
    },

    graduationYear: {
      type: Number
    },

    targetRole: {
      type: String,
      default: ""
    },

    skills: [
      {
        name: {
          type: String,
          required: true
        },

        score: {
          type: Number,
          min: 0,
          max: 100,
          default: 0
        },

        level: {
          type: String,
          enum: [
            "Beginner",
            "Intermediate",
            "Advanced"
          ],
          default: "Beginner"
        },

        source: {
          type: String,
          enum: [
            "manual",
            "resume",
            "assessment",
            "project",
            "ai"
          ],
          default: "manual"
        }
      }
    ],

    projects: [
      {
        name: String,
        description: String,
        technologies: [String]
      }
    ],

    resumeText: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "StudentProfile",
  studentProfileSchema
);