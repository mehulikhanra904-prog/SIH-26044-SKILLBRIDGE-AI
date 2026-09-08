import mongoose from "mongoose";

// Extra profile fields ONLY for users whose role is "company".
const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    companySize: {
      type: String,
      trim: true,
    },
    hiringEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      trim: true,
      maxlength: 3000,
    },
    hiringDomains: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
