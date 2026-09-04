import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Jobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);

  const loadJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/jobs/recommendations", { params: { search, location, type } });
      setJobs(data.recommendations);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load job recommendations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadJobs(); }, []);

  const applyToJob = async () => {
    if (!selectedJob) return;
    setApplying(true);
    setError("");
    try {
      await api.post(`/applications/jobs/${selectedJob.id}`);
      setSelectedJob(null);
      window.alert("Application submitted successfully.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to submit your application.");
    } finally {
      setApplying(false);
    }
  };

  const locations = useMemo(() => [...new Set(jobs.map((job) => job.location).filter(Boolean))], [jobs]);
  const types = useMemo(() => [...new Set(jobs.map((job) => job.type).filter(Boolean))], [jobs]);

  return (
    <div className="dashboard-layout">
      <Sidebar type="student" />
      <main className="main-content">
        <Navbar title="Recommended Jobs" subtitle="Jobs ranked dynamically from your saved skills and career preferences." />
        <div className="card"><div className="search-row">
          <input className="search-input" value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => event.key === "Enter" && loadJobs()} placeholder="Search jobs, skills or locations..." />
          <select className="filter-select" value={location} onChange={(event) => setLocation(event.target.value)}><option value="">All Locations</option>{locations.map((item) => <option key={item}>{item}</option>)}</select>
          <select className="filter-select" value={type} onChange={(event) => setType(event.target.value)}><option value="">All Types</option>{types.map((item) => <option key={item}>{item}</option>)}</select>
          <button className="primary-button" onClick={loadJobs}>Search</button>
        </div></div>
        {error && <p className="error-message">{error}</p>}
        <div className="ai-info"><div className="ai-info-icon">✦</div><div><strong>AI-Powered Job Matching</strong><p>Each match score is calculated from your profile skills and career preferences.</p></div></div>

        {loading ? <div className="card">Loading recommendations...</div> : jobs.length ? jobs.map((job) => <JobCard key={job.id} job={job} onView={() => setSelectedJob(job)} />) : <div className="card"><h2>No Jobs Found</h2><p>No published opportunities match the selected filters.</p></div>}

        {selectedJob && <div className="job-modal-overlay" onClick={() => setSelectedJob(null)}><div className="job-modal" onClick={(event) => event.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedJob(null)} aria-label="Close">×</button>
          <div className="company-logo">{selectedJob.company.name.charAt(0).toUpperCase()}</div>
          <h2>{selectedJob.title}</h2><p className="company-name">{selectedJob.company.name}</p>
          <div className="job-meta"><span>📍 {selectedJob.location}</span><span>💼 {selectedJob.type}</span>{selectedJob.salary && <span>{selectedJob.salary}</span>}</div>
          <h3>About the Job</h3><p>{selectedJob.description}</p>
          <h3>Required Skills</h3><div className="skill-list">{selectedJob.skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div>
          <p><strong>{selectedJob.matchScore}% AI Match</strong>{selectedJob.missingSkills.length ? ` · Skills to strengthen: ${selectedJob.missingSkills.join(", ")}` : " · Your profile covers every listed skill."}</p>
          <button className="primary-button" onClick={applyToJob} disabled={applying}>{applying ? "Applying..." : "Apply Now"}</button>
        </div></div>}
      </main>
    </div>
  );
}

function JobCard({ job, onView }) {
  return <div className="job-card"><div className="job-main"><div className="company-logo">{job.company.name.charAt(0).toUpperCase()}</div><div className="job-details">
    <h2>{job.title}</h2><p className="company-name">{job.company.name}</p>
    <div className="job-meta"><span>📍 {job.location}</span><span>💼 {job.type}</span>{job.salary && <span>{job.salary}</span>}</div>
    <div className="skill-list">{job.skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div>
  </div></div><div className="job-match"><div className="match-circle">{job.matchScore}%</div><span>AI Match</span><button className="primary-button" onClick={onView}>View Job</button></div></div>;
}

export default Jobs;
