require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

// Connect to MongoDB Atlas
connectDB();

const app = express();

// --- Core middleware ---
app.use(cors()); // allows the frontend (different origin) to call this API
app.use(express.json()); // parses incoming JSON request bodies into req.body

// --- Health check route ---
app.get("/", (req, res) => {
  res.json({ message: "SkillBridge AI backend is running" });
});

// --- API routes ---
app.use("/api/auth", authRoutes);
app.use("/api", testRoutes); // exposes /api/student/ping etc.

// --- Error handling (MUST be registered last) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
