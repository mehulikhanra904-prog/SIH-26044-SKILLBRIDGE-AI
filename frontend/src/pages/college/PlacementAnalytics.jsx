import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api";

function PlacementAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/colleges/analytics").then(({ data }) => setAnalytics(data)).catch((err) => setError(err.response?.data?.message || "Unable to load placement analytics.")); }, []);
  const total = analytics?.totalStudents || 0;
  const selected = analytics?.selected || 0;
  const shortlisted = analytics?.shortlisted || 0;
  const rate = analytics?.placementRate || 0;
  return <div className="dashboard-layout"><Sidebar type="college" /><main className="main-content">
    <Navbar title="Placement Analytics" subtitle="Track placement performance from your college's real application data." />
    {error && <div className="error-message">{error}</div>}
    <div className="stats-grid">
      {[['Placement Rate', `${rate}%`], ['Students Placed', selected], ['Students Tracked', total], ['Shortlisted', shortlisted]].map(([label, value]) => <div className="stat-card" key={label}><span className="stat-label">{label}</span><div className="stat-value">{value}</div><p className="stat-description">Calculated from current records</p></div>)}
    </div>
    <div className="card"><div className="section-title"><h2>Placement Progress</h2><span>Current data</span></div><div className="placement-progress"><div className="placement-progress-header"><div><strong>Overall Placement</strong><p>{selected} selected out of {total} students</p></div><strong>{rate}%</strong></div><div className="progress-bar large-progress"><div className="progress-fill" style={{ width: `${rate}%` }} /></div></div></div>
    <div className="card"><div className="section-title"><h2>Career Roles</h2><span>Student preferences</span></div><div className="analytics-list">{analytics?.careerRoles?.length ? analytics.careerRoles.map((item) => { const pct = total ? Math.round((item.count / total) * 100) : 0; return <div className="analytics-item" key={item.role}><div className="analytics-header"><div><strong>{item.role}</strong><p>{item.count} students</p></div><strong>{pct}%</strong></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div></div>; }) : <div className="no-results"><h3>No Career Data</h3><p>Student preferred roles will appear here.</p></div>}</div></div>
    <div className="ai-info"><div className="ai-info-icon">✦</div><div><strong>Placement Insight</strong><p>{selected ? `${selected} students are currently marked selected from ${analytics?.totalApplications || 0} applications.` : 'No students are currently marked selected in the application data.'}</p></div></div>
  </main></div>;
}
export default PlacementAnalytics;
