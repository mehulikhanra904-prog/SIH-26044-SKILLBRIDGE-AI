import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Students() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/colleges/students", { params: { search } });
      setStudents(data.students || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load students.");
      setStudents([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadStudents(); }, []);

  const getInitials = (name = "Student") => name.split(" ").map((word) => word[0]).join("").substring(0, 2).toUpperCase();
  const readiness = (student) => {
    const skills = student.skills?.length || 0;
    const profileFields = [student.department, student.degree, student.graduationYear, student.role].filter(Boolean).length;
    return Math.min(100, Math.round((skills / 5) * 70 + (profileFields / 4) * 30));
  };

  return (
    <div className="dashboard-layout">
      <Sidebar type="college" />
      <main className="main-content">
        <Navbar title="Student Management" subtitle="Manage and monitor students in your institution." />
        <div className="page-actions"><div><h1 className="page-heading">Student Management</h1><p className="page-subtitle">Search students and view their real academic, technical and career profiles.</p></div></div>
        <div className="card"><div className="dashboard-search">
          <input className="search-input" placeholder="Search by name, email, department or skill..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && loadStudents()} />
          <button className="primary-button" onClick={loadStudents} disabled={loading}>{loading ? "Loading..." : "Search"}</button>
          {search && <button className="secondary-button" onClick={() => { setSearch(""); setTimeout(loadStudents, 0); }}>Clear</button>}
        </div></div>
        {error && <p className="error-message">{error}</p>}
        <div className="card profile-card">
          <div className="section-title"><div><h2>Students</h2><p>{students.length} student{students.length !== 1 ? "s" : ""} found</p></div></div>
          <div className="student-list">
            {loading ? <div className="no-results"><h3>Loading students...</h3></div> : students.length ? students.map((student) => (
              <div className="student-card" key={student.id}>
                <div className="student-card-main"><div className="student-avatar">{getInitials(student.name)}</div><div className="student-card-info"><h3>{student.name}</h3><p>{student.email}</p><p>{student.department}</p><div className="skills-container">{student.skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div></div></div>
                <div className="student-card-right"><div className="student-readiness"><strong>{readiness(student)}%</strong><span>Readiness</span></div><button className="primary-button" onClick={() => setSelectedStudent(student)}>View Student</button></div>
              </div>
            )) : <div className="no-results"><h3>No Students Found</h3><p>No registered student profile matches this search.</p></div>}
          </div>
        </div>
        {selectedStudent && <div className="job-modal-overlay" onClick={() => setSelectedStudent(null)}><div className="job-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedStudent(null)}>×</button>
          <div className="job-modal-header"><div className="student-profile-avatar">{getInitials(selectedStudent.name)}</div><div><h2>{selectedStudent.name}</h2><p>{selectedStudent.email}</p></div></div>
          <div className="job-modal-section"><h3>Academic Information</h3><p><strong>Department:</strong> {selectedStudent.department}</p><p><strong>Course:</strong> {selectedStudent.degree}</p><p><strong>Graduation:</strong> {selectedStudent.graduationYear || "Not specified"}</p></div>
          <div className="job-modal-section"><h3>Technical Skills</h3><div className="skills-container">{selectedStudent.skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div></div>
          <div className="job-modal-section"><h3>Career Profile</h3><p><strong>Preferred Role:</strong> {selectedStudent.role}</p><p><strong>Location:</strong> {selectedStudent.location}</p><p><strong>Career Readiness:</strong> {readiness(selectedStudent)}%</p>{selectedStudent.resumeUrl && <p><a href={selectedStudent.resumeUrl} target="_blank" rel="noreferrer">View Resume</a></p>}</div>
          <div className="job-modal-actions"><button className="secondary-button" onClick={() => setSelectedStudent(null)}>Close</button></div>
        </div></div>}
      </main>
    </div>
  );
}

export default Students;
