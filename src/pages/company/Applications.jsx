import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function CompanyApplications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [job, setJob] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/applications/company")
      .then(({ data }) => setApplications(data.applications || []))
      .catch((err) => setError(err.response?.data?.message || "Unable to load applications."));
  }, []);

  const filtered = useMemo(() => applications.filter((item) => {
    const text = search.trim().toLowerCase();
    const haystack = [item.student?.name, item.student?.email, item.student?.collegeName, item.student?.course, item.job?.title, ...(item.student?.skills || [])].join(" ").toLowerCase();
    return (!text || haystack.includes(text)) && (!status || item.status === status) && (!job || item.job?.title === job);
  }), [applications, search, status, job]);

  const counts = {
    total: applications.length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    interviews: applications.filter((a) => a.status === "interview").length,
    selected: applications.filter((a) => a.status === "selected").length,
  };
  const jobs = [...new Set(applications.map((a) => a.job?.title).filter(Boolean))];

  return <div className="dashboard-layout"><Sidebar type="company" /><main className="main-content">
    <Navbar title="Applications" subtitle="Review candidates and manage your hiring pipeline." />
    {error && <div className="error-message">{error}</div>}
    <div className="stats-grid">{[['Total Applications', counts.total], ['Shortlisted', counts.shortlisted], ['Interviews', counts.interviews], ['Selected', counts.selected]].map(([label, value]) => <div className="stat-card" key={label}><span className="stat-label">{label}</span><div className="stat-value">{value}</div><p className="stat-description">From your job postings</p></div>)}</div>
    <div className="card"><div className="job-filter-row"><input className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidates, skills or jobs..." /><select className="filter-select" value={job} onChange={(e) => setJob(e.target.value)}><option value="">All Jobs</option>{jobs.map((value) => <option key={value}>{value}</option>)}</select><select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All Status</option>{["under_review", "shortlisted", "interview", "selected", "rejected"].map((value) => <option key={value} value={value}>{value.replace("_", " ")}</option>)}</select></div></div>
    <div className="card"><div className="section-title"><h2>Applications</h2><span>{filtered.length} Applications</span></div><div className="candidate-list">{filtered.length ? filtered.map((application) => { const student = application.student || {}; return <div className="candidate-item" key={application.id}><div className="student-avatar">{(student.name || "Student").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</div><div className="candidate-info"><strong>{student.name || "Student"}</strong><p>{application.job?.title || "Job"}</p><small>{(student.skills || []).join(" · ") || "No skills listed"}</small></div><div className="job-meta"><strong>{application.matchScore || 0}%</strong><span>Skill Match</span></div><span className="job-status">{application.status}</span></div>; }) : <div className="no-results"><h3>No Applications Found</h3><p>Applications submitted to your published jobs will appear here.</p></div>}</div></div>
  </main></div>;
}

export default CompanyApplications;
