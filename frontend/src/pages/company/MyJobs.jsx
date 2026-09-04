import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function MyJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/jobs/mine").then(({ data }) => setJobs(data.jobs)).catch((requestError) => setError(requestError.response?.data?.message || "Unable to load your jobs."));
  }, []);

  const visibleJobs = useMemo(() => jobs.filter((job) => {
    const matchesSearch = `${job.title} ${job.location} ${job.skills.join(" ")}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (!status || job.status === status);
  }), [jobs, search, status]);

  return <div className="dashboard-layout"><Sidebar type="company" /><main className="main-content">
    <Navbar title="My Jobs" subtitle="Manage job postings stored in your company account." />
    <div className="page-actions"><h1 className="page-heading">Job Postings</h1><button className="primary-button" onClick={() => navigate("/company/jobs/create")}>+ Post New Job</button></div>
    {error && <p className="error-message">{error}</p>}
    <div className="card my-jobs-filter-card"><div className="job-filter-row"><input className="search-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search jobs..." /><select className="filter-select" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">All statuses</option><option value="published">Published</option><option value="draft">Draft</option><option value="closed">Closed</option></select></div></div>
    <div className="card my-jobs-list-card"><div className="section-title"><div><h2>Your Job Postings</h2><p>{visibleJobs.length} job{visibleJobs.length === 1 ? "" : "s"} shown</p></div></div><div className="job-list">
      {visibleJobs.length ? visibleJobs.map((job) => <div className="job-item my-job-item" key={job.id}><div className="job-icon">{job.title.charAt(0).toUpperCase()}</div><div className="job-details"><h3>{job.title}</h3><p>{job.skills.join(" · ")}</p><small>{job.location} · {job.type}{job.salary ? ` · ${job.salary}` : ""}</small></div><span className="job-status">{job.status}</span><div className="job-actions"><button className="secondary-button" onClick={() => navigate(`/company/jobs/${job.id}`)}>View</button></div></div>) : <p>No job postings found.</p>}
    </div></div>
  </main></div>;
}

export default MyJobs;
