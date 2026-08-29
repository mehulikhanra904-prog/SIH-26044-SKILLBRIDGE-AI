import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function StudentProfile() {

  const savedUser = JSON.parse(
    localStorage.getItem("user")
  ) || {
    name: "",
    email: "",
    college: "",
    department: "",
    degree: "B.Tech",
    graduationYear: "2029"
  };

  const [profile, setProfile] = useState({
    name: savedUser.name || "",
    email: savedUser.email || "",
    college: savedUser.college || "",
    department: savedUser.department || "Computer Science & Engineering",
    degree: savedUser.degree || "B.Tech",
    graduationYear: savedUser.graduationYear || "2029",
    location: savedUser.location || "",
    phone: savedUser.phone || "",
    role: savedUser.role || "Full Stack Developer",
    domain: savedUser.domain || "Software Development & AI"
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSave = () => {

    localStorage.setItem(
      "user",
      JSON.stringify(profile)
    );

    setEditing(false);

    alert("Profile updated successfully!");
  };

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "ST";

  return (
    <div className="dashboard-layout">

      <Sidebar type="student" />

      <main className="main-content">

        <Navbar
          title="Student Profile"
          subtitle="Manage your personal information, skills and career profile."
        />


        {/* Profile Header */}

        <div className="student-profile-header card">

          <div className="student-profile-avatar">
            {initials}
          </div>

          <div className="student-profile-info">

            <h1>
              {profile.name || "Student Name"}
            </h1>

            <p>
              {profile.degree}{" "}
              {profile.department}
            </p>

            <span>
              {profile.college || "College not added"}
            </span>

          </div>

          <button
            className="primary-button"
            onClick={() => {
              if (editing) {
                handleSave();
              } else {
                setEditing(true);
              }
            }}
          >
            {editing ? "Save Profile" : "Edit Profile"}
          </button>

        </div>


        {/* Personal Information */}

        <div className="card profile-card">

          <div className="section-title">

            <div>

              <h2>
                Personal Information
              </h2>

              <p>
                Your personal contact information.
              </p>

            </div>

          </div>


          <div className="profile-grid">

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter your full name"
              />

            </div>


            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter your email"
              />

            </div>


            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter phone number"
              />

            </div>


            <div className="form-group">

              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                disabled={!editing}
                placeholder="City, State"
              />

            </div>

          </div>

        </div>


        {/* Academic Information */}

        <div className="card profile-card">

          <div className="section-title">

            <div>

              <h2>
                Academic Information
              </h2>

              <p>
                Your college and academic details.
              </p>

            </div>

          </div>


          <div className="profile-grid">

            <div className="form-group">

              <label>
                College
              </label>

              <input
                type="text"
                name="college"
                value={profile.college}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter your college"
              />

            </div>


            <div className="form-group">

              <label>
                Degree
              </label>

              <input
                type="text"
                name="degree"
                value={profile.degree}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>


            <div className="form-group">

              <label>
                Department
              </label>

              <input
                type="text"
                name="department"
                value={profile.department}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>


            <div className="form-group">

              <label>
                Graduation Year
              </label>

              <input
                type="text"
                name="graduationYear"
                value={profile.graduationYear}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>

          </div>

        </div>


        {/* Technical Skills */}

        <div className="card profile-card">

          <div className="section-title">

            <div>

              <h2>
                Technical Skills
              </h2>

              <p>
                Skills added to your SkillBridge profile.
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


        {/* Projects */}

        <div className="card profile-card">

          <div className="section-title">

            <div>

              <h2>
                Projects
              </h2>

              <p>
                Showcase your practical experience.
              </p>

            </div>

          </div>


          <div className="project-list">

            <div className="project-card">

              <h3>
                Add Your Project
              </h3>

              <p>
                Add projects that demonstrate your technical
                skills and practical experience.
              </p>

            </div>

          </div>

        </div>


        {/* Career Preferences */}

        <div className="card profile-card">

          <div className="section-title">

            <div>

              <h2>
                Career Preferences
              </h2>

              <p>
                Tell companies what opportunities you prefer.
              </p>

            </div>

          </div>


          <div className="profile-grid">

            <div className="form-group">

              <label>
                Preferred Role
              </label>

              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>


            <div className="form-group">

              <label>
                Preferred Domain
              </label>

              <input
                type="text"
                name="domain"
                value={profile.domain}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>

          </div>

        </div>


        {/* AI Analysis */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI Profile Analysis
            </strong>

            <p>
              SkillBridge AI will analyze each student's
              skills, projects, certifications and career
              preferences to calculate skill gaps, readiness
              and suitable job or internship recommendations.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default StudentProfile;