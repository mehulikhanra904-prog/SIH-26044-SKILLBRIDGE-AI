import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function MyJobs() {
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

          <button className="primary-button">
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

        <div className="card">

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

        <div className="card">

          <div className="section-title">

            <h2>
              Your Job Postings
            </h2>

            <span>
              18 Jobs
            </span>

          </div>


          <div className="job-list">

            {/* Job 1 */}

            <div className="job-item">

              <div className="job-icon">
                FS
              </div>

              <div className="job-details">

                <h3>
                  Full Stack Developer
                </h3>

                <p>
                  React · Node.js · MongoDB · Git
                </p>

                <small>
                  Kolkata · Full Time · ₹6–10 LPA
                </small>

              </div>

              <div className="job-meta">

                <strong>
                  124
                </strong>

                <span>
                  Applications
                </span>

              </div>

              <span className="job-status">
                Active
              </span>

              <div className="job-actions">

                <button className="secondary-button">
                  View
                </button>

                <button className="secondary-button">
                  Edit
                </button>

              </div>

            </div>


            {/* Job 2 */}

            <div className="job-item">

              <div className="job-icon">
                AI
              </div>

              <div className="job-details">

                <h3>
                  AI / ML Engineer
                </h3>

                <p>
                  Python · Machine Learning · TensorFlow
                </p>

                <small>
                  Remote · Full Time · ₹8–14 LPA
                </small>

              </div>

              <div className="job-meta">

                <strong>
                  87
                </strong>

                <span>
                  Applications
                </span>

              </div>

              <span className="job-status">
                Active
              </span>

              <div className="job-actions">

                <button className="secondary-button">
                  View
                </button>

                <button className="secondary-button">
                  Edit
                </button>

              </div>

            </div>


            {/* Job 3 */}

            <div className="job-item">

              <div className="job-icon">
                WD
              </div>

              <div className="job-details">

                <h3>
                  Web Developer Intern
                </h3>

                <p>
                  HTML · CSS · JavaScript · React
                </p>

                <small>
                  Kolkata · Internship · ₹20K/month
                </small>

              </div>

              <div className="job-meta">

                <strong>
                  156
                </strong>

                <span>
                  Applications
                </span>

              </div>

              <span className="job-status">
                Active
              </span>

              <div className="job-actions">

                <button className="secondary-button">
                  View
                </button>

                <button className="secondary-button">
                  Edit
                </button>

              </div>

            </div>


            {/* Job 4 */}

            <div className="job-item">

              <div className="job-icon">
                DA
              </div>

              <div className="job-details">

                <h3>
                  Data Analyst
                </h3>

                <p>
                  Python · SQL · Power BI · Excel
                </p>

                <small>
                  Bengaluru · Full Time · ₹5–8 LPA
                </small>

              </div>

              <div className="job-meta">

                <strong>
                  64
                </strong>

                <span>
                  Applications
                </span>

              </div>

              <span className="job-status">
                Active
              </span>

              <div className="job-actions">

                <button className="secondary-button">
                  View
                </button>

                <button className="secondary-button">
                  Edit
                </button>

              </div>

            </div>


            {/* Job 5 */}

            <div className="job-item">

              <div className="job-icon">
                CS
              </div>

              <div className="job-details">

                <h3>
                  Cybersecurity Analyst
                </h3>

                <p>
                  Network Security · Linux · SIEM
                </p>

                <small>
                  Hyderabad · Full Time · ₹7–12 LPA
                </small>

              </div>

              <div className="job-meta">

                <strong>
                  55
                </strong>

                <span>
                  Applications
                </span>

              </div>

              <span className="job-status">
                Active
              </span>

              <div className="job-actions">

                <button className="secondary-button">
                  View
                </button>

                <button className="secondary-button">
                  Edit
                </button>

              </div>

            </div>

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