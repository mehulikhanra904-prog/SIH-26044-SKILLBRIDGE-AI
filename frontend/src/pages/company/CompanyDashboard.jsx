import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function CompanyDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [jobsResponse, applicationsResponse] = await Promise.all([
          api.get("/jobs/mine"),
          api.get("/applications/company"),
        ]);
        setJobs(jobsResponse.data.jobs || []);
        setApplications(applicationsResponse.data.applications || []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load company dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const activeJobs = jobs.filter((job) => job.status === "published");
  const internships = activeJobs.filter(
    (job) => String(job.type).toLowerCase() === "internship"
  );
  const shortlisted = applications.filter((a) =>
    ["shortlisted", "interview", "selected"].includes(a.status)
  ).length;
  const selected = applications.filter((a) => a.status === "selected").length;
  const strongMatches = applications.filter(
    (a) => Number(a.matchScore || 0) >= 80
  ).length;

  return (
    <div className="dashboard-layout">
      <Sidebar type="company" />
      <main className="main-content">
        <Navbar
          title="Company Dashboard"
          subtitle="Find skilled candidates and manage your hiring pipeline."
        />

        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <div className="card">Loading company dashboard...</div>
        ) : (
          <>
            <div className="stats-grid">
              <Stat label="Active Jobs" value={activeJobs.length} description="Currently accepting applications" icon="J" />
              <Stat label="Internships" value={internships.length} description="Active internship opportunities" icon="I" />
              <Stat label="Applications" value={applications.length} description="Total applications received" icon="A" />
              <Stat label="AI Matches" value={strongMatches} description="Candidates with 80%+ skill match" icon="✦" />
            </div>

            <div className="dashboard-grid">
              <div className="card">
                <div className="section-title">
                  <h2>Hiring Overview</h2>
                  <span>Live</span>
                </div>
                <Overview label="Applications" value={applications.length} max={applications.length || 1} />
                <Overview label="Shortlisted" value={shortlisted} max={applications.length || 1} />
                <Overview label="Selected" value={selected} max={applications.length || 1} />
              </div>

              <div className="card">
                <div className="section-title">
                  <h2>AI Candidate Matching</h2>
                  <span>AI Powered</span>
                </div>
                <div className="ai-match-box">
                  <div className="ai-match-icon">✦</div>
                  <h3>{strongMatches} Strong Matches</h3>
                  <p>
                    Live candidate matches calculated from student skills against your job requirements.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => navigate("/company/candidates")}
                  >
                    View Candidates
                  </button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="section-title">
                <div>
                  <h2>Active Job Opportunities</h2>
                  <p className="muted-text">Manage your current hiring opportunities.</p>
                </div>
                <button
                  className="primary-button"
                  onClick={() => navigate("/company/jobs/create")}
                >
                  + Post New Job
                </button>
              </div>

              <div className="job-list">
                {activeJobs.length ? (
                  activeJobs.map((job) => (
                    <div className="job-item" key={job.id}>
                      <div className="job-icon">
                        {String(job.title || "J").slice(0, 2).toUpperCase()}
                      </div>
                      <div className="job-details">
                        <h3>{job.title}</h3>
                        <p>{(job.skills || []).join(" · ")}</p>
                      </div>
                      <span className="job-applications">
                        {applications.filter((a) => a.job?.id === job.id).length} Applications
                      </span>
                      <span className="job-status">Active</span>
                    </div>
                  ))
                ) : (
                  <p>No published jobs yet. Post your first opportunity.</p>
                )}
              </div>
            </div>

            <div className="card">
              <div className="section-title">
                <div>
                  <h2>Recent Applications</h2>
                  <p className="muted-text">Latest candidates for your jobs.</p>
                </div>
                <button
                  className="secondary-button"
                  onClick={() => navigate("/company/candidates")}
                >
                  View All
                </button>
              </div>

              <div className="candidate-list">
                {applications.slice(0, 5).map((application) => (
                  <div className="candidate-item" key={application.id}>
                    <div className="student-avatar">
                      {String(application.student?.name || "S").charAt(0).toUpperCase()}
                    </div>
                    <div className="candidate-info">
                      <strong>{application.student?.name || "Student"}</strong>
                      <p>{application.job?.title || "Job"}</p>
                    </div>
                    <span className="match-score">
                      {application.matchScore || 0}% Match
                    </span>
                    <button
                      className="secondary-button"
                      onClick={() => navigate("/company/candidates")}
                    >
                      View
                    </button>
                  </div>
                ))}
                {!applications.length && <p>No applications received yet.</p>}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value, description, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-label">{label}</span>
        <div className="stat-icon">{icon}</div>
      </div>
      <div className="stat-value">{value}</div>
      <p className="stat-description">{description}</p>
    </div>
  );
}

function Overview({ label, value, max }) {
  const width = `${Math.min(100, Math.round((value / max) * 100))}%`;
  return (
    <div className="analytics-item">
      <div className="analytics-header">
        <div>
          <strong>{label}</strong>
          <p>{value} candidates</p>
        </div>
        <strong>{value}</strong>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width }} />
      </div>
    </div>
  );
}

export default CompanyDashboard;
