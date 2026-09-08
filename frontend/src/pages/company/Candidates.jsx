import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api";

function Candidates() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [minMatch, setMinMatch] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/applications/company")
      .then(({ data }) => setApplications(data.applications || []))
      .catch((err) => setError(err.response?.data?.message || "Unable to load candidates."));
  }, []);

  const candidates = useMemo(() => applications.map((application) => ({ ...application, ...(application.student || {}) })), [applications]);
  const filtered = useMemo(() => candidates.filter((candidate) => {
    const text = search.trim().toLowerCase();
    const haystack = [candidate.name, candidate.email, candidate.collegeName, candidate.course, candidate.job?.title, ...(candidate.skills || [])].join(" ").toLowerCase();
    return (!text || haystack.includes(text)) && (candidate.matchScore || 0) >= minMatch;
  }), [candidates, search, minMatch]);

  const shortlisted = applications.filter((a) => a.status === "shortlisted").length;
  const interviewReady = applications.filter((a) => (a.matchScore || 0) >= 80).length;

  return <div className="dashboard-layout">
    <Sidebar type="company" />
    <main className="main-content">
      <Navbar title="Candidates" subtitle="Discover and shortlist students using your hiring data." />
      {error && <div className="error-message">{error}</div>}
      <div className="stats-grid">
        {[['Total Candidates', candidates.length], ['Highly Matched', candidates.filter((c) => (c.matchScore || 0) >= 80).length], ['Shortlisted', shortlisted], ['Interview Ready', interviewReady]].map(([label, value]) => <div className="stat-card" key={label}><span className="stat-label">{label}</span><div className="stat-value">{value}</div><p className="stat-description">Based on your applications</p></div>)}
      </div>
      <div className="card"><div className="candidate-filter-row">
        <input className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidates by name or skill..." />
        <select className="filter-select" value={minMatch} onChange={(e) => setMinMatch(Number(e.target.value))}><option value="0">All Skill Matches</option><option value="90">90%+</option><option value="80">80%+</option><option value="70">70%+</option></select>
      </div></div>
      <div className="card"><div className="section-title"><div><h2>Candidates</h2><p>Applicants ranked by actual skill overlap with your jobs.</p></div><span>{filtered.length} Matches</span></div>
        <div className="candidate-list">
          {filtered.length ? filtered.map((candidate) => {
            const initials = (candidate.name || "Student").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
            return <div className="candidate-card" key={candidate.id}>
              <div className="candidate-avatar">{initials}</div>
              <div className="candidate-info"><h3>{candidate.name || "Student"}</h3><p>{candidate.course || "Course not specified"} · {candidate.collegeName || "College not specified"}</p><div className="candidate-skills">{(candidate.skills || []).map((skill) => <span key={skill}>{skill}</span>)}</div></div>
              <div className="match-score"><strong>{candidate.matchScore || 0}%</strong><span>Skill Match</span></div>
              <button className="secondary-button">View</button>
            </div>;
          }) : <div className="no-results"><h3>No Candidates Found</h3><p>Students who apply to your jobs will appear here.</p></div>}
        </div>
      </div>
    </main>
  </div>;
}

export default Candidates;
