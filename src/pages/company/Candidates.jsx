import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Candidates() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [minMatch, setMinMatch] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/applications/company")
      .then(({ data }) => setApplications(data.applications || []))
      .catch((err) => setError(err.response?.data?.message || "Unable to load candidates."));
  }, []);

  const candidates = useMemo(() => applications.map((application) => ({ ...application, ...(application.student || {}) })), [applications]);
  const departments = useMemo(() => [...new Set(candidates.map((candidate) => candidate.department).filter(Boolean))].sort(), [candidates]);
  const filtered = useMemo(() => {
    const text = search.trim().toLowerCase();
    return candidates.filter((candidate) => {
      const haystack = [candidate.name, candidate.email, candidate.collegeName, candidate.course, candidate.department, candidate.job?.title, ...(candidate.skills || [])].join(" ").toLowerCase();
      return (!text || haystack.includes(text)) && (!department || candidate.department === department) && Number(candidate.matchScore || 0) >= minMatch;
    });
  }, [candidates, search, department, minMatch]);
  const highlyMatched = candidates.filter((candidate) => Number(candidate.matchScore || 0) >= 80).length;
  const shortlisted = applications.filter((application) => application.status === "shortlisted").length;
  const interviewReady = candidates.filter((candidate) => Number(candidate.matchScore || 0) >= 80).length;

  return <div className="dashboard-layout"><Sidebar type="company" /><main className="main-content">
    <Navbar title="Candidates" subtitle="Discover and shortlist students using AI-powered skill matching." />
    {error && <div className="error-message">{error}</div>}
    <div className="page-actions"><div><h2 className="page-heading">Find Candidates</h2><p className="page-subtitle">Discover students who match your job requirements.</p></div><button className="primary-button" type="button">AI Match Candidates</button></div>
    <div className="stats-grid"><div className="stat-card"><span className="stat-label">Total Candidates</span><div className="stat-value">{candidates.length}</div><p className="stat-description">Applicants from your jobs</p></div><div className="stat-card"><span className="stat-label">Highly Matched</span><div className="stat-value">{highlyMatched}</div><p className="stat-description">80%+ skill match</p></div><div className="stat-card"><span className="stat-label">Shortlisted</span><div className="stat-value">{shortlisted}</div><p className="stat-description">Your shortlisted candidates</p></div><div className="stat-card"><span className="stat-label">Interview Ready</span><div className="stat-value">{interviewReady}</div><p className="stat-description">High readiness score</p></div></div>
    <div className="card"><div className="candidate-filter-row"><input className="search-input" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidates by name or skill..." /><select className="filter-select" value={department} onChange={(e) => setDepartment(e.target.value)}><option value="">All Departments</option>{departments.map((value) => <option key={value} value={value}>{value}</option>)}</select><select className="filter-select" value={minMatch} onChange={(e) => setMinMatch(Number(e.target.value))}><option value={0}>Skill Match</option><option value={90}>90%+</option><option value={80}>80%+</option><option value={70}>70%+</option></select></div></div>
    <div className="card"><div className="section-title"><div><h2>Recommended Candidates</h2><p>Candidates ranked according to your hiring requirements.</p></div><span>{filtered.length} Matches</span></div><div className="candidate-list">{filtered.length ? filtered.map((candidate) => <div className="candidate-card" key={candidate._id || candidate.id}><div className="candidate-avatar">{(candidate.name || "Student").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</div><div className="candidate-info"><h3>{candidate.name || "Student"}</h3><p>{candidate.course || "Course not specified"} · {candidate.collegeName || "College not specified"}</p><div className="candidate-skills">{(candidate.skills || []).map((skill) => <span key={skill}>{skill}</span>)}</div></div><div className="match-score"><strong>{candidate.matchScore || 0}%</strong><span>Skill Match</span></div><div className="readiness-score"><strong>{candidate.readinessScore ?? "—"}</strong><span>Readiness</span></div><button className="secondary-button" type="button" onClick={() => candidate._id && navigate(`/company/candidates/${candidate._id}`)}>View</button></div>) : <div className="no-results"><h3>No Candidates Found</h3><p>Students who apply to your jobs will appear here.</p></div>}</div></div>
    <div className="ai-info"><div className="ai-info-icon">✦</div><div><strong>Why these candidates?</strong><p>SkillBridge AI compares job requirements with student skills, projects, certifications, experience and readiness indicators to rank the most relevant candidates.</p></div></div>
  </main></div>;
}

export default Candidates;
