import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const statusOptions = ["under_review", "shortlisted", "interview", "selected", "rejected"];

function CompanyApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    try {
      const { data } = await api.get("/applications/company");
      setApplications(data.applications);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load candidate applications.");
    }
  };
  useEffect(() => { loadApplications(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/applications/${id}/status`, { status });
      setApplications((current) => current.map((application) => application.id === id ? data.application : application));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update the application.");
    }
  };

  const summary = useMemo(() => ({ total: applications.length, shortlisted: applications.filter((item) => item.status === "shortlisted").length, interviews: applications.filter((item) => item.status === "interview").length }), [applications]);

  return <div className="dashboard-layout"><Sidebar type="company" /><main className="main-content">
    <Navbar title="Applications" subtitle="Review live candidate applications for your job postings." />
    {error && <p className="error-message">{error}</p>}
    <div className="stats-grid"><Stat label="Total Applications" value={summary.total} /><Stat label="Shortlisted" value={summary.shortlisted} /><Stat label="Interviews" value={summary.interviews} /></div>
    <div className="card profile-card"><div className="section-title"><div><h2>Candidate Applications</h2><p>Matches are calculated from candidate skills and job requirements.</p></div></div>
      {applications.length ? applications.map((application) => <div className="job-card" key={application.id}><div className="job-main"><div className="company-logo">{application.student?.name?.charAt(0)?.toUpperCase() || "S"}</div><div className="job-details"><h2>{application.student?.name || "Student"}</h2><p className="company-name">Applied for {application.job?.title}</p><div className="skill-list">{application.student?.skills?.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div></div></div><div className="job-match"><div className="match-circle">{application.matchScore}%</div><span>Skill Match</span><select className="filter-select" value={application.status} disabled={application.status === "withdrawn"} onChange={(event) => updateStatus(application.id, event.target.value)}><option value={application.status}>{application.status.replaceAll("_", " ")}</option>{statusOptions.filter((item) => item !== application.status).map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select></div></div>) : <p>No applications received yet.</p>}
    </div>
  </main></div>;
}

function Stat({ label, value }) { return <div className="stat-card"><span className="stat-label">{label}</span><div className="stat-value">{value}</div></div>; }

export default CompanyApplications;
