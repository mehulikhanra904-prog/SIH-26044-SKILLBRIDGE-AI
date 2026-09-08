import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const emptyCompany = { companyName: "", industry: "", website: "", location: "", companySize: "", hiringEmail: "", contactNumber: "", about: "", hiringDomains: [] };

function CompanyProfile() {
  const [company, setCompany] = useState(emptyCompany);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/companies/profile")
      .then(({ data }) => setCompany({ ...emptyCompany, ...data.company, hiringDomains: data.company.hiringDomains || [] }))
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load company profile."));
  }, []);

  const change = ({ target }) => setCompany((current) => ({ ...current, [target.name]: target.value }));
  const save = async () => {
    try {
      const payload = { ...company, hiringDomains: String(company.hiringDomains).split(",").map((item) => item.trim()).filter(Boolean) };
      const { data } = await api.put("/companies/profile", payload);
      setCompany({ ...emptyCompany, ...data.company });
      setEditing(false);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save company profile.");
    }
  };

  return <div className="dashboard-layout"><Sidebar type="company" /><main className="main-content">
    <Navbar title="Company Profile" subtitle="Manage information used for hiring and matching." />
    {error && <p className="error-message">{error}</p>}
    <div className="card profile-card"><div className="section-title"><div><h2>{company.companyName || "Company Profile"}</h2><p>{company.industry || "Add your company details"}</p></div><button className="primary-button" onClick={() => (editing ? save() : setEditing(true))}>{editing ? "Save Profile" : "Edit Profile"}</button></div>
      <div className="profile-grid">
        {["companyName", "industry", "website", "location", "companySize", "hiringEmail", "contactNumber"].map((name) => <div className="form-group" key={name}><label>{name}</label><input name={name} value={company[name] || ""} onChange={change} disabled={!editing} /></div>)}
      </div>
      <div className="form-group"><label>About</label><textarea name="about" value={company.about || ""} onChange={change} disabled={!editing} rows="5" /></div>
      <div className="form-group"><label>Hiring domains</label><input name="hiringDomains" value={Array.isArray(company.hiringDomains) ? company.hiringDomains.join(", ") : company.hiringDomains} onChange={change} disabled={!editing} /></div>
    </div>
  </main></div>;
}

export default CompanyProfile;
