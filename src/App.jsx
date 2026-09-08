import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
import TrainingRecommendations from "./pages/college/TrainingRecommendations";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import CreateJob from "./pages/company/CreateJob";
import MyJobs from "./pages/company/MyJobs";
import JobDetails from "./pages/company/jobDetails";
import CompanyProfile from "./pages/company/CompanyProfile";
import Candidates from "./pages/company/Candidates";
import CompanyApplications from "./pages/company/CompanyApplications";
import PostInternship from "./pages/company/PostInternship";
import CandidateDetails from "./pages/company/CandidateDetails";
import "./App.css";

const secured = (role, element) => <ProtectedRoute role={role}>{element}</ProtectedRoute>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={secured("student", <StudentDashboard />)} />
          <Route path="/student/profile" element={secured("student", <StudentProfile />)} />
          <Route path="/student/skills" element={secured("student", <Skills />)} />
          <Route path="/student/resume" element={secured("student", <Resume />)} />
          <Route path="/student/skill-gap" element={secured("student", <SkillGap />)} />
          <Route path="/student/roadmap" element={secured("student", <CareerRoadmap />)} />
          <Route path="/student/jobs" element={secured("student", <Jobs />)} />
          <Route path="/student/internships" element={secured("student", <Internships />)} />
          <Route path="/student/applications" element={secured("student", <Applications />)} />
          <Route path="/college" element={secured("college", <CollegeDashboard />)} />
          <Route path="/college/students" element={secured("college", <Students />)} />
          <Route path="/college/skill-analytics" element={secured("college", <SkillAnalytics />)} />
          <Route path="/college/industry-demand" element={secured("college", <IndustryDemand />)} />
          <Route path="/college/placements" element={secured("college", <PlacementAnalytics />)} />
          <Route path="/college/training-recommendations" element={secured("college", <TrainingRecommendations />)} />
          <Route path="/company" element={secured("company", <CompanyDashboard />)} />
          <Route path="/company/jobs/create" element={secured("company", <CreateJob />)} />
          <Route path="/company/jobs" element={secured("company", <MyJobs />)} />
          <Route path="/company/profile" element={secured("company", <CompanyProfile />)} />
          <Route path="/company/internships" element={secured("company", <PostInternship />)} />
          <Route path="/company/candidates" element={secured("company", <Candidates />)} />
          <Route path="/company/candidates/:id" element={secured("company", <CandidateDetails />)} />
          <Route path="/company/jobs/:id" element={secured("company", <JobDetails />)} />
          <Route path="/company/applications" element={secured("company", <CompanyApplications />)} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
