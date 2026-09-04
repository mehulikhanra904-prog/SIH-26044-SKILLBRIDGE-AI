import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function CompanyDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">

      <Sidebar type="company" />

      <main className="main-content">

        <Navbar
          title="Company Dashboard"
          subtitle="Find skilled candidates and manage your hiring pipeline."
        />

        {/* ============================= */}
        {/* STATISTICS */}
        {/* ============================= */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Active Jobs
              </span>

              <div className="stat-icon">
                J
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
                Internships
              </span>

              <div className="stat-icon">
                I
              </div>
            </div>

            <div className="stat-value">
              8
            </div>

            <p className="stat-description">
              Active internship opportunities
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
              Total applications received
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                AI Matches
              </span>

              <div className="stat-icon">
                ✦
              </div>
            </div>

            <div className="stat-value">
              74
            </div>

            <p className="stat-description">
              Highly matched candidates
            </p>

          </div>

        </div>


        {/* ============================= */}
        {/* HIRING OVERVIEW */}
        {/* ============================= */}

        <div className="dashboard-grid">

          <div className="card">

            <div className="section-title">

              <h2>
                Hiring Overview
              </h2>

              <span>
                Current Month
              </span>

            </div>


            <div className="analytics-list">

              <div className="analytics-item">

                <div className="analytics-header">

                  <div>
                    <strong>
                      Applications
                    </strong>

                    <p>
                      486 candidates applied
                    </p>
                  </div>

                  <strong>
                    486
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{ width: "82%" }}
                  />

                </div>

              </div>


              <div className="analytics-item">

                <div className="analytics-header">

                  <div>
                    <strong>
                      Shortlisted
                    </strong>

                    <p>
                      Candidates moved to next stage
                    </p>
                  </div>

                  <strong>
                    128
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{ width: "54%" }}
                  />

                </div>

              </div>


              <div className="analytics-item">

                <div className="analytics-header">

                  <div>
                    <strong>
                      Interviewed
                    </strong>

                    <p>
                      Candidates interviewed
                    </p>
                  </div>

                  <strong>
                    64
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{ width: "36%" }}
                  />

                </div>

              </div>


              <div className="analytics-item">

                <div className="analytics-header">

                  <div>
                    <strong>
                      Selected
                    </strong>

                    <p>
                      Candidates receiving offers
                    </p>
                  </div>

                  <strong>
                    28
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{ width: "20%" }}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* ============================= */}
          {/* AI CANDIDATE MATCHING */}
          {/* ============================= */}

          <div className="card">

            <div className="section-title">

              <h2>
                AI Candidate Matching
              </h2>

              <span>
                AI Powered
              </span>

            </div>


            <div className="ai-match-box">

              <div className="ai-match-icon">
                ✦
              </div>

              <h3>
                74 Strong Matches
              </h3>

              <p>
                Our AI found candidates whose skills,
                projects and experience closely match
                your current job requirements.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  navigate("/company/candidates")
                }
              >
                View Candidates
              </button>

            </div>

          </div>

        </div>


        {/* ============================= */}
        {/* ACTIVE JOBS */}
        {/* ============================= */}

        <div className="card">

          <div className="section-title">

            <div>
              <h2>
                Active Job Opportunities
              </h2>

              <p className="muted-text">
                Manage your current hiring opportunities.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() =>
                navigate("/company/jobs/create")
              }
            >
              + Post New Job
            </button>

          </div>


          <div className="job-list">

            {/* JOB 1 */}

            <div className="job-item">

              <div className="job-icon">
                FS
              </div>

              <div className="job-details">

                <h3>
                  Full Stack Developer
                </h3>

                <p>
                  React · Node.js · MongoDB
                </p>

              </div>

              <span className="job-applications">
                124 Applications
              </span>

              <span className="job-status">
                Active
              </span>

            </div>


            {/* JOB 2 */}

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

              </div>

              <span className="job-applications">
                87 Applications
              </span>

              <span className="job-status">
                Active
              </span>

            </div>


            {/* JOB 3 */}

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

              </div>

              <span className="job-applications">
                156 Applications
              </span>

              <span className="job-status">
                Active
              </span>

            </div>

          </div>

        </div>


        {/* ============================= */}
        {/* RECENT APPLICATIONS */}
        {/* ============================= */}

        <div className="card">

          <div className="section-title">

            <div>
              <h2>
                Recent Applications
              </h2>

              <p className="muted-text">
                Latest candidates matching your requirements.
              </p>
            </div>

            <button
              className="secondary-button"
              onClick={() =>
                navigate("/company/candidates")
              }
            >
              View All
            </button>

          </div>


          <div className="candidate-list">

            {/* CANDIDATE 1 */}

            <div className="candidate-item">

              <div className="student-avatar">
                A
              </div>

              <div className="candidate-info">

                <strong>
                  Aarav Sharma
                </strong>

                <p>
                  Full Stack Developer
                </p>

              </div>

              <span className="match-score">
                94% Match
              </span>

              <button
                className="secondary-button"
                onClick={() =>
                  navigate("/company/candidates")
                }
              >
                View
              </button>

            </div>


            {/* CANDIDATE 2 */}

            <div className="candidate-item">

              <div className="student-avatar">
                P
              </div>

              <div className="candidate-info">

                <strong>
                  Priya Das
                </strong>

                <p>
                  AI / ML Engineer
                </p>

              </div>

              <span className="match-score">
                91% Match
              </span>

              <button
                className="secondary-button"
                onClick={() =>
                  navigate("/company/candidates")
                }
              >
                View
              </button>

            </div>


            {/* CANDIDATE 3 */}

            <div className="candidate-item">

              <div className="student-avatar">
                S
              </div>

              <div className="candidate-info">

                <strong>
                  Sneha Roy
                </strong>

                <p>
                  Web Developer Intern
                </p>

              </div>

              <span className="match-score">
                87% Match
              </span>

              <button
                className="secondary-button"
                onClick={() =>
                  navigate("/company/candidates")
                }
              >
                View
              </button>

            </div>

          </div>

        </div>


        {/* ============================= */}
        {/* AI INSIGHT */}
        {/* ============================= */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI Hiring Insight
            </strong>

            <p>
              Candidates with React, Node.js and cloud
              deployment experience are currently the
              strongest matches for your open Full Stack
              Developer position.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CompanyDashboard;