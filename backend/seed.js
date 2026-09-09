import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Company from "./models/Company.js";
import Job from "./models/Job.js";

dotenv.config();

const jobsData = [
  {
    title: "Frontend Developer Intern",
    type: "Internship",
    location: "Remote",
    salary: "₹18,000/month",
    experience: "0-1 years",
    skills: ["React", "JavaScript", "CSS", "Git"],
    deadline: new Date("2026-10-15"),
    description:
      "Work with our frontend team building modern React interfaces. Great opportunity to learn production-level development practices in a fast-moving startup environment.",
  },
  {
    title: "Full Stack Developer",
    type: "Full-time",
    location: "Kolkata, India",
    salary: "₹6,00,000/year",
    experience: "1-3 years",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    deadline: new Date("2026-10-20"),
    description:
      "Join our engineering team to build and scale our core product. You'll work across the stack, from database design to polished UI, in a collaborative agile environment.",
  },
  {
    title: "Backend Developer Intern",
    type: "Internship",
    location: "Bangalore, India",
    salary: "₹15,000/month",
    experience: "0-1 years",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
    deadline: new Date("2026-10-10"),
    description:
      "Support our backend team in building scalable APIs and services. You'll get hands-on exposure to authentication, database design, and cloud deployment.",
  },
  {
    title: "AI/ML Engineer",
    type: "Full-time",
    location: "Hyderabad, India",
    salary: "₹9,00,000/year",
    experience: "2-4 years",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    deadline: new Date("2026-11-01"),
    description:
      "Design and deploy machine learning models for real-world applications. Work closely with product and data teams to bring AI-powered features to life.",
  },
  {
    title: "Data Analyst Intern",
    type: "Internship",
    location: "Remote",
    salary: "₹12,000/month",
    experience: "0-1 years",
    skills: ["Python", "SQL", "Excel", "Data Visualization"],
    deadline: new Date("2026-10-25"),
    description:
      "Analyze business data to uncover insights and support decision-making. Great fit for students looking to break into data analytics.",
  },
  {
    title: "DevOps Engineer",
    type: "Full-time",
    location: "Pune, India",
    salary: "₹8,50,000/year",
    experience: "2-3 years",
    skills: ["Docker", "AWS", "CI/CD", "Linux"],
    deadline: new Date("2026-11-05"),
    description:
      "Manage our cloud infrastructure and deployment pipelines. You'll own reliability, scaling, and automation across our production systems.",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    const email = "demo.company@skillbridge.ai";
    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash("demo123456", 10);
      user = await User.create({
        name: "TechNova Solutions",
        email,
        password: hashedPassword,
        role: "company",
      });
      console.log("Created demo company user:", email);
    }

    let company = await Company.findOne({ user: user._id });
    if (!company) {
      company = await Company.create({
        user: user._id,
        companyName: "TechNova Solutions",
        industry: "Information Technology",
        website: "www.technova.com",
        location: "Kolkata, India",
        companySize: "201-500 Employees",
        hiringEmail: "careers@technova.com",
        contactNumber: "+91 98765 43210",
        about:
          "TechNova Solutions builds innovative software products and digital solutions, offering real-world opportunities for students and professionals.",
        hiringDomains: ["Web Development", "AI & Machine Learning", "Cloud Computing"],
      });
      console.log("Created demo company profile");
    }

    // Clear old seeded jobs from this company before re-seeding, so re-runs don't duplicate
    await Job.deleteMany({ company: company._id });

    const jobsToInsert = jobsData.map((job) => ({ ...job, company: company._id }));
    await Job.insertMany(jobsToInsert);

    console.log(`Seeded ${jobsToInsert.length} jobs successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();