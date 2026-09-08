import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    salary: { type: String, trim: true },
    experience: { type: String, trim: true },
    skills: { type: [String], required: true, default: [] },
    deadline: { type: Date, required: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "published",
    },
  },
  { timestamps: true }
);

jobSchema.index({ status: 1, deadline: 1 });
jobSchema.index({ company: 1, createdAt: -1 });

export default mongoose.model("Job", jobSchema);
