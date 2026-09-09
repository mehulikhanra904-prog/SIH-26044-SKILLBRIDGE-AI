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
      const res = await api.post("/auth/login", {
        email: email.trim(),
        password,
        role,
      });

      const user = res.data?.user;
      const userRole = user?.role;

      if (!user || !userRole) {
        alert("Login failed: the server did not return a valid account role.");
        return;
      }

      // Never trust the selected dropdown value alone.
      // Always use the role stored in the authenticated backend response.
      login(user, res.data.token);

      if (userRole === "student") {
        navigate("/student", { replace: true });
      } else if (userRole === "college") {
        navigate("/college", { replace: true });
      } else if (userRole === "company") {
        navigate("/company", { replace: true });
      } else {
        localStorage.clear();
        alert("Unknown account role returned by server.");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo-area">
          <div className="logo-icon">S</div>
          <h1>SkillBridge AI</h1>
          <p>Academia • Industry • AI</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Login As</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="college">College</option>
            <option value="company">Company</option>
          </select>

          <button type="submit" className="primary-button">Login</button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
