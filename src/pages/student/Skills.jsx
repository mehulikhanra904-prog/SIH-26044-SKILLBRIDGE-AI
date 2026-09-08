import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const levels = { Beginner: 40, Intermediate: 70, Advanced: 90 };

function Skills() {
  const [profile, setProfile] = useState(null);
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/students/profile")
      .then(({ data }) => setProfile(data.student))
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load skills."));
  }, []);

  const updateSkills = async (skills) => {
    try {
      const { data } = await api.put("/students/profile", { skills });
      setProfile(data.student);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save skills.");
    }
  };

  const addSkill = () => {
    const name = skillName.trim();
    const skills = profile.profile?.skills || [];
    if (!name || skills.some((skill) => skill.toLowerCase() === name.toLowerCase())) return;
    updateSkills([...skills, name]);
    setSkillName("");
  };

  const removeSkill = (skill) => updateSkills((profile.profile?.skills || []).filter((item) => item !== skill));

  if (!profile) return <main className="main-content">{error || "Loading skills..."}</main>;
  return (
    <div className="dashboard-layout">
      <Sidebar type="student" />
      <main className="main-content">
        <Navbar title="My Skills" subtitle="Skills are saved to your SkillBridge profile." />
        {error && <p className="error-message">{error}</p>}
        <div className="card profile-card">
          <div className="section-title"><div><h2>{profile.name}&apos;s Skills</h2><p>{(profile.profile?.skills || []).length} skills saved</p></div></div>
          <div className="skills-container">
            {(profile.profile?.skills || []).length ? (profile.profile?.skills || []).map((skill) => (
              <div className="skill-item" key={skill}><strong>{skill}</strong><button className="delete-button" onClick={() => removeSkill(skill)}>Remove</button></div>
            )) : <p>No skills added yet.</p>}
          </div>
        </div>
        <div className="card">
          <div className="form-grid">
            <div className="form-group"><label>Skill name</label><input value={skillName} onChange={(event) => setSkillName(event.target.value)} /></div>
            <div className="form-group"><label>Level</label><select value={skillLevel} onChange={(event) => setSkillLevel(event.target.value)}>{Object.keys(levels).map((level) => <option key={level}>{level}</option>)}</select></div>
          </div>
          <button className="primary-button" onClick={addSkill}>+ Add Skill</button>
        </div>
      </main>
    </div>
  );
}

export default Skills;
