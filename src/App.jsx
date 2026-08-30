import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import Skills from "./pages/student/Skills";
import Resume from "./pages/student/Resume";
import SkillGap from "./pages/student/SkillGap";
import CareerRoadmap from "./pages/student/CareerRoadmap";
import Jobs from "./pages/student/Jobs";
import Internships from "./pages/student/Internships";
import Applications from "./pages/student/Applications";
import CollegeDashboard from "./pages/college/CollegeDashboard";
import Students from "./pages/college/Students";
import SkillAnalytics from "./pages/college/SkillAnalytics";
import IndustryDemand from "./pages/college/IndustryDemand";
import PlacementAnalytics from "./pages/college/PlacementAnalytics";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import CreateJob from "./pages/company/CreateJob";
import MyJobs from "./pages/company/MyJobs";
import CompanyProfile from "./pages/company/CompanyProfile";
import Candidates from "./pages/company/Candidates";
import CompanyApplications from "./pages/company/CompanyApplications";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>

          {/* ==================== AUTH ==================== */}

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* ==================== STUDENT ==================== */}

          <Route
            path="/student"
            element={<StudentDashboard />}
          />

          <Route
            path="/student/profile"
            element={<StudentProfile />}
          />

          <Route
            path="/student/skills"
            element={<Skills />}
          />

          <Route
            path="/student/resume"
            element={<Resume />}
          />

          <Route
            path="/student/skill-gap"
            element={<SkillGap />}
          />

          <Route
            path="/student/roadmap"
            element={<CareerRoadmap />}
          />

          <Route
            path="/student/jobs"
            element={<Jobs />}
          />

          <Route
            path="/student/internships"
            element={<Internships />}
          />
          <Route
    path="/student/applications"
    element={<Applications />}
  />
  <Route
    path="/college"
    element={<CollegeDashboard />}
  />
  <Route
    path="/college/students"
    element={<Students />}
  />
  <Route
    path="/college/skill-analytics"
    element={<SkillAnalytics />}
  />
  <Route
    path="/college/industry-demand"
    element={<IndustryDemand />}
  />
  <Route
    path="/college/placements"
    element={<PlacementAnalytics />}
  />
  <Route
    path="/company"
    element={<CompanyDashboard />}
  />
  <Route
    path="/company/jobs/create"
    element={<CreateJob />}
  />
  <Route
    path="/company/jobs"
    element={<MyJobs />}
  />
  <Route
    path="/company/profile"
    element={<CompanyProfile />}
  />
  <Route
    path="/company/internships"
    element={<Internships />}
  />
  <Route
    path="/company/candidates"
    element={<Candidates />}
  />
  <Route
    path="/company/jobs/:id"
    element={<jobDetails />}
  />
  <Route
    path="/company/applications"
    element={<CompanyApplications />}
  />

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;