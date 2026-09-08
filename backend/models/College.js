import mongoose from "mongoose";

// Extra profile fields ONLY for users whose role is "college".
const collegeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    collegeName: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("College", collegeSchema);
