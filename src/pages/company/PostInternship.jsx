import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function PostInternship() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", location: "", salary: "", experience: "", skills: "", deadline: "", description: "" });
  const [error, setError] = useState("");
  const change = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const submit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/jobs", { ...form, type: "Internship", status: "published" });
      navigate("/company/jobs");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to post internship.");
    }
  };
  return <div className="dashboard-layout"><Sidebar type="company" /><main className="main-content"><Navbar title="Post Internship" subtitle="Create an internship opportunity backed by your company account." />
    <form className="card job-form" onSubmit={submit}>{error && <p className="error-message">{error}</p>}
      <div className="form-grid">{["title", "location", "salary", "experience", "skills", "deadline"].map((name) => <div className="form-group" key={name}><label>{name}</label><input name={name} type={name === "deadline" ? "date" : "text"} value={form[name]} onChange={change} required={["title", "location", "skills", "deadline"].includes(name)} /></div>)}</div>
      <div className="form-group"><label>Description</label><textarea name="description" value={form.description} onChange={change} required rows="6" /></div>
      <button className="primary-button" type="submit">Publish Internship</button>
    </form></main></div>;
}

export default PostInternship;