// =====================================================
// AI SERVICE - GEMINI
// =====================================================

import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Explicitly load the backend .env before reading the API key.
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY is not loaded from .env");
} else {
  console.log("✅ Gemini API key loaded");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const generateAIResponse = async (prompt) => {
  if (!API_KEY || !genAI) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    throw new Error("Prompt is required");
  }

  try {
    const modelName = process.env.GEMINI_MODEL || "gemini-3.6-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    console.log(`🤖 Sending request to Gemini (${modelName})...`);

    const result = await model.generateContent(prompt.trim());
    const text = result?.response?.text?.()?.trim();

    if (!text) {
      throw new Error("Gemini returned an empty response");
    }

    console.log("✅ Gemini response generated successfully");
    return text;
  } catch (error) {
    console.error("❌ Gemini AI Error:", error?.message || error);

    const status = error?.status || error?.response?.status;
    if (status === 401 || status === 403) {
      throw new Error("Gemini API key is invalid or not authorized");
    }
    if (status === 404) {
      throw new Error("Gemini model is unavailable. Set GEMINI_MODEL in .env to an available model");
    }
    if (status === 429) {
      throw new Error("Gemini API rate limit exceeded. Please try again later");
    }

    throw new Error(error?.message || "Failed to generate AI response");
  }
};
