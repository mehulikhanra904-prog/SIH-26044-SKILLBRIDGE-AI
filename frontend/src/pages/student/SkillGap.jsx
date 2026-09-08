import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const careerData = {
  "Full Stack Developer": {
    score: 78,
    message: "Good Progress",
    description:
      "You already have several skills required for your target role. Focus on the missing skills below to improve your job readiness.",

    skills: [
      {
        name: "React.js",
        required: "Advanced",
        progress: 90,
        status: "Strong",
        className: "strong",
      },
      {
        name: "Node.js",
        required: "Advanced",
        progress: 72,
        status: "Improve",
        className: "improve",
      },
      {
        name: "Docker",
        required: "Intermediate",
        progress: 35,
        status: "Skill Gap",
        className: "missing",
      },
      {
        name: "REST APIs",
        required: "Intermediate",
        progress: 60,
        status: "Improve",
        className: "improve",
      },
      {
        name: "Git & GitHub",
        required: "Intermediate",
        progress: 75,
        status: "Strong",
        className: "strong",
      },
    ],

    recommendations: [
      {
        title: "Learn Docker & Containerization",
        description:
          "Docker is currently your biggest skill gap for the Full Stack Developer role.",
      },
      {
        title: "Improve Node.js",
        description:
          "Build REST APIs and backend projects to move from intermediate to advanced.",
      },
      {
        title: "Build a Production-Level Project",
        description:
          "A real-world project can strengthen both your resume and practical skills.",
      },
    ],
  },

  "AI / ML Engineer": {
    score: 71,
    message: "Good Progress",
    description:
      "You have a strong foundation, but improving machine learning and AI engineering skills will increase your readiness.",

    skills: [
      {
        name: "Python",
        required: "Advanced",
        progress: 88,
        status: "Strong",
        className: "strong",
      },
      {
        name: "Machine Learning",
        required: "Advanced",
        progress: 65,
        status: "Improve",
        className: "improve",
      },
      {
        name: "Deep Learning",
        required: "Intermediate",
        progress: 48,
        status: "Skill Gap",
        className: "missing",
      },
      {
        name: "NLP / GenAI",
        required: "Intermediate",
        progress: 60,
        status: "Improve",
        className: "improve",
      },
      {
        name: "SQL",
        required: "Intermediate",
        progress: 80,
        status: "Strong",
        className: "strong",
      },
    ],

    recommendations: [
      {
        title: "Learn Deep Learning",
        description:
          "Strengthen your understanding of neural networks, CNNs and modern deep learning techniques.",
      },
      {
        title: "Build an AI Project",
        description:
          "Create an end-to-end AI project using Python and a machine learning framework.",
      },
      {
        title: "Improve Generative AI Skills",
        description:
          "Learn LLMs, embeddings, prompting and retrieval-augmented generation.",
      },
    ],
  },

  "Data Scientist": {
    score: 69,
    message: "Needs Improvement",
    description:
      "Your foundation is developing well. Focus on statistics, machine learning and data visualization.",

    skills: [
      {
        name: "Python",
        required: "Advanced",
        progress: 85,
        status: "Strong",
        className: "strong",
      },
      {
        name: "SQL",
        required: "Advanced",
        progress: 70,
        status: "Improve",
        className: "improve",
      },
      {
        name: "Statistics",
        required: "Advanced",
        progress: 48,
        status: "Skill Gap",
        className: "missing",
      },
      {
        name: "Pandas",
        required: "Intermediate",
        progress: 75,
        status: "Strong",
        className: "strong",
      },
      {
        name: "Machine Learning",
        required: "Intermediate",
        progress: 58,
        status: "Improve",
        className: "improve",
      },
    ],

    recommendations: [
      {
        title: "Strengthen Statistics",
        description:
          "Focus on probability, distributions, hypothesis testing and statistical analysis.",
      },
      {
        title: "Improve Machine Learning",
        description:
          "Practice supervised and unsupervised learning through real datasets.",
      },
      {
        title: "Build a Data Science Portfolio",
        description:
          "Create projects demonstrating data cleaning, visualization and predictive modeling.",
      },
    ],
  },

  "Frontend Developer": {
    score: 84,
    message: "Excellent Progress",
    description:
      "You already have a strong frontend foundation. Focus on advanced React patterns and performance.",

    skills: [
      {
        name: "React.js",
        required: "Advanced",
        progress: 92,
        status: "Strong",
        className: "strong",
      },
      {
        name: "JavaScript",
        required: "Advanced",
        progress: 86,
        status: "Strong",
        className: "strong",
      },
      {
        name: "CSS",
        required: "Advanced",
        progress: 82,
        status: "Strong",
        className: "strong",
      },
      {
        name: "REST APIs",
        required: "Intermediate",
        progress: 65,
        status: "Improve",
        className: "improve",
      },
      {
        name: "Testing",
        required: "Intermediate",
        progress: 40,
        status: "Skill Gap",
        className: "missing",
      },
    ],

    recommendations: [
      {
        title: "Learn Frontend Testing",
        description:
          "Learn unit and component testing to improve production-level frontend development.",
      },
      {
        title: "Improve API Integration",
        description:
          "Practice authentication, API handling and error management in React applications.",
      },
      {
        title: "Build a Production-Level UI",
        description:
          "Create a responsive project with reusable components and strong accessibility.",
      },
    ],
  },

  "Backend Developer": {
    score: 73,
    message: "Good Progress",
    description:
      "Your backend foundation is developing well. Focus on APIs, databases and deployment.",

    skills: [
      {
        name: "Node.js",
        required: "Advanced",
        progress: 72,
        status: "Improve",
        className: "improve",
      },
      {
        name: "REST APIs",
        required: "Advanced",
        progress: 65,
        status: "Improve",
        className: "improve",
      },
      {
        name: "MongoDB",
        required: "Intermediate",
        progress: 80,
        status: "Strong",
        className: "strong",
      },
      {
        name: "Docker",
        required: "Intermediate",
        progress: 35,
        status: "Skill Gap",
        className: "missing",
      },
      {
        name: "Authentication",
        required: "Intermediate",
        progress: 55,
        status: "Improve",
        className: "improve",
      },
    ],

    recommendations: [
      {
        title: "Learn Docker",
        description:
          "Containerization is an important skill for deploying modern backend applications.",
      },
      {
        title: "Improve REST API Design",
        description:
          "Practice authentication, validation, error handling and scalable API architecture.",
      },
      {
        title: "Build a Production Backend",
        description:
          "Create a backend project with database integration, authentication and deployment.",
      },
    ],
  },

  "Cybersecurity Engineer": {
    score: 64,
    message: "Needs Improvement",
    description:
      "You have a foundation to build on, but networking, Linux and security tools need more attention.",

    skills: [
      {
        name: "Linux",
        required: "Intermediate",
        progress: 70,
        status: "Improve",
        className: "improve",
      },
      {
        name: "Networking",
        required: "Advanced",
        progress: 55,
        status: "Improve",
        className: "improve",
      },
      {
        name: "SIEM",
        required: "Intermediate",
        progress: 30,
        status: "Skill Gap",
        className: "missing",
      },
      {
        name: "Python",
        required: "Intermediate",
        progress: 75,
        status: "Strong",
        className: "strong",
      },
      {
        name: "Web Security",
        required: "Intermediate",
        progress: 50,
        status: "Skill Gap",
        className: "missing",
      },
    ],

    recommendations: [
      {
        title: "Learn SIEM Tools",
        description:
          "Practice security monitoring and incident detection using modern SIEM platforms.",
      },
      {
        title: "Strengthen Networking",
        description:
          "Learn TCP/IP, DNS, HTTP, firewalls and network security fundamentals.",
      },
      {
        title: "Practice Web Security",
        description:
          "Learn common web vulnerabilities and secure application development practices.",
      },
    ],
  },
};

function SkillGap() {
  const [career, setCareer] = useState("Full Stack Developer");
  const [analysis, setAnalysis] = useState(careerData["Full Stack Developer"]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);

    setTimeout(() => {
      setAnalysis(careerData[career]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="dashboard-layout">

      <Sidebar type="student" />

      <main className="main-content">

        <Navbar
          title="AI Skill Gap Analysis"
          subtitle="Discover which skills you need to improve for your target career."
        />

        {/* =========================
            CAREER TARGET
        ========================= */}

        <div className="card">

          <div className="section-title">
            <h2>Target Career</h2>
            <span>AI Analysis</span>
          </div>

          <div className="career-target">

            <div>

              <p className="small-label">
                Selected Role
              </p>

              <select
                className="filter-select career-select"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
              >

                {Object.keys(careerData).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}

              </select>

              <p className="muted-text">
                Select your target career and let AI compare
                your current skills with industry requirements.
              </p>

            </div>

            <button
              className="primary-button analyze-button"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Skills"}
            </button>

          </div>

        </div>


        {/* =========================
            CAREER READINESS
        ========================= */}

        <div className="card">

          <div className="section-title">
            <h2>Career Readiness</h2>
            <span>AI Generated</span>
          </div>

          <div className="readiness-box">

            <div className="readiness-score">
              {loading ? "..." : `${analysis.score}%`}
            </div>

            <div>

              <h3>
                {loading
                  ? "Analyzing your skills..."
                  : analysis.message}
              </h3>

              <p className="muted-text">
                {loading
                  ? "AI is comparing your profile with the selected career requirements."
                  : analysis.description}
              </p>

            </div>

          </div>

        </div>


        {/* =========================
            SKILL ANALYSIS
        ========================= */}

        <div className="card">

          <div className="section-title">

            <h2>
              Skill Analysis
            </h2>

            <span>
              {analysis.skills.length} Skills Compared
            </span>

          </div>

          <div className="gap-list">

            {analysis.skills.map((skill) => (

              <div
                className="gap-item"
                key={skill.name}
              >

                <div className="gap-info">

                  <div>

                    <strong>
                      {skill.name}
                    </strong>

                    <p>
                      Required: {skill.required}
                    </p>

                  </div>

                  <span
                    className={`skill-status ${skill.className}`}
                  >
                    {skill.status}
                  </span>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${skill.progress}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* =========================
            AI RECOMMENDATIONS
        ========================= */}

        <div className="card">

          <div className="section-title">

            <h2>
              AI Recommendations
            </h2>

            <span>
              Personalized
            </span>

          </div>

          <div className="recommendation-list">

            {analysis.recommendations.map(
              (recommendation, index) => (

                <div
                  className="recommendation-item"
                  key={recommendation.title}
                >

                  <div className="recommendation-number">
                    {index + 1}
                  </div>

                  <div>

                    <strong>
                      {recommendation.title}
                    </strong>

                    <p className="muted-text">
                      {recommendation.description}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>


        {/* =========================
            NEXT STEP
        ========================= */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              What's Next?
            </strong>

            <p>
              Follow your personalized Career Roadmap to
              improve the identified skill gaps and become
              internship-ready.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default SkillGap;