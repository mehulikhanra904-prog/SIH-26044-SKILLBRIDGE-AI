const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    coverLetter: { type: String, trim: true, maxlength: 3000 },
    status: {
      type: String,
      enum: ["applied", "under_review", "shortlisted", "interview", "selected", "rejected", "withdrawn"],
      default: "applied",
    },
  },
  { timestamps: true }
);

applicationSchema.index({ job: 1, student: 1 }, { unique: true });
applicationSchema.index({ student: 1, createdAt: -1 });

module.exports = mongoose.model("Application", applicationSchema);
