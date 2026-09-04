// =====================================================
// AI SERVICE - GEMINI
// =====================================================

import { GoogleGenerativeAI } from "@google/generative-ai";

// =====================================================
// CHECK API KEY
// =====================================================

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY is not loaded from .env");
} else {
  console.log("✅ Gemini API key loaded");
}

// =====================================================
// INITIALIZE GEMINI
// =====================================================

const genAI = new GoogleGenerativeAI(API_KEY);

// =====================================================
// GENERATE AI RESPONSE
// =====================================================

export const generateAIResponse = async (prompt) => {
  try {
    if (!API_KEY) {
      throw new Error("GEMINI_API_KEY is missing");
    }

    if (!prompt || typeof prompt !== "string") {
      throw new Error("Prompt is required");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    console.log("🤖 Sending request to Gemini...");

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    if (!text) {
      throw new Error("Gemini returned an empty response");
    }

    console.log("✅ Gemini response generated successfully");

    return text;

  } catch (error) {
    console.error("❌ Gemini AI Error:", error.message);

    throw new Error("Failed to generate AI response");
  }
};