import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {

    e.preventDefault();

    /*
      Create a basic user profile from the login details.
      Later, the backend/database will provide these details.
    */

    const existingUser =
      JSON.parse(localStorage.getItem("user")) || {};

    const user = {
      ...existingUser,
      email: email,
      role: role
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );


    // Redirect according to role

    if (role === "student") {
      navigate("/student");
    }

    if (role === "college") {
      navigate("/college");
    }

    if (role === "company") {
      navigate("/company");
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