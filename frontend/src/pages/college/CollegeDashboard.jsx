import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api";

function CollegeDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/colleges/analytics")
      .then(({ data }) => setAnalytics(data))
      .catch((err) => setError(err.response?.data?.message || "Unable to load college analytics."));
  }, []);

  if (!analytics) return <div className="dashboard-layout"><Sidebar type="college" /><main className="main-content"><Navbar title="College Dashboard" subtitle="Monitor student skills, placements and industry readiness." />{error ? <div className="error-message">{error}</div> : <p>Loading analytics...</p>}</main></div>;

  const total = analytics.totalStudents || 0;
  const placed = analytics.selected || 0;
  const readiness = analytics.totalApplications ? Math.round((analytics.shortlisted / analytics.totalApplications) * 100) : 0;

  return <div className="dashboard-layout"><Sidebar type="college" /><main className="main-content">
    <Navbar title="College Dashboard" subtitle="Monitor student skills, placements and industry readiness." />
    {error && <div className="error-message">{error}</div>}
    <div className="stats-grid">
      {[['Total Students', total], ['Students Placed', placed], ['Placement Rate', `${analytics.placementRate || 0}%`], ['Companies Engaged', analytics.companiesEngaged || 0]].map(([label,value]) => <div className="stat-card" key={label}><span className="stat-label">{label}</span><div className="stat-value">{value}</div><p className="stat-description">Live data from your college</p></div>)}
    </div>
    <div className="dashboard-grid"><div className="card"><div className="section-title"><h2>Student Skill Distribution</h2><span>{total} Students</span></div><div className="skill-list">{(analytics.topSkills || []).map(({skill,count}) => { const percent = total ? Math.round((count/total)*100) : 0; return <div className="skill-row" key={skill}><div className="skill-row-header"><span>{skill}</span><strong>{percent}%</strong></div><div className="progress-bar"><div className="progress-fill" style={{width:`${percent}%`}} /></div></div>; })}</div></div>
      <div className="card"><div className="section-title"><h2>Career Roles</h2><span>{analytics.careerRoles?.length || 0} Roles</span></div><div className="demand-list">{(analytics.careerRoles || []).slice(0,6).map(({role,count}) => <div className="demand-item" key={role}><div><strong>{role}</strong><p>{count} students</p></div><span>{total ? Math.round((count/total)*100) : 0}%</span></div>)}</div></div></div>
    <div className="card"><div className="section-title"><h2>Placement Overview</h2><span>Live Academic Data</span></div><div className="placement-grid"><div className="placement-box"><strong>{placed}</strong><span>Students Placed</span></div><div className="placement-box"><strong>{analytics.totalApplications || 0}</strong><span>Applications</span></div><div className="placement-box"><strong>{analytics.shortlisted || 0}</strong><span>Shortlisted</span></div><div className="placement-box"><strong>{analytics.companiesEngaged || 0}</strong><span>Companies</span></div></div></div>
    <div className="ai-info"><div className="ai-info-icon">✦</div><div><strong>AI College Insight</strong><p>{readiness ? `Current application-to-shortlist readiness is ${readiness}%. Use the skill and role data above to target training where it is most needed.` : "Collecting enough application data to generate a college readiness insight."}</p></div></div>
  </main></div>;
}

export default CollegeDashboard;
