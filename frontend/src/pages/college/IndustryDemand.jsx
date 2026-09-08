import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function IndustryDemand() {
  return (
    <div className="dashboard-layout">

      <Sidebar type="college" />

      <main className="main-content">

        <Navbar
          title="Industry Demand"
          subtitle="Compare industry skill requirements with your students' current capabilities."
        />

        {/* Overview */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Companies Analyzed
              </span>

              <div className="stat-icon">
                C
              </div>
            </div>

            <div className="stat-value">
              142
            </div>

            <p className="stat-description">
              Industry hiring data
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                High Demand Skills
              </span>

              <div className="stat-icon">
                ↑
              </div>
            </div>

            <div className="stat-value">
              18
            </div>

            <p className="stat-description">
              Currently trending
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Average Skill Match
              </span>

              <div className="stat-icon">
                %
              </div>
            </div>

            <div className="stat-value">
              67%
            </div>

            <p className="stat-description">
              Students vs industry
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Critical Gaps
              </span>

              <div className="stat-icon">
                !
              </div>
            </div>

            <div className="stat-value">
              7
            </div>

            <p className="stat-description">
              Require immediate training
            </p>

          </div>

        </div>


        {/* Industry Skills */}

        <div className="card">

          <div className="section-title">

            <h2>
              Top Industry Skills
            </h2>

            <span>
              2026 Market Analysis
            </span>

          </div>


          <div className="analytics-list">

            {/* Skill 1 */}

            <div className="analytics-item">

              <div className="analytics-header">

                <div>

                  <strong>
                    Artificial Intelligence
                  </strong>

                  <p>
                    Required by 91% of analyzed companies
                  </p>

                </div>

                <strong>
                  91%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "91%" }}
                />

              </div>

            </div>


            {/* Skill 2 */}

            <div className="analytics-item">

              <div className="analytics-header">

                <div>

                  <strong>
                    Full Stack Development
                  </strong>

                  <p>
                    Required by 87% of analyzed companies
                  </p>

                </div>

                <strong>
                  87%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "87%" }}
                />

              </div>

            </div>


            {/* Skill 3 */}

            <div className="analytics-item">

              <div className="analytics-header">

                <div>

                  <strong>
                    Cloud Computing
                  </strong>

                  <p>
                    Required by 79% of analyzed companies
                  </p>

                </div>

                <strong>
                  79%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "79%" }}
                />

              </div>

            </div>


            {/* Skill 4 */}

            <div className="analytics-item">

              <div className="analytics-header">

                <div>

                  <strong>
                    Data Science
                  </strong>

                  <p>
                    Required by 73% of analyzed companies
                  </p>

                </div>

                <strong>
                  73%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "73%" }}
                />

              </div>

            </div>


            {/* Skill 5 */}

            <div className="analytics-item">

              <div className="analytics-header">

                <div>

                  <strong>
                    Cybersecurity
                  </strong>

                  <p>
                    Required by 64% of analyzed companies
                  </p>

                </div>

                <strong>
                  64%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "64%" }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* Skill Gap Comparison */}

        <div className="card">

          <div className="section-title">

            <h2>
              Industry vs Student Skills
            </h2>

            <span>
              Gap Analysis
            </span>

          </div>


          <div className="comparison-list">

            {/* AI */}

            <div className="comparison-item">

              <div className="comparison-header">

                <strong>
                  Artificial Intelligence
                </strong>

                <span className="gap-high">
                  28% Gap
                </span>

              </div>

              <div className="comparison-bars">

                <div className="comparison-row">

                  <span>
                    Industry
                  </span>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{ width: "91%" }}
                    />

                  </div>

                  <strong>
                    91%
                  </strong>

                </div>


                <div className="comparison-row">

                  <span>
                    Students
                  </span>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{ width: "63%" }}
                    />

                  </div>

                  <strong>
                    63%
                  </strong>

                </div>

              </div>

            </div>


            {/* Cloud */}

            <div className="comparison-item">

              <div className="comparison-header">

                <strong>
                  Cloud Computing
                </strong>

                <span className="gap-high">
                  37% Gap
                </span>

              </div>

              <div className="comparison-bars">

                <div className="comparison-row">

                  <span>
                    Industry
                  </span>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{ width: "79%" }}
                    />

                  </div>

                  <strong>
                    79%
                  </strong>

                </div>


                <div className="comparison-row">

                  <span>
                    Students
                  </span>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{ width: "42%" }}
                    />

                  </div>

                  <strong>
                    42%
                  </strong>

                </div>

              </div>

            </div>


            {/* Full Stack */}

            <div className="comparison-item">

              <div className="comparison-header">

                <strong>
                  Full Stack Development
                </strong>

                <span className="gap-medium">
                  15% Gap
                </span>

              </div>

              <div className="comparison-bars">

                <div className="comparison-row">

                  <span>
                    Industry
                  </span>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{ width: "87%" }}
                    />

                  </div>

                  <strong>
                    87%
                  </strong>

                </div>


                <div className="comparison-row">

                  <span>
                    Students
                  </span>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{ width: "72%" }}
                    />

                  </div>

                  <strong>
                    72%
                  </strong>

                </div>

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
              AI Training Recommendation
            </strong>

            <p>
              Cloud Computing has the largest gap between
              industry demand and student proficiency.
              Consider launching an AWS, Azure or Docker
              training program before the next placement cycle.
            </p>

          </div>

        </div>


        {/* Priority Training */}

        <div className="card">

          <div className="section-title">

            <h2>
              Training Priority
            </h2>

            <span>
              AI Recommended
            </span>

          </div>


          <div className="training-list">

            <div className="training-item">

              <div className="training-number">
                1
              </div>

              <div>

                <h3>
                  Cloud Computing
                </h3>

                <p>
                  Critical · 37% industry skill gap
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
                  Artificial Intelligence
                </h3>

                <p>
                  High · 28% industry skill gap
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
                  Cybersecurity
                </h3>

                <p>
                  Medium · 24% industry skill gap
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

export default IndustryDemand;