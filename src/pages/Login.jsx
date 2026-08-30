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
        email,
        password
      });

      // Save the REAL user + token from the backend
      login(res.data.user, res.data.token);

      const userRole = res.data.user.role;

      // Redirect according to role

      if (userRole === "student") {
        navigate("/student");
      }

      if (userRole === "college") {
        navigate("/college");
      }

      if (userRole === "company") {
        navigate("/company");
      }

    } catch (err) {

      alert(
        err.response?.data?.message || "Login failed"
      );

    }

  };


  return (

    <div className="login-page">

      <div className="login-card">


        {/* Logo */}

        <div className="logo-area">

          <div className="logo-icon">
            S
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


          {/* Email */}

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />


          {/* Password */}

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />


          {/* Role */}

          <label>
            Login As
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >

            <option value="student">
              Student
            </option>

            <option value="college">
              College
            </option>

            <option value="company">
              Company
            </option>

          </select>


          {/* Login Button */}

          <button
            type="submit"
            className="primary-button"
          >
            Login
          </button>

        </form>


        {/* Register */}

        <div className="auth-footer">

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;