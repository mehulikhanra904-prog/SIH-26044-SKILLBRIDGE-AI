import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const jobs = [
  {
    id: 1,
    title: "Full Stack Developer",
    skills: "React · Node.js · MongoDB · Git",
    location: "Kolkata",
    type: "Full Time",
    salary: "₹6–10 LPA",
    applications: 124,
    status: "Active",
  },
  {
    id: 2,
    title: "AI / ML Engineer",
    skills: "Python · Machine Learning · TensorFlow",
    location: "Remote",
    type: "Full Time",
    salary: "₹8–14 LPA",
    applications: 87,
    status: "Active",
  },
  {
    id: 3,
    title: "Web Developer Intern",
    skills: "HTML · CSS · JavaScript · React",
    location: "Kolkata",
    type: "Internship",
    salary: "₹20K/month",
    applications: 156,
    status: "Active",
  },
  {
    id: 4,
    title: "Data Analyst",
    skills: "Python · SQL · Power BI · Excel",
    location: "Bengaluru",
    type: "Full Time",
    salary: "₹5–8 LPA",
    applications: 64,
    status: "Active",
  },
  {
    id: 5,
    title: "Cybersecurity Analyst",
    skills: "Network Security · Linux · SIEM",
    location: "Hyderabad",
    type: "Full Time",
    salary: "₹7–12 LPA",
    applications: 55,
    status: "Active",
  },
];

function MyJobs() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">

      <Sidebar type="company" />

      <main className="main-content">

        <Navbar
          title="My Jobs"
          subtitle="Manage your job postings and track candidate applications."
        />

        {/* Header */}

        <div className="page-actions">

          <div>
            <h2 className="page-heading">
              Job Postings
            </h2>

            <p className="page-subtitle">
              Manage all your active and previous opportunities.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => navigate("/company/jobs/create")}
          >
            + Post New Job
          </button>

        </div>


        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Total Jobs
              </span>

              <div className="stat-icon">
                J
              </div>
            </div>

            <div className="stat-value">
              18
            </div>

            <p className="stat-description">
              All job postings
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Active
              </span>

              <div className="stat-icon">
                ✓
              </div>
            </div>

            <div className="stat-value">
              12
            </div>

            <p className="stat-description">
              Currently accepting applications
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Applications
              </span>

              <div className="stat-icon">
                A
              </div>
            </div>

            <div className="stat-value">
              486
            </div>

            <p className="stat-description">
              Total applications
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Hired
              </span>

              <div className="stat-icon">
                ★
              </div>
            </div>

            <div className="stat-value">
              28
            </div>

            <p className="stat-description">
              Candidates selected
            </p>

          </div>

        </div>


        {/* Search */}

        <div className="card my-jobs-filter-card">

          <div className="job-filter-row">

            <input
              className="search-input"
              type="text"
              placeholder="Search jobs..."
            />

            <select className="filter-select">

              <option>
                All Status
              </option>

              <option>
                Active
              </option>

              <option>
                Closed
              </option>

              <option>
                Draft
              </option>

            </select>

          </div>

        </div>


        {/* Jobs */}

        <div className="card my-jobs-list-card">

          <div className="section-title">

            <div>
              <h2>
                Your Job Postings
              </h2>

              <span>
                Manage your current opportunities
              </span>
            </div>

            <span>
              18 Jobs
            </span>

          </div>


          <div className="job-list">

            {jobs.map((job) => (

              <div
                className="job-item my-job-item"
                key={job.id}
              >

                <div className="job-icon">
                  {job.title
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>


                <div className="job-details">

                  <h3>
                    {job.title}
                  </h3>

                  <p>
                    {job.skills}
                  </p>

                  <small>
                    {job.location} · {job.type} · {job.salary}
                  </small>

                </div>


                <div className="job-meta">

                  <strong>
                    {job.applications}
                  </strong>

                  <span>
                    Applications
                  </span>

                </div>


                <span className="job-status">
                  {job.status}
                </span>


                <div className="job-actions">

                  <button
                    className="secondary-button"
                    onClick={() =>
                      navigate(`/company/jobs/${job.id}`)
                    }
                  >
                    View
                  </button>

                  <button className="secondary-button">
                    Edit
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* AI Recommendation */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI Hiring Recommendation
            </strong>

            <p>
              Your Full Stack Developer position has received
              the highest number of applications. SkillBridge AI
              has identified 32 candidates with an 85% or higher
              skill match.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default MyJobs;