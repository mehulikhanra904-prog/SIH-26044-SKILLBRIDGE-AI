import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function SkillAnalytics() {
  return (
    <div className="dashboard-layout">

      <Sidebar type="college" />

      <main className="main-content">

        <Navbar
          title="Skill Analytics"
          subtitle="Understand student skill trends and identify major industry skill gaps."
        />

        {/* Overview */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Most Common Skill
              </span>

              <div className="stat-icon">
                ★
              </div>
            </div>

            <div className="stat-value">
              Python
            </div>

            <p className="stat-description">
              74% of students
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Strongest Area
              </span>

              <div className="stat-icon">
                ↑
              </div>
            </div>

            <div className="stat-value">
              Frontend
            </div>

            <p className="stat-description">
              Average proficiency 82%
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Largest Skill Gap
              </span>

              <div className="stat-icon">
                !
              </div>
            </div>

            <div className="stat-value">
              Docker
            </div>

            <p className="stat-description">
              Only 31% proficiency
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Skills Tracked
              </span>

              <div className="stat-icon">
                #
              </div>
            </div>

            <div className="stat-value">
              42
            </div>

            <p className="stat-description">
              Across all departments
            </p>

          </div>

        </div>


        {/* Skill Distribution */}

        <div className="card">

          <div className="section-title">

            <h2>
              Student Skill Distribution
            </h2>

            <span>
              All Departments
            </span>

          </div>


          <div className="analytics-list">

            {/* Python */}

            <div className="analytics-item">

              <div className="analytics-header">

                <div>
                  <strong>Python</strong>
                  <p>924 students</p>
                </div>

                <strong>74%</strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "74%" }}
                />

              </div>

            </div>


            {/* JavaScript */}

            <div className="analytics-item">

              <div className="analytics-header">

                <div>
                  <strong>JavaScript</strong>
                  <p>861 students</p>
                </div>

                <strong>69%</strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "69%" }}
                />

              </div>

            </div>


            {/* SQL */}

            <div className="analytics-item">

              <div className="analytics-header">

                <div>
                  <strong>SQL</strong>
                  <p>798 students</p>
                </div>

                <strong>64%</strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "64%" }}
                />

              </div>

            </div>


            {/* React */}

            <div className="analytics-item">

              <div className="analytics-header">

                <div>
                  <strong>React</strong>
                  <p>713 students</p>
                </div>

                <strong>57%</strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "57%" }}
                />

              </div>

            </div>


            {/* Node */}

            <div className="analytics-item">

              <div className="analytics-header">

                <div>
                  <strong>Node.js</strong>
                  <p>582 students</p>
                </div>

                <strong>47%</strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "47%" }}
                />

              </div>

            </div>


            {/* Docker */}

            <div className="analytics-item">

              <div className="analytics-header">

                <div>
                  <strong>Docker</strong>
                  <p>387 students</p>
                </div>

                <strong>31%</strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "31%" }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* Department Comparison */}

        <div className="card">

          <div className="section-title">

            <h2>
              Department Skill Readiness
            </h2>

            <span>
              AI Analysis
            </span>

          </div>


          <div className="department-grid">

            <div className="department-card">

              <div className="department-header">

                <h3>
                  Computer Science
                </h3>

                <strong>
                  84%
                </strong>

              </div>

              <p>
                Strong in software development and programming.
              </p>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "84%" }}
                />

              </div>

            </div>


            <div className="department-card">

              <div className="department-header">

                <h3>
                  Information Technology
                </h3>

                <strong>
                  79%
                </strong>

              </div>

              <p>
                Strong in web development and databases.
              </p>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "79%" }}
                />

              </div>

            </div>


            <div className="department-card">

              <div className="department-header">

                <h3>
                  Electronics & Communication
                </h3>

                <strong>
                  68%
                </strong>

              </div>

              <p>
                Growing software and IoT capabilities.
              </p>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "68%" }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* AI Skill Gap */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI Skill Gap Insight
            </strong>

            <p>
              Docker, cloud computing and advanced backend
              development are currently the biggest skill gaps.
              The college could organize targeted training
              programs in these areas to improve placement
              readiness.
            </p>

          </div>

        </div>


        {/* Recommended Training */}

        <div className="card">

          <div className="section-title">

            <h2>
              Recommended Training Programs
            </h2>

            <span>
              AI Suggested
            </span>

          </div>


          <div className="training-list">

            <div className="training-item">

              <div className="training-number">
                1
              </div>

              <div>

                <h3>
                  Docker & Cloud Deployment
                </h3>

                <p>
                  High priority · 61% skill gap
                </p>

              </div>

              <button className="secondary-button">
                Plan Training
              </button>

            </div>


            <div className="training-item">

              <div className="training-number">
                2
              </div>

              <div>

                <h3>
                  Advanced Backend Development
                </h3>

                <p>
                  Medium priority · 43% skill gap
                </p>

              </div>

              <button className="secondary-button">
                Plan Training
              </button>

            </div>


            <div className="training-item">

              <div className="training-number">
                3
              </div>

              <div>

                <h3>
                  AI & Machine Learning
                </h3>

                <p>
                  Medium priority · 38% skill gap
                </p>

              </div>

              <button className="secondary-button">
                Plan Training
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default SkillAnalytics;