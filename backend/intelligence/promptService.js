export function createRoadmapPrompt({
targetRole,
currentSkills,
experienceLevel
}) {
return `
You are an AI career mentor for SkillBridge AI.
  
Create a personalized career roadmap for a student.
  
Target Role:
${targetRole}
  
Current Skills:
${currentSkills}
  
Experience Level:
${experienceLevel}
  
Generate a practical roadmap containing:
  
1. Current skill assessment
2. Skills that are missing
3. Recommended technologies
4. Learning sequence
5. Projects to build
6. Interview preparation
7. Estimated timeline
  
Return the answer in clear JSON format.
`;
}

export function createSkillAnalysisPrompt({
targetRole,
skills
}) {
return `
You are an AI skill analyzer for SkillBridge AI.
  
Target Role:
${targetRole}
  
Student Skills:
${skills}
  
Analyze the student's skills and identify:
  
1. Strong skills
2. Weak skills
3. Missing skills
4. Skills to learn next
5. Overall readiness percentage
  
Return the result as JSON.
`;
}