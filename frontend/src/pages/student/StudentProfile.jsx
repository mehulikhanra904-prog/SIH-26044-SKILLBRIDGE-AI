import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const emptyProfile = {
  name: "", email: "", phone: "", location: "", collegeName: "", course: "",
  department: "", graduationYear: "", preferredRole: "", preferredDomain: "", skills: [],
};

function StudentProfile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await api.get("/students/profile");
        const { profile: studentProfile, ...user } = data.student;
        setProfile({ ...emptyProfile, ...user, ...studentProfile });
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setError("");
      const { data } = await api.put("/students/profile", profile);
      const { profile: studentProfile, ...user } = data.student;
      setProfile({ ...emptyProfile, ...user, ...studentProfile });
      localStorage.setItem("user", JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }));
      setEditing(false);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save your profile.");
    }
  };

  const initials = profile.name
    ? profile.name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase()
    : "ST";

  if (loading) return <div className="dashboard-layout"><main className="main-content">Loading profile...</main></div>;

  return (
    <div className="dashboard-layout">
      <Sidebar type="student" />
      <main className="main-content">
        <Navbar title="Student Profile" subtitle="Manage your personal information, skills and career profile." />
        {error && <p className="error-message">{error}</p>}
        <div className="student-profile-header card">
          <div className="student-profile-avatar">{initials}</div>
          <div className="student-profile-info">
            <h1>{profile.name || "Student Name"}</h1>
            <p>{[profile.course, profile.department].filter(Boolean).join(" · ") || "Academic details not added"}</p>
            <span>{profile.collegeName || "College not added"}</span>
          </div>
          <button className="primary-button" onClick={() => (editing ? handleSave() : setEditing(true))}>
            {editing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>

        <ProfileSection title="Personal Information" subtitle="Your personal contact information.">
          <ProfileInput label="Full Name" name="name" value={profile.name} onChange={handleChange} editing={editing} />
          <ProfileInput label="Email" name="email" type="email" value={profile.email} onChange={handleChange} editing={editing} />
          <ProfileInput label="Phone Number" name="phone" value={profile.phone} onChange={handleChange} editing={editing} />
          <ProfileInput label="Location" name="location" value={profile.location} onChange={handleChange} editing={editing} />
        </ProfileSection>

        <ProfileSection title="Academic Information" subtitle="Your college and academic details.">
          <ProfileInput label="College" name="collegeName" value={profile.collegeName} onChange={handleChange} editing={editing} />
          <ProfileInput label="Degree" name="course" value={profile.course} onChange={handleChange} editing={editing} />
          <ProfileInput label="Department" name="department" value={profile.department} onChange={handleChange} editing={editing} />
          <ProfileInput label="Graduation Year" name="graduationYear" type="number" value={profile.graduationYear} onChange={handleChange} editing={editing} />
        </ProfileSection>

        <div className="card profile-card">
          <div className="section-title"><div><h2>Technical Skills</h2><p>Skills stored in your SkillBridge profile.</p></div></div>
          <div className="skills-container">
            {profile.skills.length ? profile.skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>) : <p>No skills added yet.</p>}
          </div>
        </div>

        <ProfileSection title="Career Preferences" subtitle="Tell companies what opportunities you prefer.">
          <ProfileInput label="Preferred Role" name="preferredRole" value={profile.preferredRole} onChange={handleChange} editing={editing} />
          <ProfileInput label="Preferred Domain" name="preferredDomain" value={profile.preferredDomain} onChange={handleChange} editing={editing} />
        </ProfileSection>
      </main>
    </div>
  );
}

function ProfileSection({ title, subtitle, children }) {
  return <div className="card profile-card"><div className="section-title"><div><h2>{title}</h2><p>{subtitle}</p></div></div><div className="profile-grid">{children}</div></div>;
}

function ProfileInput({ label, name, type = "text", value, onChange, editing }) {
  return <div className="form-group"><label>{label}</label><input type={type} name={name} value={value ?? ""} onChange={onChange} disabled={!editing} /></div>;
}

export default StudentProfile;
