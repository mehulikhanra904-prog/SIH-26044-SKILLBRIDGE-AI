import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function CareerRoadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState("");
  const [showLearning, setShowLearning] = useState(false);

  useEffect(() => {
    api.get("/students/roadmap")
      .then(({ data }) => setRoadmap(data))
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load your career roadmap."));
  }, []);

  if (!roadmap) return <main className="main-content">{error || "Loading career roadmap..."}</main>;
  return <div className="dashboard-layout"><Sidebar type="student" /><main className="main-content">
    <Navbar title="Career Roadmap" subtitle="Your roadmap is generated from your saved skills and career preferences." />
    {error && <p className="error-message">{error}</p>}
    <div className="card"><div className="section-title"><h2>Your Career Goal</h2><span>Live profile analysis</span></div><div className="career-target"><div><p className="small-label">Target role</p><h2>{roadmap.role}</h2><p className="muted-text">Readiness updates when you edit your skills or profile.</p></div><div className="readiness-mini"><strong>{roadmap.readiness}%</strong><span>Ready</span></div></div></div>
    <div className="card"><div className="section-title"><h2>Learning Roadmap</h2><span>{roadmap.stages.length} Steps</span></div><div className="roadmap">{roadmap.stages.map((stage, index) => <div className={`roadmap-item ${stage.status === "In Progress" ? "active" : stage.status === "Completed" ? "completed" : ""}`} key={stage.title}><div className="roadmap-number">{stage.status === "Completed" ? "✓" : index + 1}</div><div className="roadmap-content"><div className="roadmap-header"><div><h3>{stage.title}</h3><span>{stage.status}</span></div><strong>{stage.progress}%</strong></div><p>{stage.description}</p><div className="roadmap-tags">{stage.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></div>)}</div></div>
    <div className="card"><div className="section-title"><h2>Recommended Next Step</h2><span>Based on your profile</span></div><div className="next-action"><div className="next-action-icon">→</div><div><h3>{roadmap.nextStep.title}</h3><p className="muted-text">{roadmap.nextStep.description}</p></div><button className="primary-button" onClick={() => setShowLearning(true)}>Start Learning</button></div></div>
    {showLearning && <div className="job-modal-overlay" onClick={() => setShowLearning(false)}><div className="job-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowLearning(false)} aria-label="Close">×</button><h2>{roadmap.nextStep.title}</h2><p>{roadmap.nextStep.description}</p><div className="roadmap-tags">{roadmap.nextStep.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></div>}
  </main></div>;
}

export default CareerRoadmap;
