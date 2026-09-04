import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function CollegeDashboard() {
  return (
    <div className="dashboard-layout">

      <Sidebar type="college" />

      <main className="main-content">

        <Navbar
          title="College Dashboard"
          subtitle="Monitor student skills, placements and industry readiness."
        />

        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Total Students
              </span>

              <div className="stat-icon">
                S
              </div>
            </div>

            <div className="stat-value">
              1,248
            </div>

            <p className="stat-description">
              Registered students
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Industry Ready
              </span>

              <div className="stat-icon">
                ✓
              </div>
            </div>

            <div className="stat-value">
              68%
            </div>

            <p className="stat-description">
              Students meeting job requirements
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Active Internships
              </span>

              <div className="stat-icon">
                I
              </div>
            </div>

            <div className="stat-value">
              86
            </div>

            <p className="stat-description">
              Currently available
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Placement Rate
              </span>

              <div className="stat-icon">
                P
              </div>
            </div>

            <div className="stat-value">
              82%
            </div>

            <p className="stat-description">
              Current placement performance
            </p>

          </div>

        </div>


        {/* Skill Readiness */}

        <div className="dashboard-grid">

          <div className="card">

            <div className="section-title">

              <h2>
                Student Skill Readiness
              </h2>

              <span>
                AI Analysis
              </span>

            </div>


            <div className="skill-row">

              <div className="skill-row-header">
                <span>Frontend Development</span>
                <strong>82%</strong>
              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "82%" }}
                />

              </div>

            </div>


            <div className="skill-row">

              <div className="skill-row-header">
                <span>Backend Development</span>
                <strong>71%</strong>
              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "71%" }}
                />

              </div>

            </div>


            <div className="skill-row">

              <div className="skill-row-header">
                <span>Data Science</span>
                <strong>54%</strong>
              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "54%" }}
                />

              </div>

            </div>


            <div className="skill-row">

              <div className="skill-row-header">
                <span>Cloud & DevOps</span>
                <strong>42%</strong>
              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "42%" }}
                />

              </div>

            </div>

          </div>


          {/* Industry Demand */}

          <div className="card">

            <div className="section-title">

              <h2>
                Industry Demand
              </h2>

              <span>
                2026
              </span>

            </div>


            <div className="demand-list">

              <div className="demand-item">

                <div>
                  <strong>AI / ML</strong>
                  <p>Very High Demand</p>
                </div>

                <span className="demand-high">
                  94%
                </span>

              </div>


              <div className="demand-item">

                <div>
                  <strong>Full Stack</strong>
                  <p>High Demand</p>
                </div>

                <span className="demand-high">
                  89%
                </span>

              </div>


              <div className="demand-item">

                <div>
                  <strong>Cloud Computing</strong>
                  <p>Growing Demand</p>
                </div>

                <span className="demand-medium">
                  76%
                </span>

              </div>


              <div className="demand-item">

                <div>
                  <strong>Cybersecurity</strong>
                  <p>Growing Demand</p>
                </div>

                <span className="demand-medium">
                  71%
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* Placement Overview */}

        <div className="card">

          <div className="section-title">

            <h2>
              Placement Overview
            </h2>

            <span>
              Current Academic Year
            </span>

          </div>


          <div className="placement-grid">

            <div className="placement-box">

              <strong>
                1,024
              </strong>

              <span>
                Students Placed
              </span>

            </div>


            <div className="placement-box">

              <strong>
                142
              </strong>

              <span>
                Companies
              </span>

            </div>


            <div className="placement-box">

              <strong>
                ₹8.4 LPA
              </strong>

              <span>
                Average Package
              </span>

            </div>


            <div className="placement-box">

              <strong>
                ₹24 LPA
              </strong>

              <span>
                Highest Package
              </span>

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
              AI Recommendation for the College
            </strong>

            <p>
              Cloud & DevOps is currently the largest
              skill gap among students. Consider organizing
              Docker, AWS and CI/CD training programs to
              improve industry readiness.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CollegeDashboard;