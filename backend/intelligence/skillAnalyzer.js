import { generateAIResponse } from "./aiService.js";
import { createSkillAnalysisPrompt } from "./promptService.js";

export async function analyzeSkills(data) {
  const prompt = createSkillAnalysisPrompt(data);

  const response = await generateAIResponse(prompt);

  return response;
}