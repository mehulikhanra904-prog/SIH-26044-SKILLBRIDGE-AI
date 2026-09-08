import { generateAIResponse } from "./aiService.js";
import { createRoadmapPrompt } from "./promptService.js";

export async function generateCareerRoadmap(data) {
  const prompt = createRoadmapPrompt(data);

  const response = await generateAIResponse(prompt);

  return response;
}