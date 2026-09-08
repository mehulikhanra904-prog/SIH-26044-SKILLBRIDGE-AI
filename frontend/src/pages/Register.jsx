import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Register() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role
      });

      // Save the REAL user + token from the backend
      login(res.data.user, res.data.token);

      // Go to login page
      navigate("/");

    } catch (err) {

      alert(
        err.response?.data?.message || "Registration failed"
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
            Create Account
          </h1>

          <p>
            Join SkillBridge AI
          </p>

        </div>


        {/* Registration Form */}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >


          {/* Name */}

          <label>
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />


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
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />


          {/* Role */}

          <label>
            Register As
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


          {/* Create Account */}

          <button
            type="submit"
            className="primary-button"
          >
            Create Account
          </button>

        </form>


        {/* Login */}

        <div className="auth-footer">

          Already have an account?{" "}

          <Link to="/">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;