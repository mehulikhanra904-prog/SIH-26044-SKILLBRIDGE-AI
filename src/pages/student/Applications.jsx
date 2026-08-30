import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const loadApplications = async () => {
    try {
      const { data } = await api.get("/applications/mine");
      setApplications(data.applications);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load applications.");
    }
  };
  useEffect(() => { loadApplications(); }, []);

  const withdraw = async (id) => {
    if (!window.confirm("Withdraw this application?")) return;
    try {
      const { data } = await api.patch(`/applications/${id}/withdraw`);
      setApplications((current) => current.map((application) => application.id === id ? data.application : application));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to withdraw application.");
    }
  };

  const visibleApplications = useMemo(() => applications.filter((application) => {
    const text = `${application.job?.title || ""} ${application.job?.company?.name || ""} ${application.job?.skills?.join(" ") || ""}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (!status || application.status === status);
  }), [applications, search, status]);

  return <div className="dashboard-layout"><Sidebar type="student" /><main className="main-content">
    <Navbar title="My Applications" subtitle="Track applications and real-time hiring status." />
    {error && <p className="error-message">{error}</p>}
    <div className="card"><div className="search-row"><input className="search-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search jobs, companies or skills..." /><select className="filter-select" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">All statuses</option>{[...new Set(applications.map((application) => application.status))].map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select></div></div>
    <div className="card profile-card"><div className="section-title"><div><h2>Applications</h2><p>{visibleApplications.length} application{visibleApplications.length === 1 ? "" : "s"}</p></div></div>
      {visibleApplications.length ? visibleApplications.map((application) => <div className="job-card" key={application.id}><div className="job-main"><div className="company-logo">{application.job?.company?.name?.charAt(0)?.toUpperCase() || "C"}</div><div className="job-details"><h2>{application.job?.title || "Job unavailable"}</h2><p className="company-name">{application.job?.company?.name}</p><div className="job-meta"><span>📍 {application.job?.location}</span><span>💼 {application.job?.type}</span></div></div></div><div className="job-match"><span className="status">{application.status.replaceAll("_", " ")}</span><small>Applied {new Date(application.appliedAt).toLocaleDateString()}</small>{!["selected", "rejected", "withdrawn"].includes(application.status) && <button className="secondary-button" onClick={() => withdraw(application.id)}>Withdraw</button>}</div></div>) : <p>No applications found.</p>}
    </div>
  </main></div>;
}

export default Applications;
