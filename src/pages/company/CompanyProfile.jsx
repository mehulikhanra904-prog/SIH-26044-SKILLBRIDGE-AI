import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function CompanyProfile() {

  const [editing, setEditing] = useState(false);

  const [company, setCompany] = useState({
    name: "TechNova Solutions",
    industry: "Information Technology",
    website: "www.technova.com",
    location: "Kolkata, West Bengal",
    size: "201–500 Employees",
    email: "careers@technova.com",
    phone: "+91 98765 43210",
    about:
      "TechNova Solutions is a technology company focused on building innovative software products and digital solutions. We work with modern technologies and provide opportunities for students and professionals to build industry-ready skills.",
    domains:
      "Web Development, AI & Machine Learning, Cloud Computing, Data Analytics"
  });

  const handleChange = (event) => {

    const { name, value } = event.target;

    setCompany({
      ...company,
      [name]: value
    });

  };

  return (
    <div className="dashboard-layout">

      <Sidebar type="company" />

      <main className="main-content">

        <Navbar
          title="Company Profile"
          subtitle="Manage your company information and hiring preferences."
        />


        {/* Profile Header */}

        <div className="company-profile-header card">

          <div className="company-logo">
            TN
          </div>

          <div className="company-header-info">

            <h1>
              {company.name}
            </h1>

            <p>
              {company.industry}
            </p>

            <span>
              📍 {company.location}
            </span>

          </div>

          <button
            className="primary-button"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Save Profile" : "Edit Profile"}
          </button>

        </div>


        {/* Basic Information */}

        <div className="card profile-card">

          <div className="section-title">

            <div>
              <h2>
                Company Information
              </h2>

              <p>
                Basic information about your organization.
              </p>
            </div>

          </div>


          <div className="profile-grid">

            <div className="form-group">

              <label>
                Company Name
              </label>

              <input
                type="text"
                name="name"
                value={company.name}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>


            <div className="form-group">

              <label>
                Industry
              </label>

              <input
                type="text"
                name="industry"
                value={company.industry}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>


            <div className="form-group">

              <label>
                Website
              </label>

              <input
                type="text"
                name="website"
                value={company.website}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>


            <div className="form-group">

              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                value={company.location}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>


            <div className="form-group">

              <label>
                Company Size
              </label>

              <input
                type="text"
                name="size"
                value={company.size}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>


            <div className="form-group">

              <label>
                Hiring Email
              </label>

              <input
                type="email"
                name="email"
                value={company.email}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>


            <div className="form-group">

              <label>
                Contact Number
              </label>

              <input
                type="text"
                name="phone"
                value={company.phone}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>

          </div>

        </div>


        {/* About */}

        <div className="card profile-card">

          <div className="section-title">

            <div>

              <h2>
                About Company
              </h2>

              <p>
                Introduce your organization to students and candidates.
              </p>

            </div>

          </div>


          <div className="form-group">

            <textarea
              name="about"
              value={company.about}
              onChange={handleChange}
              disabled={!editing}
              rows="7"
            />

          </div>

        </div>


        {/* Hiring Domains */}

        <div className="card profile-card">

          <div className="section-title">

            <div>

              <h2>
                Hiring Domains
              </h2>

              <p>
                Areas in which your company is currently hiring.
              </p>

            </div>

          </div>


          <div className="form-group">

            <label>
              Hiring Domains
            </label>

            <input
              type="text"
              name="domains"
              value={company.domains}
              onChange={handleChange}
              disabled={!editing}
            />

            <small>
              Separate multiple domains with commas.
            </small>

          </div>

        </div>


        {/* AI Matching */}

        <div className="ai-info">

          <div className="ai-info-icon">
            ✦
          </div>

          <div>

            <strong>
              AI Hiring Profile
            </strong>

            <p>
              SkillBridge AI uses your company's hiring domains,
              job requirements and skill preferences to identify
              students who are the best fit for your opportunities.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CompanyProfile;