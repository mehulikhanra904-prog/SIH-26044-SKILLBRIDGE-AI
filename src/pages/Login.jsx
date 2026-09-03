import { Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);

      const userRole = res.data.user.role;
      if (userRole === "student") navigate("/student");
      if (userRole === "college") navigate("/college");
      if (userRole === "company") navigate("/company");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (

    <div className="login-page">

      {/* Animated background shapes */}
      <div className="cyber-grid"></div>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>
      <div className="particles">
        <span className="particle p1"></span>
        <span className="particle p2"></span>
        <span className="particle p3"></span>
        <span className="particle p4"></span>
        <span className="particle p5"></span>
        <span className="particle p6"></span>
        <span className="particle p7"></span>
        <span className="particle p8"></span>
        <span className="particle p9"></span>
        <span className="particle p10"></span>
        <span className="particle p11"></span>
        <span className="particle p12"></span>
      </div>

      <div className="shooting-stars">
        <span className="star s1"></span>
        <span className="star s2"></span>
        <span className="star s3"></span>
      </div>

      <div className="glow-ring"></div>
      
      <div className="login-card animate-in">


        {/* Logo */}

        <div className="logo-area">

          <div className="logo-icon pulse-icon">
            <Sparkles size={30} strokeWidth={2.2} />
          </div>

          <h1>
            SkillBridge AI
          </h1>

          <p>
            Academia • Industry • AI
          </p>

        </div>


        {/* Login Form */}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>
            Login As
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="college">College</option>
            <option value="company">Company</option>
          </select>

          <button
            type="submit"
            className="primary-button"
          >
            Login
          </button>

        </form>


        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </div>

      </div>

    </div>
  );
}

export default Login;