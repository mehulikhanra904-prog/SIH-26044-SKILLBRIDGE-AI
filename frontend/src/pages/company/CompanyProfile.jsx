import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api";

function CompanyProfile() {
  const [editing, setEditing] = useState(false);
  const [company, setCompany] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/companies/profile")
      .then(({ data }) => setCompany(data.company))
      .catch((err) => setError(err.response?.data?.message || "Unable to load company profile."));
  }, []);

  const handleChange = (event) => setCompany((current) => ({ ...current, [event.target.name]: event.target.value }));

  const saveProfile = async () => {
    setSaving(true);
    setError("");
    try {
      const { data } = await api.put("/companies/profile", company);
      setCompany(data.company);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update company profile.");
    } finally { setSaving(false); }
  };

  if (!company) return <div className="dashboard-layout"><Sidebar type="company" /><main className="main-content"><Navbar title="Company Profile" subtitle="Manage your company information and hiring preferences." />{error ? <div className="error-message">{error}</div> : <p>Loading company profile...</p>}</main></div>;

  const displayName = company.companyName || company.user?.name || "Company";
  const initials = displayName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const domains = Array.isArray(company.hiringDomains) ? company.hiringDomains.join(", ") : company.hiringDomains || "";

  return <div className="dashboard-layout">
    <Sidebar type="company" />
    <main className="main-content">
      <Navbar title="Company Profile" subtitle="Manage your company information and hiring preferences." />
      {error && <div className="error-message">{error}</div>}
      <div className="company-profile-header card"><div className="company-logo">{initials}</div><div className="company-header-info"><h1>{displayName}</h1><p>{company.industry || "Industry not specified"}</p><span>📍 {company.location || "Location not specified"}</span></div><button className="primary-button" onClick={editing ? saveProfile : () => setEditing(true)} disabled={saving}>{saving ? "Saving..." : editing ? "Save Profile" : "Edit Profile"}</button></div>
      <div className="card profile-card"><div className="section-title"><div><h2>Company Information</h2><p>Basic information about your organization.</p></div></div><div className="profile-grid">
        {[['companyName','Company Name','text'],['industry','Industry','text'],['website','Website','text'],['location','Location','text'],['companySize','Company Size','text'],['hiringEmail','Hiring Email','email'],['contactNumber','Contact Number','text']].map(([name,label,type]) => <div className="form-group" key={name}><label>{label}</label><input type={type} name={name} value={company[name] || ""} onChange={handleChange} disabled={!editing} /></div>)}
      </div></div>
      <div className="card profile-card"><div className="section-title"><div><h2>About Company</h2><p>Introduce your organization to students and candidates.</p></div></div><div className="form-group"><textarea name="about" value={company.about || ""} onChange={handleChange} disabled={!editing} rows="7" /></div></div>
      <div className="card profile-card"><div className="section-title"><div><h2>Hiring Domains</h2><p>Areas in which your company is currently hiring.</p></div></div><div className="form-group"><label>Hiring Domains</label><input type="text" name="hiringDomains" value={domains} onChange={handleChange} disabled={!editing} placeholder="Separate multiple domains with commas" /></div></div>
    </main>
  </div>;
}

export default CompanyProfile;
