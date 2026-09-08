import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Students() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      department: "Computer Science & Engineering",
      degree: "B.Tech",
      year: "3rd Year",
      graduationYear: "2027",
      skills: ["C++", "DSA", "React", "Node.js"],
      readiness: 86,
      role: "Full Stack Developer",
      location: "Kolkata",
    },
    {
      id: 2,
      name: "Priya Das",
      email: "priya.das@gmail.com",
      department: "Computer Science & Engineering",
      degree: "B.Tech",
      year: "3rd Year",
      graduationYear: "2027",
      skills: ["Python", "Machine Learning", "SQL"],
      readiness: 91,
      role: "AI/ML Engineer",
      location: "Kolkata",
    },
    {
      id: 3,
      name: "Arjun Roy",
      email: "arjun.roy@gmail.com",
      department: "Information Technology",
      degree: "B.Tech",
      year: "2nd Year",
      graduationYear: "2028",
      skills: ["JavaScript", "React", "Git"],
      readiness: 78,
      role: "Frontend Developer",
      location: "Howrah",
    },
    {
      id: 4,
      name: "Sneha Mukherjee",
      email: "sneha.m@gmail.com",
      department: "Electronics & Communication",
      degree: "B.Tech",
      year: "3rd Year",
      graduationYear: "2027",
      skills: ["Python", "IoT", "C++"],
      readiness: 82,
      role: "Software Engineer",
      location: "Kolkata",
    },
  ];

  const filteredStudents = students.filter((student) => {
    const text = search.toLowerCase().trim();

    if (!text) return true;

    return (
      student.name.toLowerCase().includes(text) ||
      student.email.toLowerCase().includes(text) ||
      student.department.toLowerCase().includes(text) ||
      student.degree.toLowerCase().includes(text) ||
      student.role.toLowerCase().includes(text) ||
      student.location.toLowerCase().includes(text) ||
      student.skills.some((skill) =>
        skill.toLowerCase().includes(text)
      )
    );
  });

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  return (
    <div className="dashboard-layout">

      <Sidebar type="college" />

      <main className="main-content">

        <Navbar
          title="Student Management"
          subtitle="Manage and monitor students in your institution."
        />

        <div className="page-actions">
          <div>
            <h1 className="page-heading">
              Student Management
            </h1>

            <p className="page-subtitle">
              Search students and view their academic,
              technical and career profiles.
            </p>
          </div>
        </div>

        {/* SEARCH */}

        <div className="card">

          <div className="dashboard-search">

            <input
              className="search-input"
              type="text"
              placeholder="Search by name, email, department or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(search.trim());
                }
              }}
            />

            <button
              className="primary-button"
              onClick={() => setSearch(search.trim())}
            >
              Search
            </button>

            {search && (
              <button
                className="secondary-button"
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            )}

          </div>

        </div>

        {/* STUDENT LIST */}

        <div className="card profile-card">

          <div className="section-title">

            <div>
              <h2>
                Students
              </h2>

              <p>
                {filteredStudents.length} student
                {filteredStudents.length !== 1 ? "s" : ""} found
              </p>
            </div>

          </div>

          <div className="student-list">

            {filteredStudents.length > 0 ? (

              filteredStudents.map((student) => (

                <div
                  className="student-card"
                  key={student.id}
                >

                  <div className="student-card-main">

                    <div className="student-avatar">
                      {getInitials(student.name)}
                    </div>

                    <div className="student-card-info">

                      <h3>
                        {student.name}
                      </h3>

                      <p>
                        {student.email}
                      </p>

                      <p>
                        {student.department}
                      </p>

                      <div className="skills-container">

                        {student.skills.map((skill) => (
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

                  <div className="student-card-right">

                    <div className="student-readiness">
                      <strong>
                        {student.readiness}%
                      </strong>

                      <span>
                        Readiness
                      </span>
                    </div>

                    <button
                      className="primary-button"
                      onClick={() =>
                        setSelectedStudent(student)
                      }
                    >
                      View Student
                    </button>

                  </div>

                </div>

              ))

            ) : (

              <div className="no-results">

                <h3>
                  No Students Found
                </h3>

                <p>
                  Try searching using another name,
                  department or skill.
                </p>

                <button
                  className="secondary-button"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </button>

              </div>

            )}

          </div>

        </div>

        {/* STUDENT DETAILS */}

        {selectedStudent && (

          <div
            className="job-modal-overlay"
            onClick={() => setSelectedStudent(null)}
          >

            <div
              className="job-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="modal-close"
                onClick={() => setSelectedStudent(null)}
              >
                ×
              </button>

              <div className="job-modal-header">

                <div className="student-profile-avatar">
                  {getInitials(selectedStudent.name)}
                </div>

                <div>

                  <h2>
                    {selectedStudent.name}
                  </h2>

                  <p>
                    {selectedStudent.email}
                  </p>

                </div>

              </div>

              <div className="job-modal-section">

                <h3>
                  Academic Information
                </h3>

                <p>
                  <strong>Department:</strong>{" "}
                  {selectedStudent.department}
                </p>

                <p>
                  <strong>Degree:</strong>{" "}
                  {selectedStudent.degree}
                </p>

                <p>
                  <strong>Year:</strong>{" "}
                  {selectedStudent.year}
                </p>

                <p>
                  <strong>Graduation:</strong>{" "}
                  {selectedStudent.graduationYear}
                </p>

              </div>

              <div className="job-modal-section">

                <h3>
                  Technical Skills
                </h3>

                <div className="skills-container">

                  {selectedStudent.skills.map((skill) => (
                    <span
                      className="skill-tag"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </div>

              <div className="job-modal-section">

                <h3>
                  Career Profile
                </h3>

                <p>
                  <strong>Preferred Role:</strong>{" "}
                  {selectedStudent.role}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {selectedStudent.location}
                </p>

                <p>
                  <strong>Career Readiness:</strong>{" "}
                  {selectedStudent.readiness}%
                </p>

              </div>

              <div className="job-modal-actions">

                <button
                  className="secondary-button"
                  onClick={() => setSelectedStudent(null)}
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default Students;