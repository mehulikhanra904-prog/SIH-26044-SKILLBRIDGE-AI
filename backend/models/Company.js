import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: { type: String, trim: true, default: "" },
    industry: { type: String, trim: true, default: "" },
    website: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    companySize: { type: String, trim: true, default: "" },
    hiringEmail: { type: String, trim: true, default: "" },
    contactNumber: { type: String, trim: true, default: "" },
    about: { type: String, trim: true, default: "" },
    hiringDomains: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);