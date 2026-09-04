import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Resume() {
  return (
    <div className="dashboard-layout">

      <Sidebar type="student" />

      <main className="main-content">

        <Navbar
          title="My Resume"
          subtitle="Create and manage your professional resume."
        />

        <div className="card">

          <div className="section-title">
            <h2>Resume Builder</h2>
            <span>Profile based</span>
          </div>

          <div className="resume-preview">

            <div className="resume-header">

              <h1>Mehuli Khanra</h1>

              <p>
                Aspiring Full Stack & AI Engineer
              </p>

              <div className="resume-contact">
                <span>📧 student@email.com</span>
                <span>📱 +91 XXXXX XXXXX</span>
                <span>📍 Kolkata, India</span>
              </div>

            </div>


            <div className="resume-section">

              <h3>About Me</h3>

              <p>
                Computer Science student interested in
                Full Stack Development, Artificial
                Intelligence and emerging technologies.
              </p>

            </div>


            <div className="resume-section">

              <h3>Education</h3>

              <div className="resume-item">

                <strong>
                  B.Tech in Computer Science & Engineering
                </strong>

                <span>
                  2025 – 2029
                </span>

                <p>
                  Narula Institute of Technology
                </p>

              </div>

            </div>


            <div className="resume-section">

              <h3>Skills</h3>

              <div className="resume-skills">

                <span>React.js</span>
                <span>JavaScript</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>Python</span>
                <span>Git & GitHub</span>

              </div>

            </div>


            <div className="resume-section">

              <h3>Projects</h3>

              <div className="resume-item">

                <strong>
                  SkillBridge AI
                </strong>

                <p>
                  AI-powered academia-industry skill
                  mapping, internship and placement
                  platform.
                </p>

              </div>

            </div>

          </div>


          <div className="form-actions">

            <button className="secondary-button">
              Edit Resume
            </button>

            <button className="primary-button">
              Download Resume
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Resume;