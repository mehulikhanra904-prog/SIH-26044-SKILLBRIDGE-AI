import { generateAIResponse } from "./aiService.js";

export async function recommendCareers({
skills,
interests,
education
}) {
const prompt = `
You are an AI career recommendation system for SkillBridge AI.
  
Student Education:
${education}
  
Student Skills:
${skills}
  
Student Interests:
${interests}
  
Recommend the most suitable career paths.
  
For each career provide:
  
1. Career name
2. Why it matches the student
3. Required skills
4. Missing skills
5. Recommended projects
6. Job opportunities
  
Return the response as JSON.
`;

return await generateAIResponse(prompt);
}