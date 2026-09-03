import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function StudentDashboard() {
  const savedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const studentName = savedUser.name || "Student";
  const studentEmail =
    savedUser.email || "student@example.com";
  const studentCollege =
    savedUser.college || "Your College";

  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const opportunities = [
    {
      id: 1,
      title: "Full Stack Developer Intern",
      company: "TechNova Solutions",
      skills: ["React", "Node.js", "MongoDB"],
      duration: "3–6 Months",
      salary: "₹20K/month",
      location: "Remote",
      type: "Internship",
      match: "92%",
      description:
        "Work with the development team to build modern web applications using React, Node.js and MongoDB. This internship provides hands-on experience with full-stack development and real-world projects.",
      requirements: [
        "Basic knowledge of React",
        "Understanding of Node.js",
        "Knowledge of MongoDB",
        "Git and GitHub basics",
      ],
    },

    {
      id: 2,
      title: "AI/ML Intern",
      company: "AI Innovations Labs",
      skills: ["Python", "Machine Learning", "NLP"],
      duration: "6 Months",
      salary: "₹25K/month",
      location: "Bangalore",
      type: "Internship",
      match: "84%",
      description:
        "Join an AI/ML team working on practical machine learning and natural language processing projects. You will work with Python and modern AI technologies.",
      requirements: [
        "Python programming",
        "Basic machine learning knowledge",
        "Understanding of NLP concepts",
        "Problem-solving skills",
      ],
    },

    {
      id: 3,
      title: "Software Developer Intern",
      company: "DigitalWorks",
      skills: ["C++", "DSA", "JavaScript"],
      duration: "4 Months",
      salary: "₹18K/month",
      location: "Kolkata",
      type: "Internship",
      match: "81%",
      description:
        "Work with software engineers on application development and problem-solving tasks. This role focuses on DSA, C++ and JavaScript development.",
      requirements: [
        "Strong C++ fundamentals",
        "Data Structures and Algorithms",
        "JavaScript basics",
        "Good problem-solving ability",
      ],
    },
  ];

  const filteredOpportunities = opportunities.filter(
    (job) => {
      const searchText = search
        .toLowerCase()
        .trim();

      if (!searchText) {
        return true;
      }

      return (
        job.title
          .toLowerCase()
          .includes(searchText) ||
        job.company
          .toLowerCase()
          .includes(searchText) ||
        job.location
          .toLowerCase()
          .includes(searchText) ||
        job.type
          .toLowerCase()
          .includes(searchText) ||
        job.skills.some((skill) =>
          skill
            .toLowerCase()
            .includes(searchText)
        )
      );
    }
  );

  const handleSearch = () => {
    setSearch(search.trim());
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  // ==============================
  // APPLY FOR JOB
  // ==============================

  const handleApply = () => {
    if (!selectedJob) {
      return;
    }

    const existingApplications =
      JSON.parse(
        localStorage.getItem("applications")
      ) || [];

    const alreadyApplied =
      existingApplications.some(
        (application) =>
          application.jobId === selectedJob.id
      );

    if (alreadyApplied) {
      alert(
        "You have already applied for this job."
      );
      return;
    }

    const newApplication = {
      id: Date.now(),

      jobId: selectedJob.id,

      title: selectedJob.title,

      company: selectedJob.company,

      location: selectedJob.location,

      type: selectedJob.type,

      salary: selectedJob.salary,

      status: "Applied",

      appliedAt:
        new Date().toLocaleDateString(),

      studentName: studentName,

      studentEmail: studentEmail,
    };

    localStorage.setItem(
      "applications",
      JSON.stringify([
        ...existingApplications,
        newApplication,
      ])
    );

    alert(
      `Application submitted successfully for ${selectedJob.title}!`
    );

    setSelectedJob(null);
  };

  return (
    <div className="dashboard-layout">

      <Sidebar type="student" />

      <main className="main-content">

        <Navbar
          title="Student Dashboard"
          subtitle="Your academic, skill and career overview."
        />

        {/* Welcome */}

        <div className="page-actions">

          <div>

            <h1 className="page-heading">
              Welcome back, {studentName}!
            </h1>

            <p className="page-subtitle">
              Track your skills, readiness and
              career opportunities.
            </p>

          </div>

        </div>

        {/* Student Information */}

        <div className="card student-welcome-card animate-fade-up">

          <div className="student-welcome-content">

            <div className="student-avatar">

              {studentName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}

            </div>

            <div>

              <h2>
                {studentName}
              </h2>

              <p>
                {studentEmail}
              </p>

              <p>
                {studentCollege}
              </p>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card animate-stagger" style={{ animationDelay: "0.1s" }}>
            <span className="stat-label">
              Skill Readiness
            </span>

            <div className="stat-value">
              78%
            </div>

            <p className="stat-description">
              Overall career readiness
            </p>
          </div>

          <div className="stat-card animate-stagger" style={{ animationDelay: "0.2s" }}>
            <span className="stat-label">
              Skills
            </span>

            <div className="stat-value">
              9
            </div>

            <p className="stat-description">
              Skills in your profile
            </p>
          </div>

          <div className="stat-card animate-stagger" style={{ animationDelay: "0.3s" }}>
            <span className="stat-label">
              Applications
            </span>

            <div className="stat-value">
              12
            </div>

            <p className="stat-description">
              Jobs and internships
            </p>
          </div>

          <div className="stat-card animate-stagger" style={{ animationDelay: "0.4s" }}>
            <span className="stat-label">
              AI Matches
            </span>

            <div className="stat-value">
              24
            </div>

            <p className="stat-description">
              Recommended opportunities
            </p>
          </div>

        </div>

        {/* Skill Readiness */}

        <div className="card profile-card animate-fade-up">

          <div className="section-title">

            <div>

              <h2>
                Skill Readiness
              </h2>

              <p>
                Your current readiness based on
                skills, projects and career
                requirements.
              </p>

            </div>

          </div>

          <div className="readiness-container">

            <div className="readiness-score-large">
              78
            </div>

            <div className="readiness-info">

              <h3>
                Good Progress
              </h3>

              <p>
                You are building a strong technical
                foundation. Improve your missing
                skills to increase your internship
                and placement opportunities.
              </p>

            </div>

          </div>

        </div>

        {/* Skills */}

        <div className="card profile-card animate-fade-up">

          <div className="section-title">

            <div>

              <h2>
                Your Skills
              </h2>

              <p>
                Technical skills currently present
                in your profile.
              </p>

            </div>

          </div>

          <div className="skills-container">

            <span className="skill-tag">C</span>
            <span className="skill-tag">C++</span>
            <span className="skill-tag">Python</span>
            <span className="skill-tag">HTML</span>
            <span className="skill-tag">CSS</span>
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">React</span>
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">Git</span>

          </div>

        </div>

        {/* Skill Gaps */}

        <div className="card profile-card animate-fade-up">

          <div className="section-title">

            <div>

              <h2>
                Recommended Skill Improvements
              </h2>

              <p>
                Skills that can improve your
                placement readiness.
              </p>

            </div>

          </div>

          <div className="skill-gap-list">

            <div className="skill-gap-item">

              <div>

                <h3>
                  Data Structures & Algorithms
                </h3>

                <p>
                  Important for software development
                  placements.
                </p>

              </div>

              <span className="skill-gap-badge">
                High Priority
              </span>

            </div>

            <div className="skill-gap-item">

              <div>

                <h3>
                  SQL
                </h3>

                <p>
                  Frequently required for software
                  and data roles.
                </p>

              </div>

              <span className="skill-gap-badge">
                Medium Priority
              </span>

            </div>

            <div className="skill-gap-item">

              <div>

                <h3>
                  Cloud & AWS
                </h3>

                <p>
                  Recommended for modern full-stack
                  roles.
                </p>

              </div>

              <span className="skill-gap-badge">
                Medium Priority
              </span>

            </div>

          </div>

        </div>

        {/* Recommended Opportunities */}

        <div className="card profile-card animate-fade-up">

          <div className="section-title">

            <div>

              <h2>
                Recommended Opportunities
              </h2>

              <p>
                Opportunities matched to your
                current skills.
              </p>

            </div>

          </div>

          {/* SEARCH ONLY */}

          <div className="dashboard-search">

            <input
              className="search-input"
              type="text"
              placeholder="Search jobs, skills or companies..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button
              className="primary-button"
              onClick={handleSearch}
            >
              Search
            </button>

            {search && (
              <button
                className="secondary-button"
                onClick={handleClearSearch}
              >
                Clear
              </button>
            )}

          </div>

          {/* Search Result */}

          {search && (

            <p className="search-result-text">

              Showing{" "}
              {filteredOpportunities.length}{" "}
              result
              {filteredOpportunities.length !== 1
                ? "s"
                : ""}{" "}
              for{" "}
              <strong>
                "{search}"
              </strong>

            </p>

          )}

          {/* Opportunities */}

          <div className="opportunity-list">

            {filteredOpportunities.length > 0 ? (

              filteredOpportunities.map(
                (job) => (

                  <div
                    className="opportunity-card"
                    key={job.id}
                  >

                    <div>

                      <h3>
                        {job.title}
                      </h3>

                      <p>
                        {job.company}
                      </p>

                      <p>
                        {job.skills.join(" · ")}
                      </p>

                      <small>
                        {job.duration} ·{" "}
                        {job.salary} ·{" "}
                        {job.location}
                      </small>

                    </div>

                    <div className="opportunity-actions">

                      <div className="opportunity-match">
                        {job.match} Match
                      </div>

                      <button
                        className="primary-button"
                        onClick={() =>
                          setSelectedJob(job)
                        }
                      >
                        View Job
                      </button>

                    </div>

                  </div>

                )
              )

            ) : (

              <div className="no-results">

                <h3>
                  No opportunities found
                </h3>

                <p>
                  Try searching for React,
                  Python, Node.js, AI/ML or
                  another skill.
                </p>

                <button
                  className="secondary-button"
                  onClick={handleClearSearch}
                >
                  Clear Search
                </button>

              </div>

            )}

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              SkillBridge AI Recommendation
            </strong>

            <p>
              Based on your current skills and
              profile, SkillBridge AI recommends
              improving DSA, SQL and cloud skills
              to increase your placement readiness
              and unlock more industry opportunities.
            </p>

          </div>

        </div>

        {/* JOB DETAILS MODAL */}

        {selectedJob && (

          <div
            className="job-modal-overlay"
            onClick={() =>
              setSelectedJob(null)
            }
          >

            <div
              className="job-modal animate-modal-in"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedJob(null)
                }
                aria-label="Close"
              >
                ×
              </button>

              {/* Header */}

              <div className="job-modal-header">

                <div className="company-logo">

                  {selectedJob.company
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <div>

                  <h2>
                    {selectedJob.title}
                  </h2>

                  <p className="company-name">
                    {selectedJob.company}
                  </p>

                </div>

              </div>

              {/* Meta */}

              <div className="job-modal-meta">

                <span>
                  📍 {selectedJob.location}
                </span>

                <span>
                  💼 {selectedJob.type}
                </span>

                <span>
                  💰 {selectedJob.salary}
                </span>

              </div>

              {/* Match */}

              <div className="job-modal-match">

                <strong>
                  {selectedJob.match} AI Match
                </strong>

                <p>
                  This opportunity is highly
                  compatible with your current
                  profile and skills.
                </p>

              </div>

              {/* Description */}

              <div className="job-modal-section">

                <h3>
                  About the Role
                </h3>

                <p>
                  {selectedJob.description}
                </p>

              </div>

              {/* Skills */}

              <div className="job-modal-section">

                <h3>
                  Required Skills
                </h3>

                <div className="skills-container">

                  {selectedJob.skills.map(
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

              </div>

              {/* Requirements */}

              <div className="job-modal-section">

                <h3>
                  Requirements
                </h3>

                <ul className="job-requirements">

                  {selectedJob.requirements.map(
                    (requirement, index) => (

                      <li key={index}>
                        {requirement}
                      </li>

                    )
                  )}

                </ul>

              </div>

              {/* ACTIONS */}

              <div className="job-modal-actions">

                <button
                  className="secondary-button"
                  onClick={() =>
                    setSelectedJob(null)
                  }
                >
                  Close
                </button>

                <button
                  className="primary-button"
                  onClick={handleApply}
                >
                  Apply Now
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default StudentDashboard;