import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Internships() {
  return (
    <div className="dashboard-layout">

      <Sidebar type="company" />

      <main className="main-content">

        <Navbar
          title="Internships"
          subtitle="Manage internship opportunities and find talented students."
        />

        <div className="page-actions">

          <div>
            <h2 className="page-heading">
              Internship Opportunities
            </h2>

            <p className="page-subtitle">
              Create and manage internships for students.
            </p>
          </div>

          <button className="primary-button">
            + Post Internship
          </button>

        </div>


        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">

            <span className="stat-label">
              Active Internships
            </span>

            <div className="stat-value">
              8
            </div>

            <p className="stat-description">
              Currently available
            </p>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Applications
            </span>

            <div className="stat-value">
              312
            </div>

            <p className="stat-description">
              Total applications
            </p>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Shortlisted
            </span>

            <div className="stat-value">
              76
            </div>

            <p className="stat-description">
              Candidates shortlisted
            </p>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Selected
            </span>

            <div className="stat-value">
              21
            </div>

            <p className="stat-description">
              Students selected
            </p>

          </div>

        </div>


        {/* Search */}

        <div className="card">

          <div className="job-filter-row">

            <input
              className="search-input"
              type="text"
              placeholder="Search internships..."
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

            </select>

          </div>

        </div>


        {/* Internship List */}

        <div className="card">

          <div className="section-title">

            <h2>
              Your Internships
            </h2>

            <span>
              8 Opportunities
            </span>

          </div>


          <div className="job-list">


            {/* Internship 1 */}

            <div className="job-item">

              <div className="job-icon">
                FS
              </div>

              <div className="job-details">

                <h3>
                  Full Stack Development Intern
                </h3>

                <p>
                  React · Node.js · MongoDB · Git
                </p>

                <small>
                  Kolkata · 6 Months · ₹20K/month
                </small>

              </div>

              <div className="job-meta">

                <strong>
                  98
                </strong>

                <span>
                  Applications
                </span>

              </div>

              <span className="job-status">
                Active
              </span>

              <button className="secondary-button">
                View
              </button>

            </div>


            {/* Internship 2 */}

            <div className="job-item">

              <div className="job-icon">
                AI
              </div>

              <div className="job-details">

                <h3>
                  Artificial Intelligence Intern
                </h3>

                <p>
                  Python · ML · NLP · Generative AI
                </p>

                <small>
                  Remote · 6 Months · ₹25K/month
                </small>

              </div>

              <div className="job-meta">

                <strong>
                  74
                </strong>

                <span>
                  Applications
                </span>

              </div>

              <span className="job-status">
                Active
              </span>

              <button className="secondary-button">
                View
              </button>

            </div>


            {/* Internship 3 */}

            <div className="job-item">

              <div className="job-icon">
                DA
              </div>

              <div className="job-details">

                <h3>
                  Data Analytics Intern
                </h3>

                <p>
                  Python · SQL · Power BI · Excel
                </p>

                <small>
                  Bengaluru · 4 Months · ₹18K/month
                </small>

              </div>

              <div className="job-meta">

                <strong>
                  62
                </strong>

                <span>
                  Applications
                </span>

              </div>

              <span className="job-status">
                Active
              </span>

              <button className="secondary-button">
                View
              </button>

            </div>


            {/* Internship 4 */}

            <div className="job-item">

              <div className="job-icon">
                CS
              </div>

              <div className="job-details">

                <h3>
                  Cybersecurity Intern
                </h3>

                <p>
                  Network Security · Linux · SIEM
                </p>

                <small>
                  Hyderabad · 6 Months · ₹22K/month
                </small>

              </div>

              <div className="job-meta">

                <strong>
                  48
                </strong>

                <span>
                  Applications
                </span>

              </div>

              <span className="job-status">
                Active
              </span>

              <button className="secondary-button">
                View
              </button>

            </div>


          </div>

        </div>


        {/* AI Matching */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI Internship Matching
            </strong>

            <p>
              SkillBridge AI analyzes student skills, projects,
              certifications and career interests to recommend
              the most suitable candidates for your internships.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Internships;