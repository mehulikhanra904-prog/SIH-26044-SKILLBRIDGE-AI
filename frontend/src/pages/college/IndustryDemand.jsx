import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api";

function IndustryDemand() {
  const [analytics, setAnalytics] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { Promise.all([api.get("/colleges/analytics"), api.get("/jobs/published")]).then(([analyticsResponse, jobsResponse]) => { setAnalytics(analyticsResponse.data); setJobs(jobsResponse.data.jobs || []); }).catch((err) => setError(err.response?.data?.message || "Unable to load industry demand data.")); }, []);
  const totalStudents = analytics?.totalStudents || 0;
  const skillMap = useMemo(() => { const map = {}; jobs.forEach((job) => (job.skills || []).forEach((skill) => { const key = String(skill).trim(); if (key) map[key] = (map[key] || 0) + 1; })); return map; }, [jobs]);
  const studentMap = Object.fromEntries((analytics?.topSkills || []).map((item) => [item.skill.toLowerCase(), item.count]));
  const demand = Object.entries(skillMap).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([skill, count]) => { const industryPct = jobs.length ? Math.round((count / jobs.length) * 100) : 0; const studentCount = studentMap[skill.toLowerCase()] || 0; const studentPct = totalStudents ? Math.round((studentCount / totalStudents) * 100) : 0; return { skill, count, industryPct, studentPct, gap: Math.max(0, industryPct - studentPct) }; });
  const averageMatch = demand.length ? Math.round(demand.reduce((sum, item) => sum + Math.min(100, item.studentPct / Math.max(item.industryPct, 1) * 100), 0) / demand.length) : 0;
  const criticalGaps = demand.filter((item) => item.gap >= 25).length;
  return <div className="dashboard-layout"><Sidebar type="college" /><main className="main-content">
    <Navbar title="Industry Demand" subtitle="Compare skills requested by published jobs with your students' current skills." />
    {error && <div className="error-message">{error}</div>}
    <div className="stats-grid">{[['Jobs Analyzed', jobs.length], ['Skills Tracked', demand.length], ['Average Skill Match', `${averageMatch}%`], ['Critical Gaps', criticalGaps]].map(([label, value]) => <div className="stat-card" key={label}><span className="stat-label">{label}</span><div className="stat-value">{value}</div><p className="stat-description">Based on current platform data</p></div>)}</div>
    <div className="card"><div className="section-title"><h2>Top Industry Skills</h2><span>Published jobs</span></div><div className="analytics-list">{demand.length ? demand.map((item) => <div className="analytics-item" key={item.skill}><div className="analytics-header"><div><strong>{item.skill}</strong><p>Required by {item.industryPct}% of published jobs</p></div><strong>{item.industryPct}%</strong></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${item.industryPct}%` }} /></div></div>) : <div className="no-results"><h3>No Industry Data</h3><p>Publish jobs with required skills to generate industry demand analytics.</p></div>}</div></div>
    <div className="card"><div className="section-title"><h2>Industry vs Student Skills</h2><span>Gap Analysis</span></div><div className="comparison-list">{demand.map((item) => <div className="comparison-item" key={item.skill}><div className="comparison-header"><strong>{item.skill}</strong><span className={item.gap >= 25 ? "gap-high" : "gap-medium"}>{item.gap}% Gap</span></div><div className="comparison-bars"><div className="comparison-row"><span>Industry</span><div className="progress-bar"><div className="progress-fill" style={{ width: `${item.industryPct}%` }} /></div><strong>{item.industryPct}%</strong></div><div className="comparison-row"><span>Students</span><div className="progress-bar"><div className="progress-fill" style={{ width: `${item.studentPct}%` }} /></div><strong>{item.studentPct}%</strong></div></div></div>)}</div></div>
    <div className="ai-info"><div className="ai-info-icon">✦</div><div><strong>Data-driven Training Recommendation</strong><p>{demand[0] ? `${demand.slice().sort((a, b) => b.gap - a.gap)[0].skill} has the largest current demand gap. Use this real job and student data to prioritize training.` : 'Publish jobs and add student skills to generate recommendations.'}</p></div></div>
  </main></div>;
}
export default IndustryDemand;
