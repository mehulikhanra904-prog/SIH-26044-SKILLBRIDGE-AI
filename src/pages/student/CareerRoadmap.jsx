import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const roles = ["Full Stack Developer", "AI / ML Engineer", "Data Scientist", "Frontend Developer"];

function CareerRoadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadRoadmap = async (selectedRole = "") => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.get("/students/roadmap", {
        params: selectedRole ? { role: selectedRole } : {},
      });
      setRoadmap(data);
      setRole(data.role);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load your career roadmap.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRoadmap(); }, []);

  const gaps = roadmap?.priorityGaps || [];
  const matched = roadmap?.matchedSkills || [];
  const completed = roadmap?.stages?.filter((stage) => stage.status === "Completed").length || 0;

  return <div className="dashboard-layout">
    <Sidebar type="student" />
    <main className="main-content">
      <Navbar title="Career Intelligence" subtitle="A practical plan built from the skills in your saved profile—not a hiring prediction." />
      {error && <div className="error-message" role="alert">{error} <button className="primary-button" onClick={() => loadRoadmap(role)}>Retry</button></div>}
      <div className="card">
        <div className="section-title"><h2>Career direction</h2><span>Profile-based analysis</span></div>
        <div className="career-target">
          <div>
            <p className="small-label">Choose a target role</p>
            <select className="filter-select career-select" value={role} onChange={(event) => { setRole(event.target.value); loadRoadmap(event.target.value); }}>
              {roles.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <p className="muted-text">Changing the role recalculates the skill evidence and learning sequence.</p>
          </div>
          <div className="readiness-mini"><strong>{loading ? "—" : `${roadmap?.readiness ?? 0}%`}</strong><span>Profile coverage</span></div>
        </div>
        <p className="muted-text">{roadmap?.readinessDisclaimer}</p>
      </div>

      {loading && <div className="card"><p>Building your role-specific plan…</p></div>}
      {!loading && roadmap && <>
        <div className="card">
          <div className="section-title"><h2>Your evidence snapshot</h2><span>{matched.length} of {matched.length + gaps.length} requirements listed</span></div>
          <div className="gap-list">
            <div className="gap-item"><div className="gap-info"><strong>Skills found in profile</strong><span className="skill-status strong">{matched.length} matched</span></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${roadmap.readiness}%` }} /></div></div>
            <div className="roadmap-tags">{matched.map((skill) => <span key={skill}>✓ {skill}</span>)}</div>
            <h3>Priority gaps to work on</h3>
            {gaps.length ? <div className="roadmap-tags">{gaps.map((gap) => <span key={gap.name}>{gap.name} · {gap.priority}</span>)}</div> : <p className="muted-text">No listed skill gaps for this role. Validate your skills with practical work and projects.</p>}
          </div>
        </div>

        <div className="card">
          <div className="section-title"><h2>Execution plan</h2><span>{completed}/{roadmap.stages.length} stages completed</span></div>
          <div className="roadmap">{roadmap.stages.map((stage, index) => <div className={`roadmap-item ${stage.status === "In Progress" ? "active" : stage.status === "Completed" ? "completed" : ""}`} key={stage.title}>
            <div className="roadmap-number">{stage.status === "Completed" ? "✓" : index + 1}</div>
            <div className="roadmap-content">
              <div className="roadmap-header"><div><h3>{stage.title}</h3><span>{stage.status}</span></div><strong>{stage.progress}%</strong></div>
              <p>{stage.description}</p>
              <div className="roadmap-tags">{stage.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              <p className="muted-text"><strong>Action:</strong> {stage.action}</p>
              <p className="muted-text"><strong>Suggested effort:</strong> {stage.estimatedEffort}</p>
            </div>
          </div>)}</div>
        </div>

        <div className="card">
          <div className="section-title"><h2>Recommended next move</h2><span>Highest-priority action</span></div>
          <div className="next-action"><div className="next-action-icon">→</div><div><h3>{roadmap.nextStep.title}</h3><p className="muted-text">{roadmap.nextStep.description}</p><p className="muted-text">Suggested effort: {roadmap.nextStep.estimatedEffort}</p></div></div>
        </div>
      </>}
    </main>
  </div>;
}

export default CareerRoadmap;
