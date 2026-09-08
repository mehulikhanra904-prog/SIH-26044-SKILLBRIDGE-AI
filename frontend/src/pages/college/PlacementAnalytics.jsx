import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function PlacementAnalytics() {
  return (
    <div className="dashboard-layout">

      <Sidebar type="college" />

      <main className="main-content">

        <Navbar
          title="Placement Analytics"
          subtitle="Track placement performance and understand hiring outcomes."
        />

        {/* Overview */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Placement Rate
              </span>

              <div className="stat-icon">
                %
              </div>
            </div>

            <div className="stat-value">
              82%
            </div>

            <p className="stat-description">
              Overall placement rate
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Students Placed
              </span>

              <div className="stat-icon">
                ✓
              </div>
            </div>

            <div className="stat-value">
              1,024
            </div>

            <p className="stat-description">
              This academic year
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Average Package
              </span>

              <div className="stat-icon">
                ₹
              </div>
            </div>

            <div className="stat-value">
              ₹8.4 LPA
            </div>

            <p className="stat-description">
              Average salary
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Highest Package
              </span>

              <div className="stat-icon">
                ↑
              </div>
            </div>

            <div className="stat-value">
              ₹24 LPA
            </div>

            <p className="stat-description">
              Highest offer received
            </p>

          </div>

        </div>


        {/* Placement Progress */}

        <div className="card">

          <div className="section-title">

            <h2>
              Placement Progress
            </h2>

            <span>
              Current Academic Year
            </span>

          </div>


          <div className="placement-progress">

            <div className="placement-progress-header">

              <div>
                <strong>
                  Overall Placement
                </strong>

                <p>
                  1,024 out of 1,248 students placed
                </p>
              </div>

              <strong>
                82%
              </strong>

            </div>


            <div className="progress-bar large-progress">

              <div
                className="progress-fill"
                style={{ width: "82%" }}
              />

            </div>

          </div>

        </div>


        {/* Department Placement */}

        <div className="card">

          <div className="section-title">

            <h2>
              Department-wise Placement
            </h2>

            <span>
              Placement Rate
            </span>

          </div>


          <div className="analytics-list">

            <div className="analytics-item">

              <div className="analytics-header">

                <div>

                  <strong>
                    Computer Science
                  </strong>

                  <p>
                    420 placed out of 480 students
                  </p>

                </div>

                <strong>
                  88%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "88%" }}
                />

              </div>

            </div>


            <div className="analytics-item">

              <div className="analytics-header">

                <div>

                  <strong>
                    Information Technology
                  </strong>

                  <p>
                    310 placed out of 370 students
                  </p>

                </div>

                <strong>
                  84%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "84%" }}
                />

              </div>

            </div>


            <div className="analytics-item">

              <div className="analytics-header">

                <div>

                  <strong>
                    Electronics & Communication
                  </strong>

                  <p>
                    190 placed out of 250 students
                  </p>

                </div>

                <strong>
                  76%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "76%" }}
                />

              </div>

            </div>


            <div className="analytics-item">

              <div className="analytics-header">

                <div>

                  <strong>
                    Electrical Engineering
                  </strong>

                  <p>
                    104 placed out of 148 students
                  </p>

                </div>

                <strong>
                  70%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "70%" }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* Hiring Companies */}

        <div className="card">

          <div className="section-title">

            <h2>
              Top Hiring Companies
            </h2>

            <span>
              Current Year
            </span>

          </div>


          <div className="company-placement-list">

            <div className="company-placement-item">

              <div className="company-logo">
                T
              </div>

              <div>

                <strong>
                  TechNova Solutions
                </strong>

                <p>
                  128 students hired
                </p>

              </div>

              <span>
                ₹9.2 LPA
              </span>

            </div>


            <div className="company-placement-item">

              <div className="company-logo">
                I
              </div>

              <div>

                <strong>
                  InnovateX Technologies
                </strong>

                <p>
                  96 students hired
                </p>

              </div>

              <span>
                ₹8.7 LPA
              </span>

            </div>


            <div className="company-placement-item">

              <div className="company-logo">
                D
              </div>

              <div>

                <strong>
                  DataCore Systems
                </strong>

                <p>
                  82 students hired
                </p>

              </div>

              <span>
                ₹10.1 LPA
              </span>

            </div>


            <div className="company-placement-item">

              <div className="company-logo">
                C
              </div>

              <div>

                <strong>
                  CloudSphere
                </strong>

                <p>
                  74 students hired
                </p>

              </div>

              <span>
                ₹11.4 LPA
              </span>

            </div>

          </div>

        </div>


        {/* Salary Distribution */}

        <div className="card">

          <div className="section-title">

            <h2>
              Salary Distribution
            </h2>

            <span>
              Placed Students
            </span>

          </div>


          <div className="salary-grid">

            <div className="salary-box">

              <strong>
                286
              </strong>

              <span>
                Below ₹5 LPA
              </span>

            </div>


            <div className="salary-box">

              <strong>
                428
              </strong>

              <span>
                ₹5–10 LPA
              </span>

            </div>


            <div className="salary-box">

              <strong>
                248
              </strong>

              <span>
                ₹10–15 LPA
              </span>

            </div>


            <div className="salary-box">

              <strong>
                62
              </strong>

              <span>
                Above ₹15 LPA
              </span>

            </div>

          </div>

        </div>


        {/* AI Insight */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI Placement Insight
            </strong>

            <p>
              Students with stronger AI, cloud and full-stack
              skills are receiving higher-value opportunities.
              Increasing training in these areas could improve
              both placement rate and average package.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default PlacementAnalytics;