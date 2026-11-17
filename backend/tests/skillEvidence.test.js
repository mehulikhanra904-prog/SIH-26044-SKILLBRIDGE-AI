import test from "node:test";
import assert from "node:assert/strict";
import { buildSkillEvidence } from "../intelligence/skillEvidence.js";

test("weights critical role skills more heavily than supporting skills", () => {
  const result = buildSkillEvidence("Full Stack Developer", ["React", "Node.js"]);
  assert.equal(result.score, 55);
  assert.deepEqual(result.missing.map((skill) => skill.name), ["REST APIs", "Docker", "Git"]);
});

test("recognizes common aliases in a student's profile", () => {
  const result = buildSkillEvidence("AI / ML Engineer", ["Py", "ML", "PyTorch", "NLP", "PostgreSQL"]);
  assert.equal(result.matchedCount, 5);
  assert.equal(result.score, 100);
});

test("returns a transparent zero-coverage result for an empty profile", () => {
  const result = buildSkillEvidence("Frontend Developer", []);
  assert.equal(result.score, 0);
  assert.equal(result.matchedCount, 0);
  assert.match(result.scoreDisclaimer, /not a hiring probability/);
});

test("does not award a skill for a partial word match", () => {
  const result = buildSkillEvidence("AI / ML Engineer", ["pythonista"]);
  assert.equal(result.skills.find((skill) => skill.name === "Python").progress, 0);
});
