import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const applicationsData = [
  {
    id: 1,
    title: "Full Stack Development Intern",
    company: "TechNova Solutions",
    location: "Remote",
    duration: "6 Months",
    stipend: "₹20,000/month",
    domain: "Web Development",
    skills: ["React", "Node.js", "MongoDB", "Git"],
    match: 94,
    appliedOn: "29 Aug 2026",
    status: "Under Review",
    logo: "T",
    phone: "+91 9876543210",
    college: "Narula Institute of Technology",
    resume: "Resume.pdf",
    coverLetter:
      "I am interested in this internship because I want to strengthen my full-stack development skills and work on real-world projects.",
  },
  {
    id: 2,
    title: "AI / Machine Learning Intern",
    company: "AIverse Technologies",
    location: "Bangalore",
    duration: "4 Months",
    stipend: "₹25,000/month",
    domain: "AI / ML",
    skills: ["Python", "Machine Learning", "Pandas", "SQL"],
    match: 81,
    appliedOn: "27 Aug 2026",
    status: "Applied",
    logo: "A",
    phone: "+91 9876543210",
    college: "Narula Institute of Technology",
    resume: "Resume.pdf",
    coverLetter:
      "I am passionate about artificial intelligence and machine learning and would like to gain practical industry experience.",
  },
  {
    id: 3,
    title: "Frontend Developer Intern",
    company: "WebCraft Labs",
    location: "Kolkata",
    duration: "3 Months",
    stipend: "₹15,000/month",
    domain: "Web Development",
    skills: ["React", "JavaScript", "CSS", "REST API"],
    match: 89,
    appliedOn: "24 Aug 2026",
    status: "Shortlisted",
    logo: "W",
    phone: "+91 9876543210",
    college: "Narula Institute of Technology",
    resume: "Resume.pdf",
    coverLetter:
      "I enjoy building responsive and user-friendly web applications and would love to contribute to your development team.",
  },
  {
    id: 4,
    title: "Data Science Intern",
    company: "DataMind Analytics",
    location: "Hyderabad",
    duration: "6 Months",
    stipend: "₹22,000/month",
    domain: "Data Science",
    skills: ["Python", "SQL", "Pandas", "Statistics"],
    match: 76,
    appliedOn: "20 Aug 2026",
    status: "Rejected",
    logo: "D",
    phone: "+91 9876543210",
    college: "Narula Institute of Technology",
    resume: "Resume.pdf",
    coverLetter:
      "I am interested in data science and would like to develop my analytical and problem-solving skills through practical experience.",
  },
];

function Applications() {
  const [applications, setApplications] =
    useState(applicationsData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const filteredApplications = applications.filter(
    (application) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        application.title
          .toLowerCase()
          .includes(searchText) ||
        application.company
          .toLowerCase()
          .includes(searchText) ||
        application.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesStatus =
        statusFilter === "All Status" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Shortlisted":
        return "status success";

      case "Under Review":
        return "status warning";

      case "Rejected":
        return "status danger";

      case "Selected":
        return "status success";

      default:
        return "status";
    }
  };

  const handleWithdraw = (id) => {
    const confirmWithdraw = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (!confirmWithdraw) {
      return;
    }

    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== id
      )
    );

    setSelectedApplication(null);
  };

  return (
    <div className="dashboard-layout">

      <Sidebar type="student" />

      <main className="main-content">

        <Navbar
          title="My Applications"
          subtitle="Track your internship applications and application status."
        />

        {/* ============================= */}
        {/* PAGE HEADER */}
        {/* ============================= */}

        <div className="page-actions">

          <div>
            <h2 className="page-heading">
              Internship Applications
            </h2>

            <p className="page-subtitle">
              Keep track of the internships you have applied for.
            </p>
          </div>

        </div>


        {/* ============================= */}
        {/* STATISTICS */}
        {/* ============================= */}

        <div className="stats-grid">

          <div className="stat-card">

            <span className="stat-label">
              Total Applications
            </span>

            <div className="stat-value">
              {applications.length}
            </div>

            <p className="stat-description">
              Internships applied
            </p>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Under Review
            </span>

            <div className="stat-value">
              {
                applications.filter(
                  (application) =>
                    application.status === "Under Review"
                ).length
              }
            </div>

            <p className="stat-description">
              Being reviewed
            </p>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Shortlisted
            </span>

            <div className="stat-value">
              {
                applications.filter(
                  (application) =>
                    application.status === "Shortlisted"
                ).length
              }
            </div>

            <p className="stat-description">
              Shortlisted applications
            </p>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Selected
            </span>

            <div className="stat-value">
              {
                applications.filter(
                  (application) =>
                    application.status === "Selected"
                ).length
              }
            </div>

            <p className="stat-description">
              Internship offers
            </p>

          </div>

        </div>


        {/* ============================= */}
        {/* SEARCH + FILTER */}
        {/* ============================= */}

        <div className="card">

          <div className="search-row">

            <input
              className="search-input"
              type="text"
              placeholder="Search applications, companies or skills..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option>All Status</option>
              <option>Applied</option>
              <option>Under Review</option>
              <option>Shortlisted</option>
              <option>Selected</option>
              <option>Rejected</option>
            </select>

          </div>

        </div>


        {/* ============================= */}
        {/* AI INFORMATION */}
        {/* ============================= */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI Application Insights
            </strong>

            <p>
              Your applications are matched against
              internship requirements using your skills,
              projects, career interests and profile.
            </p>

          </div>

        </div>


        {/* ============================= */}
        {/* APPLICATION LIST */}
        {/* ============================= */}

        {filteredApplications.length === 0 ? (

          <div className="card">

            <h3>
              No applications found
            </h3>

            <p>
              Try changing your search or status filter.
            </p>

          </div>

        ) : (

          filteredApplications.map(
            (application) => (

              <div
                className="job-card"
                key={application.id}
              >

                {/* LEFT SIDE */}

                <div className="job-main">

                  <div className="company-logo">
                    {application.logo}
                  </div>


                  <div className="job-details">

                    <h2>
                      {application.title}
                    </h2>

                    <p className="company-name">
                      {application.company}
                    </p>


                    <div className="job-meta">

                      <span>
                        📍 {application.location}
                      </span>

                      <span>
                        ⏱ {application.duration}
                      </span>

                      <span>
                        {application.stipend}
                      </span>

                    </div>


                    <div className="skill-list">

                      {application.skills.map(
                        (skill) => (

                          <span
                            className="skill-tag"
                            key={skill}
                          >
                            {skill}
                          </span>

                        )
                      )}

                    </div>


                    <p
                      style={{
                        marginTop: "14px",
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      Applied on:{" "}
                      <strong>
                        {application.appliedOn}
                      </strong>
                    </p>

                  </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="job-match">

                  <div className="match-circle">
                    {application.match}%
                  </div>

                  <span>
                    AI Match
                  </span>


                  <span
                    className={getStatusClass(
                      application.status
                    )}
                  >
                    {application.status}
                  </span>


                  <button
                    className="secondary-button"
                    onClick={() =>
                      setSelectedApplication(
                        application
                      )
                    }
                  >
                    View Details
                  </button>

                </div>

              </div>

            )
          )

        )}


        {/* ============================= */}
        {/* APPLICATION DETAILS */}
        {/* ============================= */}

        {selectedApplication && (

          <div className="card application-form-card">

            <div className="section-title">

              <div>

                <h2>
                  Application Details
                </h2>

                <p>
                  {selectedApplication.title} at{" "}
                  {selectedApplication.company}
                </p>

              </div>


              <button
                className="secondary-button"
                onClick={() =>
                  setSelectedApplication(null)
                }
              >
                Close
              </button>

            </div>


            {/* STATUS */}

            <div
              style={{
                marginBottom: "24px",
              }}
            >

              <span
                className={getStatusClass(
                  selectedApplication.status
                )}
              >
                {selectedApplication.status}
              </span>

            </div>


            {/* INTERNSHIP DETAILS */}

            <div className="form-grid">

              <div className="form-group">

                <label>
                  Internship
                </label>

                <input
                  value={
                    selectedApplication.title
                  }
                  readOnly
                />

              </div>


              <div className="form-group">

                <label>
                  Company
                </label>

                <input
                  value={
                    selectedApplication.company
                  }
                  readOnly
                />

              </div>


              <div className="form-group">

                <label>
                  Location
                </label>

                <input
                  value={
                    selectedApplication.location
                  }
                  readOnly
                />

              </div>


              <div className="form-group">

                <label>
                  Applied On
                </label>

                <input
                  value={
                    selectedApplication.appliedOn
                  }
                  readOnly
                />

              </div>


              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  value={
                    selectedApplication.phone
                  }
                  readOnly
                />

              </div>


              <div className="form-group">

                <label>
                  College / University
                </label>

                <input
                  value={
                    selectedApplication.college
                  }
                  readOnly
                />

              </div>


              <div className="form-group">

                <label>
                  Resume
                </label>

                <input
                  value={
                    selectedApplication.resume
                  }
                  readOnly
                />

              </div>


              <div className="form-group">

                <label>
                  AI Match Score
                </label>

                <input
                  value={`${selectedApplication.match}%`}
                  readOnly
                />

              </div>


              <div className="form-group full-width">

                <label>
                  Cover Letter
                </label>

                <textarea
                  value={
                    selectedApplication.coverLetter
                  }
                  readOnly
                  rows="5"
                />

              </div>

            </div>


            {/* ACTIONS */}

            <div className="form-actions">

              <button
                className="secondary-button"
                onClick={() =>
                  handleWithdraw(
                    selectedApplication.id
                  )
                }
              >
                Withdraw Application
              </button>

              <button
                className="primary-button"
                onClick={() =>
                  setSelectedApplication(null)
                }
              >
                Done
              </button>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default Applications;