import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const roles = ["Full Stack Developer", "AI / ML Engineer", "Data Scientist", "Frontend Developer"];

function SkillGap() {
  const [career, setCareer] = useState(roles[0]);
  const [analysis, setAnalysis] = useState({ score: 0, message: "", description: "", skills: [], recommendations: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async (role = career) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.get("/students/skill-gap", { params: { role } });
      setAnalysis(data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to analyze your skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { analyze(); }, []);

  return <div className="dashboard-layout"><Sidebar type="student" /><main className="main-content">
    <Navbar title="AI Skill Gap Analysis" subtitle="Analysis uses the skills saved in your profile." />
    {error && <p className="error-message">{error}</p>}
    <div className="card"><div className="section-title"><h2>Target Career</h2><span>Live profile analysis</span></div><div className="career-target"><div><p className="small-label">Selected role</p><select className="filter-select career-select" value={career} onChange={(event) => setCareer(event.target.value)}>{roles.map((role) => <option key={role}>{role}</option>)}</select><p className="muted-text">Your saved skills are compared with the selected role requirements.</p></div><button className="primary-button analyze-button" onClick={() => analyze()} disabled={loading}>{loading ? "Analyzing..." : "Analyze Skills"}</button></div></div>
    <div className="card"><div className="section-title"><h2>Career Readiness</h2><span>Backend analysis</span></div><div className="readiness-box"><div className="readiness-score">{loading ? "..." : `${analysis.score}%`}</div><div><h3>{loading ? "Analyzing your skills..." : analysis.message}</h3><p className="muted-text">{analysis.description}</p></div></div></div>
    <div className="card"><div className="section-title"><h2>Skill Analysis</h2><span>{analysis.skills.length} Skills Compared</span></div><div className="gap-list">{analysis.skills.map((skill) => <div className="gap-item" key={skill.name}><div className="gap-info"><div><strong>{skill.name}</strong><p>Required: {skill.required}</p></div><span className={`skill-status ${skill.className}`}>{skill.status}</span></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${skill.progress}%` }} /></div></div>)}</div></div>
    <div className="card"><div className="section-title"><h2>Recommendations</h2><span>Personalized</span></div><div className="recommendation-list">{analysis.recommendations.length ? analysis.recommendations.map((item, index) => <div className="recommendation-item" key={item.title}><div className="recommendation-number">{index + 1}</div><div><strong>{item.title}</strong><p className="muted-text">{item.description}</p></div></div>) : <p>Your profile currently covers all listed skills.</p>}</div></div>
  </main></div>;
}

export default SkillGap;
