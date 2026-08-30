const mongoose = require("mongoose");

// Connects to MongoDB Atlas using the connection string in .env
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Exit the process if DB connection fails — no point running the server without a DB
    process.exit(1);
  }
};

module.exports = connectDB;
