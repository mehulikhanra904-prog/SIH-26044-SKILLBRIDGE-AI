import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function CandidateDetails() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    api.get("/applications/company").then(({ data }) => {
      const found = data.applications.find((item) => item.id === id);
      if (found) setApplication(found); else setError("Application not found.");
    }).catch((requestError) => setError(requestError.response?.data?.message || "Unable to load candidate."));
  }, [id]);
  return <div className="dashboard-layout"><Sidebar type="company" /><main className="main-content"><Navbar title="Candidate Details" subtitle="Candidate information from the application record." />{error && <p className="error-message">{error}</p>}{application && <div className="card profile-card"><h1>{application.student?.name}</h1><p>{application.student?.email}</p><p>Applied for {application.job?.title}</p><div className="skills-container">{application.student?.skills?.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div>{application.student?.resumeUrl && <a href={application.student.resumeUrl} target="_blank" rel="noreferrer">View resume</a>}</div>}</main></div>;
}

export default CandidateDetails;