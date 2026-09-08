import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const emptyResume = {
  name: "", email: "", phone: "", location: "", collegeName: "", course: "",
  department: "", graduationYear: "", skills: [], resumeHeadline: "",
  resumeSummary: "", projects: [],
};

function Resume() {
  const [resume, setResume] = useState(emptyResume);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/students/profile")
      .then(({ data }) => {
        const { profile, ...user } = data.student;
        setResume({ ...emptyResume, ...user, ...(profile || {}), projects: profile?.projects || [] });
      })
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load your resume."));
  }, []);

  const change = ({ target }) => setResume((current) => ({ ...current, [target.name]: target.value }));
  const changeProject = (index, field, value) => setResume((current) => ({
    ...current,
    projects: current.projects.map((project, projectIndex) => projectIndex === index ? { ...project, [field]: value } : project),
  }));

  const save = async () => {
    try {
      setSaving(true);
      setError("");
      const { data } = await api.put("/students/profile", resume);
      const { profile, ...user } = data.student;
      setResume({ ...emptyResume, ...user, ...(profile || {}), projects: profile?.projects || [] });
      setEditing(false);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save your resume.");
    } finally {
      setSaving(false);
    }
  };

  const addProject = () => setResume((current) => ({ ...current, projects: [...current.projects, { name: "", description: "" }] }));
  const removeProject = (index) => setResume((current) => ({ ...current, projects: current.projects.filter((_, projectIndex) => projectIndex !== index) }));

  if (!resume.name && !error) return <main className="main-content">Loading resume...</main>;

  return <div className="dashboard-layout"><Sidebar type="student" /><main className="main-content">
    <Navbar title="My Resume" subtitle="Edit your resume and save it to your SkillBridge profile." />
    {error && <p className="error-message">{error}</p>}
    <div className="card profile-card">
      <div className="section-title"><div><h2>Resume Builder</h2><p>Your saved resume information</p></div><button type="button" className="primary-button" disabled={saving} onClick={() => (editing ? save() : setEditing(true))}>{saving ? "Saving..." : editing ? "Save Resume" : "Edit Resume"}</button></div>
      <div className="profile-grid">
        <ResumeInput label="Full name" name="name" value={resume.name} onChange={change} editing={editing} />
        <ResumeInput label="Email" name="email" value={resume.email} onChange={change} editing={editing} />
        <ResumeInput label="Phone" name="phone" value={resume.phone} onChange={change} editing={editing} />
        <ResumeInput label="Location" name="location" value={resume.location} onChange={change} editing={editing} />
        <ResumeInput label="Headline" name="resumeHeadline" value={resume.resumeHeadline} onChange={change} editing={editing} />
        <ResumeInput label="Course" name="course" value={resume.course} onChange={change} editing={editing} />
        <ResumeInput label="College" name="collegeName" value={resume.collegeName} onChange={change} editing={editing} />
        <ResumeInput label="Graduation year" name="graduationYear" value={resume.graduationYear} onChange={change} editing={editing} />
      </div>
      <div className="form-group"><label htmlFor="resume-summary">About me</label><textarea id="resume-summary" name="resumeSummary" value={resume.resumeSummary || ""} onChange={change} readOnly={!editing} rows="5" /></div>
      <div className="resume-section"><div className="section-title"><h3>Skills</h3></div><div className="resume-skills">{resume.skills.length ? resume.skills.map((skill) => <span key={skill}>{skill}</span>) : <span>No skills added</span>}</div></div>
      <div className="resume-section"><div className="section-title"><h3>Projects</h3>{editing && <button type="button" className="secondary-button" onClick={addProject}>Add Project</button>}</div>
        {resume.projects.map((project, index) => <div className="resume-item" key={`${project.name}-${index}`}><input value={project.name} placeholder="Project name" onChange={(event) => changeProject(index, "name", event.target.value)} readOnly={!editing} /><textarea value={project.description} placeholder="Project description" onChange={(event) => changeProject(index, "description", event.target.value)} readOnly={!editing} rows="3" />{editing && <button type="button" className="delete-button" onClick={() => removeProject(index)}>Remove</button>}</div>)}
        {!resume.projects.length && <p>No projects added yet.</p>}
      </div>
    </div>
  </main></div>;
}

function ResumeInput({ label, name, value, onChange, editing }) {
  return <div className="form-group"><label htmlFor={`resume-${name}`}>{label}</label><input id={`resume-${name}`} name={name} value={value || ""} onChange={onChange} readOnly={!editing} /></div>;
}

export default Resume;
