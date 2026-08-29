import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const jobs = [
  {
    id: "1",
    title: "Full Stack Developer",
    skills: ["React", "Node.js", "MongoDB", "Git"],
    location: "Kolkata",
    type: "Full Time",
    salary: "₹6–10 LPA",
    applications: 124,
    status: "Active",
    description:
      "We are looking for a talented Full Stack Developer to build and maintain modern web applications.",
    requirements: [
      "Strong knowledge of React.js",
      "Experience with Node.js and Express",
      "Knowledge of MongoDB",
      "Understanding of REST APIs",
      "Good knowledge of Git and GitHub",
    ],
  },
  {
    id: "2",
    title: "AI / ML Engineer",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    location: "Remote",
    type: "Full Time",
    salary: "₹8–14 LPA",
    applications: 87,
    status: "Active",
    description:
      "Join our AI team and work on machine learning solutions and intelligent applications.",
    requirements: [
      "Strong Python programming skills",
      "Machine Learning fundamentals",
      "Experience with TensorFlow",
      "Knowledge of data processing",
      "Understanding of AI concepts",
    ],
  },
  {
    id: "3",
    title: "Web Developer Intern",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    location: "Kolkata",
    type: "Internship",
    salary: "₹20K/month",
    applications: 156,
    status: "Active",
    description:
      "We are looking for a Web Developer Intern to help build responsive and user-friendly websites.",
    requirements: [
      "HTML and CSS knowledge",
      "JavaScript fundamentals",
      "Basic React knowledge",
      "Responsive web design",
      "Git and GitHub basics",
    ],
  },
  {
    id: "4",
    title: "Data Analyst",
    skills: ["Python", "SQL", "Power BI", "Excel"],
    location: "Bengaluru",
    type: "Full Time",
    salary: "₹5–8 LPA",
    applications: 64,
    status: "Active",
    description:
      "Work with our analytics team to transform business data into useful insights.",
    requirements: [
      "Strong SQL knowledge",
      "Python for data analysis",
      "Experience with Excel",
      "Knowledge of Power BI",
      "Basic statistical knowledge",
    ],
  },
  {
    id: "5",
    title: "Cybersecurity Analyst",
    skills: ["Network Security", "Linux", "SIEM"],
    location: "Hyderabad",
    type: "Full Time",
    salary: "₹7–12 LPA",
    applications: 55,
    status: "Active",
    description:
      "Help protect company systems and applications by monitoring threats and improving security.",
    requirements: [
      "Knowledge of network security",
      "Linux fundamentals",
      "Understanding of SIEM tools",
      "Security monitoring experience",
      "Basic cybersecurity concepts",
    ],
  },
];

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showApplications, setShowApplications] = useState(false);

  const job = jobs.find((item) => item.id === id);

  if (!job) {
    return (
      <div className="dashboard-layout">
        <Sidebar type="company" />

        <main className="main-content">
          <Navbar
            title="Job Details"
            subtitle="View and manage your job posting."
          />

          <div className="card">
            <h2>Job Not Found</h2>

            <p className="muted-text">
              The job you are looking for does not exist.
            </p>

            <button
              className="primary-button"
              onClick={() => navigate("/company/jobs")}
            >
              Back to My Jobs
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar type="company" />

      <main className="main-content">

        <Navbar
          title="Job Details"
          subtitle="View your job posting and manage candidates."
        />

        {/* Back Button */}

        <div className="page-actions">

          <div>
            <h2 className="page-heading">
              {job.title}
            </h2>

            <p className="page-subtitle">
              Manage this job posting and review applications.
            </p>
          </div>

          <button
            className="secondary-button"
            onClick={() => navigate("/company/jobs")}
          >
            ← Back to Jobs
          </button>

        </div>

        {/* Job Header */}

        <div className="card">

          <div className="job-details-header">

            <div className="job-icon large-job-icon">
              {job.title
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")}
            </div>

            <div className="job-header-info">

              <h1>{job.title}</h1>

              <p>
                Your Company
              </p>

              <div className="job-meta">

                <span>📍 {job.location}</span>

                <span>💼 {job.type}</span>

                <span>💰 {job.salary}</span>

              </div>

            </div>

            <span className="job-status">
              {job.status}
            </span>

          </div>

        </div>

        {/* Statistics */}

        <div className="stats-grid">

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
              {job.applications}
            </div>

            <p className="stat-description">
              Candidates applied
            </p>

          </div>

          <div className="stat-card">

            <div className="stat-card-header">
              <span className="stat-label">
                Status
              </span>

              <div className="stat-icon">
                ✓
              </div>
            </div>

            <div className="stat-value">
              Active
            </div>

            <p className="stat-description">
              Accepting applications
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
              32
            </div>

            <p className="stat-description">
              Strong candidate matches
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
              0
            </div>

            <p className="stat-description">
              Candidates selected
            </p>

          </div>

        </div>

        {/* Description + Requirements */}

        <div className="dashboard-grid">

          <div className="card">

            <div className="section-title">
              <h2>Job Description</h2>

              <span>
                Overview
              </span>
            </div>

            <p className="muted-text">
              {job.description}
            </p>

          </div>

          <div className="card">

            <div className="section-title">
              <h2>Required Skills</h2>

              <span>
                {job.skills.length} Skills
              </span>
            </div>

            <div className="skill-list">

              {job.skills.map((skill) => (
                <span
                  className="skill-tag"
                  key={skill}
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

        </div>

        {/* Requirements */}

        <div className="card">

          <div className="section-title">

            <h2>
              Requirements
            </h2>

            <span>
              Candidate Criteria
            </span>

          </div>

          <div className="recommendation-list">

            {job.requirements.map((requirement, index) => (
              <div
                className="recommendation-item"
                key={requirement}
              >

                <div className="recommendation-number">
                  {index + 1}
                </div>

                <div>
                  <strong>
                    {requirement}
                  </strong>
                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Actions */}

        <div className="card">

          <div className="section-title">

            <div>
              <h2>
                Manage Applications
              </h2>

              <p className="muted-text">
                Review candidates who applied for this position.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setShowApplications(!showApplications)}
            >
              {showApplications
                ? "Hide Applications"
                : "View Applications"}
            </button>

          </div>

          {showApplications && (
            <div className="candidate-list">

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

                <button className="secondary-button">
                  View
                </button>

              </div>

              <div className="candidate-item">

                <div className="student-avatar">
                  P
                </div>

                <div className="candidate-info">

                  <strong>
                    Priya Das
                  </strong>

                  <p>
                    Full Stack Developer
                  </p>

                </div>

                <span className="match-score">
                  91% Match
                </span>

                <button className="secondary-button">
                  View
                </button>

              </div>

              <div className="candidate-item">

                <div className="student-avatar">
                  S
                </div>

                <div className="candidate-info">

                  <strong>
                    Sneha Roy
                  </strong>

                  <p>
                    Full Stack Developer
                  </p>

                </div>

                <span className="match-score">
                  87% Match
                </span>

                <button className="secondary-button">
                  View
                </button>

              </div>

            </div>
          )}

        </div>

        {/* AI Insight */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI Hiring Insight
            </strong>

            <p>
              This position currently has{" "}
              <strong>
                {job.applications} applications
              </strong>
              . AI matching has identified strong
              candidates based on their skills,
              projects and experience.
            </p>

          </div>

        </div>

      </main>
    </div>
  );
}

export default JobDetails;