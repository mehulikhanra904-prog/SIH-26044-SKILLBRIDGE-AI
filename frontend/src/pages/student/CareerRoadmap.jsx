
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function CareerRoadmap() {
  const [showLearning, setShowLearning] = useState(false);

  const learningTopics = [
    {
      title: "Node.js Fundamentals",
      description:
        "Learn Node.js runtime, modules, npm, asynchronous programming and how Node.js works.",
    },
    {
      title: "Express.js",
      description:
        "Learn how to create servers, routes, middleware and REST APIs using Express.js.",
    },
    {
      title: "REST APIs",
      description:
        "Understand GET, POST, PUT and DELETE requests and connect your frontend with backend APIs.",
    },
    {
      title: "MongoDB Integration",
      description:
        "Learn how to connect Node.js applications with MongoDB and perform CRUD operations.",
    },
    {
      title: "Authentication",
      description:
        "Learn login systems, authentication, authorization and protected routes.",
    },
  ];

  const handleStartLearning = () => {
    setShowLearning(true);
  };

  const handleCloseLearning = () => {
    setShowLearning(false);
  };

  const handleStartTopic = (topic) => {
    alert(`Starting learning: ${topic.title}`);
  };

  return (
    <div className="dashboard-layout">

      <Sidebar type="student" />

      <main className="main-content">

        <Navbar
          title="Career Roadmap"
          subtitle="Your personalized path from current skills to career readiness."
        />

        {/* Target Career */}

        <div className="card">

          <div className="section-title">
            <h2>Your Career Goal</h2>
            <span>AI Personalized</span>
          </div>

          <div className="career-target">

            <div>

              <p className="small-label">
                Target Role
              </p>

              <h2>
                Full Stack Developer
              </h2>

              <p className="muted-text">
                Follow the roadmap below to strengthen your
                skills and become industry ready.
              </p>

            </div>

            <div className="readiness-mini">

              <strong>78%</strong>

              <span>
                Ready
              </span>

            </div>

          </div>

        </div>


        {/* Roadmap */}

        <div className="card">

          <div className="section-title">
            <h2>Learning Roadmap</h2>
            <span>5 Steps</span>
          </div>

          <div className="roadmap">

            {/* Step 1 */}

            <div className="roadmap-item completed">

              <div className="roadmap-number">
                ✓
              </div>

              <div className="roadmap-content">

                <div className="roadmap-header">

                  <div>
                    <h3>Frontend Fundamentals</h3>
                    <span>Completed</span>
                  </div>

                  <strong>100%</strong>

                </div>

                <p>
                  HTML, CSS, JavaScript and modern
                  frontend development fundamentals.
                </p>

                <div className="roadmap-tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                </div>

              </div>

            </div>


            {/* Step 2 */}

            <div className="roadmap-item completed">

              <div className="roadmap-number">
                ✓
              </div>

              <div className="roadmap-content">

                <div className="roadmap-header">

                  <div>
                    <h3>React Development</h3>
                    <span>Completed</span>
                  </div>

                  <strong>90%</strong>

                </div>

                <p>
                  Components, hooks, state management,
                  routing and API integration.
                </p>

                <div className="roadmap-tags">
                  <span>React</span>
                  <span>Hooks</span>
                  <span>REST API</span>
                </div>

              </div>

            </div>


            {/* Step 3 */}

            <div className="roadmap-item active">

              <div className="roadmap-number">
                3
              </div>

              <div className="roadmap-content">

                <div className="roadmap-header">

                  <div>
                    <h3>Backend Development</h3>
                    <span>In Progress</span>
                  </div>

                  <strong>72%</strong>

                </div>

                <p>
                  Improve Node.js, Express, REST APIs and
                  backend architecture.
                </p>

                <div className="roadmap-tags">
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>APIs</span>
                </div>

              </div>

            </div>


            {/* Step 4 */}

            <div className="roadmap-item">

              <div className="roadmap-number">
                4
              </div>

              <div className="roadmap-content">

                <div className="roadmap-header">

                  <div>
                    <h3>DevOps & Deployment</h3>
                    <span>Upcoming</span>
                  </div>

                  <strong>35%</strong>

                </div>

                <p>
                  Learn Docker, deployment, CI/CD and
                  production application management.
                </p>

                <div className="roadmap-tags">
                  <span>Docker</span>
                  <span>CI/CD</span>
                  <span>Cloud</span>
                </div>

              </div>

            </div>


            {/* Step 5 */}

            <div className="roadmap-item">

              <div className="roadmap-number">
                5
              </div>

              <div className="roadmap-content">

                <div className="roadmap-header">

                  <div>
                    <h3>Industry Ready Projects</h3>
                    <span>Upcoming</span>
                  </div>

                  <strong>20%</strong>

                </div>

                <p>
                  Build production-level projects and
                  strengthen your portfolio for placements.
                </p>

                <div className="roadmap-tags">
                  <span>Projects</span>
                  <span>GitHub</span>
                  <span>Portfolio</span>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Next Action */}

        <div className="card">

          <div className="section-title">
            <h2>Recommended Next Step</h2>
            <span>AI Suggestion</span>
          </div>

          <div className="next-action">

            <div className="next-action-icon">
              →
            </div>

            <div>

              <h3>
                Strengthen your Node.js skills
              </h3>

              <p className="muted-text">
                Your AI skill analysis shows that Node.js
                is one of the most important skills to
                improve for your target role.
              </p>

            </div>

            <button
              className="primary-button"
              onClick={handleStartLearning}
            >
              Start Learning
            </button>

          </div>

        </div>


        {/* Learning Panel */}

        {showLearning && (

          <div
            className="job-modal-overlay"
            onClick={handleCloseLearning}
          >

            <div
              className="job-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="modal-close"
                onClick={handleCloseLearning}
                aria-label="Close"
              >
                ×
              </button>

              <div className="job-modal-header">

                <div className="company-logo">
                  N
                </div>

                <div>

                  <h2>
                    Learn Node.js
                  </h2>

                  <p className="company-name">
                    Recommended for your Full Stack Developer roadmap
                  </p>

                </div>

              </div>


              <div className="job-modal-match">

                <strong>
                  Current Progress: 72%
                </strong>

                <p>
                  Continue learning Node.js to improve your
                  backend development skills and increase your
                  career readiness.
                </p>

              </div>


              <div className="job-modal-section">

                <h3>
                  Learning Topics
                </h3>

                <div className="learning-topic-list">

                  {learningTopics.map((topic, index) => (

                    <div
                      className="learning-topic"
                      key={index}
                    >

                      <div>

                        <h3>
                          {index + 1}. {topic.title}
                        </h3>

                        <p>
                          {topic.description}
                        </p>

                      </div>

                      <button
                        className="secondary-button"
                        onClick={() =>
                          handleStartTopic(topic)
                        }
                      >
                        Start
                      </button>

                    </div>

                  ))}

                </div>

              </div>


              <div className="job-modal-actions">

                <button
                  className="secondary-button"
                  onClick={handleCloseLearning}
                >
                  Close
                </button>

                <button
                  className="primary-button"
                  onClick={() => {
                    alert(
                      "Node.js learning plan started successfully!"
                    );
                    handleCloseLearning();
                  }}
                >
                  Continue Learning
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default CareerRoadmap;