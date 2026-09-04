import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const applications = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Full Stack Developer",
    skills: "React · Node.js · MongoDB · Git",
    match: 94,
    status: "Shortlisted",
    avatar: "A",
  },
  {
    id: 2,
    name: "Priya Das",
    role: "AI / ML Engineer",
    skills: "Python · Machine Learning · TensorFlow",
    match: 91,
    status: "Interview",
    avatar: "P",
  },
  {
    id: 3,
    name: "Sneha Roy",
    role: "Web Developer Intern",
    skills: "HTML · CSS · JavaScript · React",
    match: 87,
    status: "Applied",
    avatar: "S",
  },
  {
    id: 4,
    name: "Rahul Sen",
    role: "Full Stack Developer",
    skills: "React · Node.js · Express · MongoDB",
    match: 85,
    status: "Shortlisted",
    avatar: "R",
  },
  {
    id: 5,
    name: "Ananya Gupta",
    role: "Data Analyst",
    skills: "Python · SQL · Power BI · Excel",
    match: 82,
    status: "Applied",
    avatar: "A",
  },
];

function CompanyApplications() {
  return (
    <div className="dashboard-layout">

      <Sidebar type="company" />

      <main className="main-content">

        <Navbar
          title="Applications"
          subtitle="Review candidates and manage your hiring pipeline."
        />

        {/* Header */}

        <div className="page-actions">

          <div>
            <h2 className="page-heading">
              Candidate Applications
            </h2>

            <p className="page-subtitle">
              Review applications received for your job postings.
            </p>
          </div>

        </div>


        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-card-header">

              <span className="stat-label">
                Total Applications
              </span>

              <div className="stat-icon">
                A
              </div>

            </div>

            <div className="stat-value">
              486
            </div>

            <p className="stat-description">
              Applications received
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">

              <span className="stat-label">
                Shortlisted
              </span>

              <div className="stat-icon">
                ✓
              </div>

            </div>

            <div className="stat-value">
              128
            </div>

            <p className="stat-description">
              Candidates shortlisted
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">

              <span className="stat-label">
                Interviews
              </span>

              <div className="stat-icon">
                I
              </div>

            </div>

            <div className="stat-value">
              64
            </div>

            <p className="stat-description">
              Candidates interviewed
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-card-header">

              <span className="stat-label">
                Selected
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


        {/* Filters */}

        <div className="card">

          <div className="job-filter-row">

            <input
              className="search-input"
              type="text"
              placeholder="Search candidates, skills or jobs..."
            />

            <select className="filter-select">

              <option>
                All Jobs
              </option>

              <option>
                Full Stack Developer
              </option>

              <option>
                AI / ML Engineer
              </option>

              <option>
                Web Developer Intern
              </option>

              <option>
                Data Analyst
              </option>

            </select>

            <select className="filter-select">

              <option>
                All Status
              </option>

              <option>
                Applied
              </option>

              <option>
                Shortlisted
              </option>

              <option>
                Interview
              </option>

              <option>
                Selected
              </option>

            </select>

          </div>

        </div>


        {/* Applications */}

        <div className="card">

          <div className="section-title">

            <h2>
              Recent Applications
            </h2>

            <span>
              486 Applications
            </span>

          </div>


          <div className="candidate-list">

            {applications.map((application) => (

              <div
                className="candidate-item"
                key={application.id}
              >

                <div className="student-avatar">
                  {application.avatar}
                </div>


                <div className="candidate-info">

                  <strong>
                    {application.name}
                  </strong>

                  <p>
                    {application.role}
                  </p>

                  <small>
                    {application.skills}
                  </small>

                </div>


                <div className="job-meta">

                  <strong>
                    {application.match}%
                  </strong>

                  <span>
                    AI Match
                  </span>

                </div>


                <span className="job-status">
                  {application.status}
                </span>


                <div className="job-actions">

                  <button className="secondary-button">
                    View
                  </button>

                  <button className="primary-button">
                    Review
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* AI Insight */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI Candidate Insight
            </strong>

            <p>
              SkillBridge AI has identified several highly
              matched candidates based on their skills,
              projects, experience and job requirements.
              Candidates with an 85%+ match should be
              prioritized for review.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CompanyApplications;