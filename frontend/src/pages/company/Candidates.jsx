import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Candidates() {
  return (
    <div className="dashboard-layout">

      <Sidebar type="company" />

      <main className="main-content">

        <Navbar
          title="Candidates"
          subtitle="Discover and shortlist students using AI-powered skill matching."
        />

        {/* Header */}

        <div className="page-actions">

          <div>
            <h2 className="page-heading">
              Find Candidates
            </h2>

            <p className="page-subtitle">
              Discover students who match your job requirements.
            </p>
          </div>

          <button className="primary-button">
            AI Match Candidates
          </button>

        </div>


        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">

            <span className="stat-label">
              Total Candidates
            </span>

            <div className="stat-value">
              2,486
            </div>

            <p className="stat-description">
              Registered students
            </p>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Highly Matched
            </span>

            <div className="stat-value">
              326
            </div>

            <p className="stat-description">
              80%+ skill match
            </p>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Shortlisted
            </span>

            <div className="stat-value">
              84
            </div>

            <p className="stat-description">
              Your shortlisted candidates
            </p>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Interview Ready
            </span>

            <div className="stat-value">
              142
            </div>

            <p className="stat-description">
              High readiness score
            </p>

          </div>

        </div>


        {/* Filters */}

        <div className="card">

          <div className="candidate-filter-row">

            <input
              className="search-input"
              type="text"
              placeholder="Search candidates by name or skill..."
            />

            <select className="filter-select">

              <option>
                All Departments
              </option>

              <option>
                Computer Science
              </option>

              <option>
                Information Technology
              </option>

              <option>
                Electronics
              </option>

              <option>
                Mechanical
              </option>

            </select>


            <select className="filter-select">

              <option>
                Skill Match
              </option>

              <option>
                90%+
              </option>

              <option>
                80%+
              </option>

              <option>
                70%+
              </option>

            </select>

          </div>

        </div>


        {/* Candidates */}

        <div className="card">

          <div className="section-title">

            <div>

              <h2>
                Recommended Candidates
              </h2>

              <p>
                Candidates ranked according to your hiring requirements.
              </p>

            </div>

            <span>
              326 Matches
            </span>

          </div>


          <div className="candidate-list">


            {/* Candidate 1 */}

            <div className="candidate-card">

              <div className="candidate-avatar">
                AR
              </div>

              <div className="candidate-info">

                <h3>
                  Ananya Roy
                </h3>

                <p>
                  B.Tech CSE · Techno India University
                </p>

                <div className="candidate-skills">

                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>Python</span>

                </div>

              </div>


              <div className="match-score">

                <strong>
                  94%
                </strong>

                <span>
                  Skill Match
                </span>

              </div>


              <div className="readiness-score">

                <strong>
                  91
                </strong>

                <span>
                  Readiness
                </span>

              </div>


              <button className="secondary-button">
                View
              </button>

              <button className="shortlist-button">
                Shortlist
              </button>

            </div>


            {/* Candidate 2 */}

            <div className="candidate-card">

              <div className="candidate-avatar">
                RK
              </div>

              <div className="candidate-info">

                <h3>
                  Rahul Kumar
                </h3>

                <p>
                  B.Tech CSE · Jadavpur University
                </p>

                <div className="candidate-skills">

                  <span>Java</span>
                  <span>Spring Boot</span>
                  <span>SQL</span>
                  <span>AWS</span>

                </div>

              </div>


              <div className="match-score">

                <strong>
                  89%
                </strong>

                <span>
                  Skill Match
                </span>

              </div>


              <div className="readiness-score">

                <strong>
                  86
                </strong>

                <span>
                  Readiness
                </span>

              </div>


              <button className="secondary-button">
                View
              </button>

              <button className="shortlist-button">
                Shortlist
              </button>

            </div>


            {/* Candidate 3 */}

            <div className="candidate-card">

              <div className="candidate-avatar">
                PS
              </div>

              <div className="candidate-info">

                <h3>
                  Priya Sharma
                </h3>

                <p>
                  B.Tech IT · Heritage Institute of Technology
                </p>

                <div className="candidate-skills">

                  <span>Python</span>
                  <span>Machine Learning</span>
                  <span>NLP</span>
                  <span>TensorFlow</span>

                </div>

              </div>


              <div className="match-score">

                <strong>
                  87%
                </strong>

                <span>
                  Skill Match
                </span>

              </div>


              <div className="readiness-score">

                <strong>
                  84
                </strong>

                <span>
                  Readiness
                </span>

              </div>


              <button className="secondary-button">
                View
              </button>

              <button className="shortlist-button">
                Shortlist
              </button>

            </div>


            {/* Candidate 4 */}

            <div className="candidate-card">

              <div className="candidate-avatar">
                SM
              </div>

              <div className="candidate-info">

                <h3>
                  MEHULI KHANRA
                </h3>

                <p>
                  B.Tech CSE · Narula Institute of Technology
                </p>

                <div className="candidate-skills">

                  <span>C++</span>
                  <span>DSA</span>
                  <span>React</span>
                  <span>Git</span>

                </div>

              </div>


              <div className="match-score">

                <strong>
                  85%
                </strong>

                <span>
                  Skill Match
                </span>

              </div>


              <div className="readiness-score">

                <strong>
                  82
                </strong>

                <span>
                  Readiness
                </span>

              </div>


              <button className="secondary-button">
                View
              </button>

              <button className="shortlist-button">
                Shortlist
              </button>

            </div>


          </div>

        </div>


        {/* AI Explanation */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              Why these candidates?
            </strong>

            <p>
              SkillBridge AI compares job requirements with
              student skills, projects, certifications, experience
              and readiness indicators to rank the most relevant
              candidates.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Candidates;