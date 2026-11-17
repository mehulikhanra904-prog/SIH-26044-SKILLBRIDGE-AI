const SKILL_ALIASES = {
  javascript: ["js", "javascript", "ecmascript"],
  "node.js": ["node", "nodejs", "node.js"],
  react: ["reactjs", "react.js", "react"],
  "rest apis": ["rest", "rest api", "rest apis", "api development"],
  "machine learning": ["ml", "machine learning", "scikit-learn", "sklearn"],
  python: ["python", "py"],
  sql: ["sql", "mysql", "postgresql", "sqlite"],
  "deep learning": ["dl", "deep learning", "pytorch", "tensorflow"],
  nlp: ["nlp", "natural language processing"],
  statistics: ["statistics", "statistical analysis"],
  pandas: ["pandas"],
  html: ["html", "html5"],
  css: ["css", "css3"],
  accessibility: ["accessibility", "a11y", "wcag"],
  docker: ["docker", "containerization"],
  git: ["git", "github", "version control"],
};

const PRIORITY_WEIGHTS = {
  critical: 3,
  important: 2,
  supporting: 1,
};

const ROLE_PRIORITIES = {
  "Full Stack Developer": ["React", "Node.js", "REST APIs", "Docker", "Git"],
  "AI / ML Engineer": ["Python", "Machine Learning", "Deep Learning", "NLP", "SQL"],
  "Data Scientist": ["Python", "SQL", "Statistics", "Pandas", "Machine Learning"],
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Accessibility"],
};

const normalize = (value) => String(value || "").trim().toLowerCase();

function hasSkill(profileSkills, requiredSkill) {
  const aliases = SKILL_ALIASES[normalize(requiredSkill)] || [normalize(requiredSkill)];
  return profileSkills.some((savedSkill) => {
    const candidate = normalize(savedSkill);
    return aliases.some((alias) => candidate === alias);
  });
}

export function buildSkillEvidence(role, savedSkills = []) {
  const requirements = ROLE_PRIORITIES[role] || ROLE_PRIORITIES["Full Stack Developer"];
  const profileSkills = Array.isArray(savedSkills) ? savedSkills : [];
  const skills = requirements.map((name, index) => {
    const matched = hasSkill(profileSkills, name);
    const priority = index < 2 ? "critical" : index < 4 ? "important" : "supporting";
    return {
      name,
      required: "Role requirement",
      progress: matched ? 100 : 0,
      status: matched ? "Found in profile" : "Not listed",
      className: matched ? "strong" : "missing",
      priority,
      weight: PRIORITY_WEIGHTS[priority],
      evidence: matched
        ? profileSkills.find((skill) => hasSkill([skill], name))
        : null,
    };
  });

  const totalWeight = skills.reduce((sum, skill) => sum + skill.weight, 0);
  const earnedWeight = skills.reduce(
    (sum, skill) => sum + (skill.progress ? skill.weight : 0),
    0
  );
  const missing = skills.filter((skill) => skill.progress === 0);

  return {
    role,
    score: totalWeight ? Math.round((earnedWeight / totalWeight) * 100) : 0,
    scoreLabel: "Profile coverage",
    scoreDisclaimer:
      "This measures only the role skills listed in your saved profile. It is not a hiring probability or a verified proficiency test.",
    skills,
    missing,
    matchedCount: skills.length - missing.length,
    totalCount: skills.length,
    nextPriority: missing.find((skill) => skill.priority === "critical") || missing[0] || null,
  };
}
