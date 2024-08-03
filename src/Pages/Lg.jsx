import { useState } from "react";
import "./lg.css";
import { login } from "../Config";
import { signup } from "../Config";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [sign, setSign] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateInput = () => {
    if (email.trim() === "" || password.trim() === "") {
      setError("Email and Password are required");
      return false;
    }
    // Additional email and password validations
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const user_auth = async (event) => {
    event.preventDefault();
    setError("");

    if (!validateInput()) {
      return;
    }

    try {
      let user;
      if (sign === "Sign In") {
        user = await login(email, password);
        console.log("Login successful", user);
      } else {
        user = await signup(name, email, password);
        console.log("Signup successful", user);
      }
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Authentication error", error);
      setError(error.message); 
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <h1>{sign}</h1>
        <form>
          {sign === "Sign Up" && (
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}{" "}
          {/* Display error message */}
          <button className="btn" onClick={user_auth} type="submit">
            {sign}
          </button>
          {sign === "Sign Up" ? (
            <div className="help">
              <p>
                Already have an account?{" "}
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => setSign("Sign In")}
                >
                  Sign in now
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="help">
              <p>
                New to Olx?{" "}
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => setSign("Sign Up")}
                >
                  Sign up now
                </a>
                .
              </p>
            </div>
          )}
        </form>
        <div className="recaptcha">
          <p>
            This page is protected by Google reCAPTCHA to ensure you re not a
            bot. <a href="#">Learn more</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
