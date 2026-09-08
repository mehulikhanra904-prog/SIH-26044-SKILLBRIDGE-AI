import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Internships() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.get("/jobs/mine"), api.get("/applications/company")])
      .then(([jobsResponse, applicationsResponse]) => {
        setJobs(jobsResponse.data?.jobs || []);
        setApplications(applicationsResponse.data?.applications || []);
      })
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load internships."));
  }, []);

  const internships = useMemo(() => jobs.filter((job) => String(job.type || "").toLowerCase() === "internship"), [jobs]);
  const internshipIds = useMemo(() => new Set(internships.map((job) => String(job.id || job._id))), [internships]);
  const internshipApplications = useMemo(() => applications.filter((application) => {
    const jobId = application.job?.id || application.job?._id || application.jobId;
    return internshipIds.has(String(jobId));
  }), [applications, internshipIds]);
  const activeInternships = internships.filter((job) => String(job.status || "").toLowerCase() === "published").length;
  const shortlisted = internshipApplications.filter((a) => String(a.status || "").toLowerCase() === "shortlisted").length;
  const selected = internshipApplications.filter((a) => String(a.status || "").toLowerCase() === "selected").length;
  const visibleInternships = useMemo(() => internships.filter((job) => {
    const searchable = `${job.title || ""} ${job.location || ""} ${(job.skills || []).join(" ")}`.toLowerCase();
    const matchesSearch = searchable.includes(search.toLowerCase());
    const jobStatus = String(job.status || "").toLowerCase();
    return matchesSearch && (!status || jobStatus === status);
  }), [internships, search, status]);
  const getApplicationsForJob = (job) => {
    const jobId = String(job.id || job._id);
    return internshipApplications.filter((application) => String(application.job?.id || application.job?._id || application.jobId) === jobId).length;
  };
  const formatStatus = (value) => {
    const normalized = String(value || "").toLowerCase();
    if (normalized === "published") return "Active";
    if (normalized === "closed") return "Closed";
    if (normalized === "draft") return "Draft";
    return value || "Not specified";
  };
  const formatDetails = (job) => {
    const location = job.location || "Not specified";
    const durationValue = job.duration || job.durationMonths;
    const duration = durationValue ? `${durationValue} ${job.durationMonths ? "Months" : ""}`.trim() : "Not specified";
    return `${location} · ${duration} · ${job.salary || "Not specified"}`;
  };

  return <div className="dashboard-layout"><Sidebar type="company" /><main className="main-content">
    <Navbar title="Internships" subtitle="Manage internship opportunities and find talented students." />
    <div className="page-actions"><div><h2 className="page-heading">Internship Opportunities</h2><p className="page-subtitle">Create and manage internships for students.</p></div><button className="primary-button" onClick={() => navigate("/company/jobs/create")}>+ Post Internship</button></div>
    <div className="stats-grid"><div className="stat-card"><span className="stat-label">Active Internships</span><div className="stat-value">{activeInternships}</div><p className="stat-description">Currently available</p></div><div className="stat-card"><span className="stat-label">Applications</span><div className="stat-value">{internshipApplications.length}</div><p className="stat-description">Total applications</p></div><div className="stat-card"><span className="stat-label">Shortlisted</span><div className="stat-value">{shortlisted}</div><p className="stat-description">Candidates shortlisted</p></div><div className="stat-card"><span className="stat-label">Selected</span><div className="stat-value">{selected}</div><p className="stat-description">Students selected</p></div></div>
    <div className="card"><div className="job-filter-row"><input className="search-input" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search internships..." /><select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All Status</option><option value="published">Active</option><option value="closed">Closed</option><option value="draft">Draft</option></select></div></div>
    <div className="card"><div className="section-title"><h2>Your Internships</h2><span>{visibleInternships.length} Opportunities</span></div>{error && <p className="error-message">{error}</p>}<div className="job-list">{visibleInternships.length ? visibleInternships.map((job) => <div className="job-item" key={job.id || job._id}><div className="job-icon">{String(job.title || "I").split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word.charAt(0).toUpperCase()).join("")}</div><div className="job-details"><h3>{job.title || "Untitled Internship"}</h3><p>{job.skills?.length ? job.skills.join(" · ") : "Skills not specified"}</p><small>{formatDetails(job)}</small></div><div className="job-meta"><strong>{getApplicationsForJob(job)}</strong><span>Applications</span></div><span className="job-status">{formatStatus(job.status)}</span><button className="secondary-button" onClick={() => navigate(`/company/jobs/${job.id || job._id}`)}>View</button></div>) : <p>No internships found.</p>}</div></div>
    <div className="ai-info"><div className="ai-info-icon">✦</div><div><strong>AI Internship Matching</strong><p>SkillBridge AI analyzes student skills, projects, certifications and career interests to recommend the most suitable candidates for your internships.</p></div></div>
  </main></div>;
}

export default Internships;
