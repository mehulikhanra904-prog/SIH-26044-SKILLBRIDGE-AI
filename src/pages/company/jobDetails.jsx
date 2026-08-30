import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`).then(({ data }) => setJob(data.job)).catch((requestError) => setError(requestError.response?.data?.message || "Unable to load this job."));
  }, [id]);

  const closeJob = async () => {
    try {
      const { data } = await api.put(`/jobs/${id}`, { status: "closed" });
      setJob(data.job);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to close this job.");
    }
  };

  return <div className="dashboard-layout"><Sidebar type="company" /><main className="main-content">
    <Navbar title="Job Details" subtitle="View and manage your database-backed job posting." />
    <button className="secondary-button job-back-button" onClick={() => navigate("/company/jobs")}>← Back to Jobs</button>
    {error && <p className="error-message">{error}</p>}
    {!job && !error ? <div className="card">Loading job...</div> : job && <>
      <div className="card job-details-header-card"><div className="job-details-header"><div className="job-details-icon">{job.title.charAt(0).toUpperCase()}</div><div className="job-details-title"><h1>{job.title}</h1><p>{job.company.name}</p><div className="job-details-meta"><span>📍 {job.location}</span><span>💼 {job.type}</span>{job.salary && <span>{job.salary}</span>}</div></div><span className="job-details-status">{job.status}</span></div></div>
      <div className="card profile-card"><h2>Job Description</h2><p>{job.description}</p></div>
      <div className="card profile-card"><div className="section-title"><div><h2>Required Skills</h2><p>{job.skills.length} skills required</p></div></div><div className="skills-container">{job.skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div></div>
      <div className="card profile-card"><p><strong>Application deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>{job.experience && <p><strong>Minimum experience:</strong> {job.experience}</p>}</div>
      {job.status !== "closed" && <div className="job-bottom-actions"><button className="secondary-button" onClick={closeJob}>Close Job</button></div>}
    </>}
  </main></div>;
}

export default JobDetails;
