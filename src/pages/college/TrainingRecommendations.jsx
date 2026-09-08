import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function TrainingRecommendations() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/jobs/published").then(({ data }) => setJobs(data.jobs || [])).catch((requestError) => setError(requestError.response?.data?.message || "Unable to load recommendations.")); }, []);
  return <div className="dashboard-layout"><Sidebar type="college" /><main className="main-content"><Navbar title="Training Recommendations" subtitle="Current openings reveal the skills students should strengthen." />{error && <p className="error-message">{error}</p>}<div className="card"><div className="section-title"><h2>Skills requested by active employers</h2></div>{jobs.length ? jobs.map((job) => <div className="job-item" key={job.id}><div className="job-details"><h3>{job.title}</h3><p>{job.company?.name} · {job.location}</p><small>{job.skills?.join(", ")}</small></div></div>) : <p>No published opportunities available yet.</p>}</div></main></div>;
}

export default TrainingRecommendations;