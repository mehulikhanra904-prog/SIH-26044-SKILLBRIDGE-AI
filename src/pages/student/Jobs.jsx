import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Jobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [type, setType] = useState("All Types");
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      logo: "T",
      title: "Full Stack Developer Intern",
      company: "TechNova Solutions",
      location: "Remote",
      type: "Internship",
      salary: "₹20,000/month",
      match: "91%",
      skills: ["React", "Node.js", "MongoDB", "Git"],
      description:
        "Work with our development team to build modern web applications using React, Node.js and MongoDB."
    },
    {
      id: 2,
      logo: "I",
      title: "Software Engineer Intern",
      company: "Innovate Labs",
      location: "Bangalore",
      type: "Internship",
      salary: "₹25,000/month",
      match: "86%",
      skills: ["JavaScript", "React", "SQL", "Git"],
      description:
        "Join our engineering team and work on real-world software products while gaining hands-on development experience."
    },
    {
      id: 3,
      logo: "D",
      title: "Junior Backend Developer",
      company: "DigitalWorks",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹6–8 LPA",
      match: "78%",
      skills: ["Node.js", "Express", "MongoDB", "Docker"],
      description:
        "Develop and maintain scalable backend services using Node.js, Express and MongoDB."
    },
    {
      id: 4,
      logo: "A",
      title: "React Developer",
      company: "Alpha Technologies",
      location: "Kolkata",
      type: "Full Time",
      salary: "₹5–7 LPA",
      match: "83%",
      skills: ["React", "JavaScript", "CSS", "REST API"],
      description:
        "Build responsive and interactive frontend applications using React and modern JavaScript."
    }
  ];

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText) ||
      job.location.toLowerCase().includes(searchText) ||
      job.type.toLowerCase().includes(searchText) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      );

    const matchesLocation =
      location === "All Locations" || job.location === location;

    const matchesType =
      type === "All Types" || job.type === type;

    return matchesSearch && matchesLocation && matchesType;
  });

  const handleSearch = () => {
    // Filtering happens automatically through filteredJobs.
    // This function simply allows the Search button to work.
    setSearch(search.trim());
  };

  return (
    <div className="dashboard-layout">

      <Sidebar type="student" />

      <main className="main-content">

        <Navbar
          title="Recommended Jobs"
          subtitle="Discover jobs matched to your skills and career goals."
        />

        {/* Search */}

        <div className="card">

          <div className="search-row">

            <input
              className="search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search jobs, skills or companies..."
            />

            <select
              className="filter-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>All Locations</option>
              <option>Remote</option>
              <option>Kolkata</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Delhi</option>
            </select>

            <select
              className="filter-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>All Types</option>
              <option>Full Time</option>
              <option>Internship</option>
              <option>Part Time</option>
            </select>

            <button
              className="primary-button"
              onClick={handleSearch}
            >
              Search
            </button>

          </div>

        </div>


        {/* AI Match Information */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI-Powered Job Matching
            </strong>

            <p>
              Jobs are ranked according to your skills,
              projects, experience and preferred career role.
            </p>

          </div>

        </div>


        {/* Job Results */}

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (

            <div className="job-card" key={job.id}>

              <div className="job-main">

                <div className="company-logo">
                  {job.logo}
                </div>

                <div className="job-details">

                  <h2>
                    {job.title}
                  </h2>

                  <p className="company-name">
                    {job.company}
                  </p>

                  <div className="job-meta">

                    <span>
                      📍 {job.location}
                    </span>

                    <span>
                      💼 {job.type}
                    </span>

                    <span>
                      {job.salary}
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


              <div className="job-match">

                <div className="match-circle">
                  {job.match}
                </div>

                <span>
                  AI Match
                </span>

                <button
                  className="primary-button"
                  onClick={() => setSelectedJob(job)}
                >
                  View Job
                </button>

              </div>

            </div>

          ))
        ) : (

          <div className="card">
            <h2>No Jobs Found</h2>
            <p>
              Try changing your search or filters.
            </p>
          </div>

        )}


        {/* Job Details Modal */}

        {selectedJob && (

          <div
            className="job-modal-overlay"
            onClick={() => setSelectedJob(null)}
          >

            <div
              className="job-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="modal-close"
                onClick={() => setSelectedJob(null)}
              >
                ×
              </button>

              <div className="company-logo">
                {selectedJob.logo}
              </div>

              <h2>
                {selectedJob.title}
              </h2>

              <p className="company-name">
                {selectedJob.company}
              </p>

              <div className="job-meta">

                <span>
                  📍 {selectedJob.location}
                </span>

                <span>
                  💼 {selectedJob.type}
                </span>

                <span>
                  {selectedJob.salary}
                </span>

              </div>

              <h3>
                About the Job
              </h3>

              <p>
                {selectedJob.description}
              </p>

              <h3>
                Required Skills
              </h3>

              <div className="skill-list">

                {selectedJob.skills.map((skill) => (
                  <span
                    className="skill-tag"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}

              </div>

              <div className="job-apply-section">

                <div className="match-circle">
                  {selectedJob.match}
                </div>

                <span>
                  AI Match
                </span>

                <button className="primary-button">
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

export default Jobs;