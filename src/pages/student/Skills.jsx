import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Skills() {

  // Get logged-in student
  const savedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  // Get previously saved skills
  const savedSkills =
    JSON.parse(localStorage.getItem("skills")) || [
      {
        name: "React.js",
        level: "Advanced",
        percentage: 90
      },
      {
        name: "JavaScript",
        level: "Advanced",
        percentage: 85
      },
      {
        name: "Node.js",
        level: "Intermediate",
        percentage: 72
      },
      {
        name: "MongoDB",
        level: "Intermediate",
        percentage: 68
      },
      {
        name: "Python",
        level: "Intermediate",
        percentage: 65
      },
      {
        name: "Git & GitHub",
        level: "Intermediate",
        percentage: 75
      }
    ];


  const [skills, setSkills] = useState(savedSkills);

  const [skillName, setSkillName] = useState("");

  const [skillLevel, setSkillLevel] =
    useState("Beginner");


  // Convert level to percentage
  const getPercentage = (level) => {

    if (level === "Beginner") {
      return 40;
    }

    if (level === "Intermediate") {
      return 70;
    }

    if (level === "Advanced") {
      return 90;
    }

    return 50;
  };


  // Add new skill
  const handleAddSkill = () => {

    if (!skillName.trim()) {
      alert("Please enter a skill name.");
      return;
    }


    const newSkill = {

      name: skillName.trim(),

      level: skillLevel,

      percentage: getPercentage(skillLevel)

    };


    const updatedSkills = [
      ...skills,
      newSkill
    ];


    setSkills(updatedSkills);


    localStorage.setItem(
      "skills",
      JSON.stringify(updatedSkills)
    );


    // Clear input
    setSkillName("");

    setSkillLevel("Beginner");

  };


  // Delete skill
  const handleDeleteSkill = (index) => {

    const updatedSkills =
      skills.filter(
        (_, skillIndex) =>
          skillIndex !== index
      );


    setSkills(updatedSkills);


    localStorage.setItem(
      "skills",
      JSON.stringify(updatedSkills)
    );

  };


  return (

    <div className="dashboard-layout">


      {/* Sidebar */}

      <Sidebar type="student" />


      {/* Main Content */}

      <main className="main-content">


        <Navbar
          title="My Skills"
          subtitle="Add and manage your technical and professional skills."
        />


        {/* Student Information */}

        <div className="card">

          <div className="section-title">

            <div>

              <h2>
                {savedUser.name
                  ? `${savedUser.name}'s Skills`
                  : "My Skills"}
              </h2>

              <p>
                These skills are associated with your
                SkillBridge AI profile.
              </p>

            </div>

            <span>
              {skills.length} Skills
            </span>

          </div>


          {/* Skills */}

          <div className="skills-container">

            {skills.length === 0 ? (

              <div className="empty-state">

                <h3>
                  No skills added yet
                </h3>

                <p>
                  Add your first skill below.
                </p>

              </div>

            ) : (

              skills.map((skill, index) => (

                <div
                  className="skill-item"
                  key={index}
                >

                  <div>

                    <strong>
                      {skill.name}
                    </strong>

                    <p>
                      {skill.level}
                    </p>

                  </div>


                  <div className="skill-level">

                    {skill.percentage}%

                  </div>


                  <button
                    type="button"
                    className="delete-button"
                    onClick={() =>
                      handleDeleteSkill(index)
                    }
                  >
                    Remove
                  </button>

                </div>

              ))

            )}

          </div>

        </div>


        {/* Add Skill */}

        <div className="card">

          <div className="section-title">

            <div>

              <h2>
                Add New Skill
              </h2>

              <p>
                Add skills that you have learned or practiced.
              </p>

            </div>

          </div>


          <div className="form-grid">


            {/* Skill Name */}

            <div className="form-group">

              <label>
                Skill Name
              </label>

              <input
                className="form-input"
                type="text"
                placeholder="e.g. Java, React, Python"
                value={skillName}
                onChange={(e) =>
                  setSkillName(e.target.value)
                }
              />

            </div>


            {/* Skill Level */}

            <div className="form-group">

              <label>
                Skill Level
              </label>

              <select
                className="form-select"
                value={skillLevel}
                onChange={(e) =>
                  setSkillLevel(e.target.value)
                }
              >

                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>

              </select>

            </div>

          </div>


          <div className="form-actions">

            <button
              type="button"
              className="primary-button"
              onClick={handleAddSkill}
            >
              + Add Skill
            </button>

          </div>

        </div>


        {/* AI Skill Analysis */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI Skill Analysis
            </strong>

            <p>
              SkillBridge AI can compare your current
              skills with industry requirements and
              identify the skills you need to improve
              for your preferred job roles.
            </p>

          </div>

        </div>


      </main>

    </div>

  );
}


export default Skills;