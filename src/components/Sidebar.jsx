import { NavLink } from "react-router-dom";

function Sidebar({ type = "student" }) {

  const studentMenu = [
    { name: "Dashboard", path: "/student", icon: "⌂" },
    { name: "My Profile", path: "/student/profile", icon: "◉" },
    { name: "My Skills", path: "/student/skills", icon: "◆" },
    { name: "Resume", path: "/student/resume", icon: "▤" },
    { name: "Skill Gap", path: "/student/skill-gap", icon: "◈" },
    { name: "Career Roadmap", path: "/student/roadmap", icon: "➜" },
    { name: "Jobs", path: "/student/jobs", icon: "▣" },
    { name: "Internships", path: "/student/internships", icon: "▦" },
    { name: "Applications", path: "/student/applications", icon: "✓" }
  ];

  const collegeMenu = [
    { name: "Dashboard", path: "/college", icon: "⌂" },
    { name: "Students", path: "/college/students", icon: "◉" },
    { name: "Skill Analytics", path: "/college/skill-analytics", icon: "◆" },
    { name: "Industry Demand", path: "/college/industry-demand", icon: "▣" },
    { name: "Placement Analytics", path: "/college/placements", icon: "✓" }
  ];

  const companyMenu = [
    { name: "Dashboard", path: "/company", icon: "⌂" },
    { name: "Company Profile", path: "/company/profile", icon: "◉" },
    { name: "Post Jobs", path: "/company/jobs/create", icon: "+" },
    { name: "My Jobs", path: "/company/jobs", icon: "▣" },
    { name: "Internships", path: "/company/internships", icon: "▦" },
    { name: "Candidates", path: "/company/candidates", icon: "◆" },
    { name: "Applications", path: "/company/applications", icon: "✓" }
  ];

  let menu = studentMenu;

  if (type === "college") {
    menu = collegeMenu;
  }

  if (type === "company") {
    menu = companyMenu;
  }

  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <div className="sidebar-logo-icon">
          S
        </div>

        <div>
          <h2>SkillBridge</h2>

          <span>
            AI Career Platform
          </span>
        </div>

      </div>


      {/* Navigation */}

      <nav className="sidebar-menu">

        <p className="menu-label">
          MAIN MENU
        </p>

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            end={
              item.path === "/student" ||
              item.path === "/college" ||
              item.path === "/company"
            }
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >

            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>


      {/* User */}

      <div className="sidebar-bottom">

        <div className="sidebar-user">

          <div className="user-avatar">

            {type === "college"
              ? "C"
              : type === "company"
              ? "B"
              : "M"
            }

          </div>

          <div>

            <strong>

              {type === "college"
                ? "College Admin"
                : type === "company"
                ? "Company Admin"
                : "Student"
              }

            </strong>

            <span>

              {type === "college"
                ? "college@example.com"
                : type === "company"
                ? "company@example.com"
                : "student@email.com"
              }

            </span>

          </div>

        </div>


        <NavLink
          to="/"
          className="logout-button"
        >
          ↪ Logout
        </NavLink>

      </div>

    </aside>
  );
}

export default Sidebar;