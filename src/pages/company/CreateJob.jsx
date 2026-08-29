import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function CreateJob() {

  const [formData, setFormData] = useState({
    title: "",
    type: "Full Time",
    location: "",
    salary: "",
    experience: "",
    skills: "",
    deadline: "",
    description: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Job posted successfully!");

    console.log("Job Data:", formData);
  };

  return (
    <div className="dashboard-layout">

      <Sidebar type="company" />

      <main className="main-content">

        <Navbar
          title="Post a New Job"
          subtitle="Create an opportunity and find the right candidates."
        />

        <form
          className="job-form card"
          onSubmit={handleSubmit}
        >

          {/* Basic Information */}

          <div className="form-section">

            <div className="form-section-title">

              <h2>
                Basic Information
              </h2>

              <p>
                Tell candidates about the position.
              </p>

            </div>


            <div className="form-grid">

              <div className="form-group full-width">

                <label>
                  Job Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Job Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >

                  <option>
                    Full Time
                  </option>

                  <option>
                    Part Time
                  </option>

                  <option>
                    Contract
                  </option>

                  <option>
                    Internship
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Kolkata / Remote"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Salary
                </label>

                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. ₹6–10 LPA"
                />

              </div>


              <div className="form-group">

                <label>
                  Minimum Experience
                </label>

                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                >

                  <option value="">
                    Select experience
                  </option>

                  <option>
                    Fresher
                  </option>

                  <option>
                    1+ years
                  </option>

                  <option>
                    2+ years
                  </option>

                  <option>
                    3+ years
                  </option>

                  <option>
                    5+ years
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* Skills */}

          <div className="form-section">

            <div className="form-section-title">

              <h2>
                Required Skills
              </h2>

              <p>
                Add the technical skills required for this position.
              </p>

            </div>


            <div className="form-group">

              <label>
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, Git"
                required
              />

              <small>
                Separate multiple skills with commas.
              </small>

            </div>

          </div>


          {/* Description */}

          <div className="form-section">

            <div className="form-section-title">

              <h2>
                Job Description
              </h2>

              <p>
                Explain the responsibilities and requirements.
              </p>

            </div>


            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, qualifications and expectations..."
                rows="8"
                required
              />

            </div>

          </div>


          {/* Deadline */}

          <div className="form-section">

            <div className="form-section-title">

              <h2>
                Application Deadline
              </h2>

              <p>
                Choose the last date candidates can apply.
              </p>

            </div>


            <div className="form-group">

              <label>
                Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* AI Matching */}

          <div className="ai-form-box">

            <div className="ai-info-icon">
              ✦
            </div>

            <div>

              <strong>
                AI Candidate Matching
              </strong>

              <p>
                After publishing this job, SkillBridge AI
                will automatically compare the job requirements
                with student skills, projects and resumes to
                identify the strongest candidates.
              </p>

            </div>

          </div>


          {/* Buttons */}

          <div className="form-actions">

            <button
              type="button"
              className="secondary-button"
            >
              Save Draft
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Publish Job
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default CreateJob;