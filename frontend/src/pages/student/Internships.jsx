import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const internships = [
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
    logo: "T",
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
    logo: "A",
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
    logo: "W",
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
    logo: "D",
  },
];

function Internships() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [domain, setDomain] = useState("All Domains");

  const [selectedInternship, setSelectedInternship] = useState(null);

  const [application, setApplication] = useState({
    phone: "",
    college: "",
    resume: "",
    coverLetter: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const filteredInternships = internships.filter((internship) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      internship.title.toLowerCase().includes(searchText) ||
      internship.company.toLowerCase().includes(searchText) ||
      internship.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      );

    const matchesLocation =
      location === "All Locations" ||
      internship.location === location;

    const matchesDomain =
      domain === "All Domains" ||
      internship.domain === domain;

    return matchesSearch && matchesLocation && matchesDomain;
  });

  const handleApply = (internship) => {
    setSelectedInternship(internship);
    setSubmitted(false);
  };

  const handleChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar type="student" />

      <main className="main-content">
        <Navbar
          title="Internships"
          subtitle="Find internships matched to your skills and career goals."
        />

        <div className="card">
          <div className="search-row">
            <input
              className="search-input"
              type="text"
              placeholder="Search internships, skills or companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              <option>All Domains</option>
              <option>Software Development</option>
              <option>AI / ML</option>
              <option>Data Science</option>
              <option>Web Development</option>
            </select>

            <button className="primary-button">
              Search
            </button>
          </div>
        </div>

        <div className="ai-info">
          <div className="ai-info-icon">✦</div>

          <div>
            <strong>AI-Powered Internship Recommendations</strong>

            <p>
              Internships are ranked according to your skills,
              interests, projects and career goal.
            </p>
          </div>
        </div>

        {filteredInternships.length === 0 ? (
          <div className="card">
            <h3>No internships found</h3>
            <p>Try changing your search or filters.</p>
          </div>
        ) : (
          filteredInternships.map((internship) => (
            <div className="job-card" key={internship.id}>
              <div className="job-main">
                <div className="company-logo">
                  {internship.logo}
                </div>

                <div className="job-details">
                  <h2>{internship.title}</h2>

                  <p className="company-name">
                    {internship.company}
                  </p>

                  <div className="job-meta">
                    <span>📍 {internship.location}</span>
                    <span>⏱ {internship.duration}</span>
                    <span>{internship.stipend}</span>
                  </div>

                  <div className="skill-list">
                    {internship.skills.map((skill) => (
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
                  {internship.match}%
                </div>

                <span>AI Match</span>

                <button
                  className="primary-button"
                  onClick={() => handleApply(internship)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}

        {/* APPLICATION FORM */}

        {selectedInternship && (
          <div className="card application-form-card">
            <div className="section-title">
              <div>
                <h2>Apply for Internship</h2>

                <p>
                  {selectedInternship.title} at{" "}
                  {selectedInternship.company}
                </p>
              </div>

              <button
                className="secondary-button"
                onClick={() => setSelectedInternship(null)}
              >
                Close
              </button>
            </div>

            {submitted ? (
              <div className="success-message">
                <h3>✅ Application Submitted!</h3>

                <p>
                  Your application for{" "}
                  <strong>
                    {selectedInternship.title}
                  </strong>{" "}
                  has been submitted successfully.
                </p>

                <button
                  className="primary-button"
                  onClick={() => {
                    setSelectedInternship(null);
                    setApplication({
                      phone: "",
                      college: "",
                      resume: "",
                      coverLetter: "",
                    });
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={application.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>College / University</label>

                  <input
                    type="text"
                    name="college"
                    placeholder="Enter your college"
                    value={application.college}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Resume</label>

                  <input
                    type="text"
                    name="resume"
                    placeholder="Paste your resume link"
                    value={application.resume}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Cover Letter</label>

                  <textarea
                    name="coverLetter"
                    placeholder="Tell the company why you are suitable for this internship..."
                    value={application.coverLetter}
                    onChange={handleChange}
                    rows="5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

export default Internships;