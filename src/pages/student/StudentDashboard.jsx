import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([api.get("/students/profile"), api.get("/jobs/recommendations"), api.get("/applications/mine")])
      .then(([profileResponse, jobsResponse, applicationsResponse]) => {
        setProfile(profileResponse.data.student);
        setJobs(jobsResponse.data.recommendations || []);
        setApplications(applicationsResponse.data.applications || []);
      })
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load dashboard."));
  }, []);
  if (!profile) return <main className="main-content">{error || "Loading dashboard..."}</main>;
  return <div className="dashboard-layout"><Sidebar type="student" /><main className="main-content">
    <Navbar title="Student Dashboard" subtitle="Your profile, applications and live opportunities." />
    {error && <p className="error-message">{error}</p>}
    <div className="page-actions"><div><h1 className="page-heading">Welcome back, {profile.name}!</h1><p className="page-subtitle">{profile.profile?.collegeName || "Complete your profile to improve matching."}</p></div></div>
    <div className="stats-grid"><Stat label="Profile skills" value={profile.profile?.skills?.length || 0} /><Stat label="Applications" value={applications.length} /><Stat label="Recommended jobs" value={jobs.length} /></div>
    <div className="card"><div className="section-title"><h2>Top opportunities</h2></div>{jobs.slice(0, 3).map((job) => <div className="job-item" key={job.id}><div className="job-details"><h3>{job.title}</h3><p>{job.company?.name} · {job.location}</p></div><span className="job-status">{job.matchScore}% match</span></div>)}{!jobs.length && <p>No published jobs match your profile yet.</p>}</div>
  </main></div>;
}

function Stat({ label, value }) { return <div className="stat-card"><span className="stat-label">{label}</span><div className="stat-value">{value}</div></div>; }

export default StudentDashboard;
