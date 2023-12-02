import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./sign-in.css";

const SignIn = ({ onAuthentication }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "https://stg.dhunjam.in/account/admin/login",
        {
          username: username,
          password: password,
        }
      );
      if (response.data.status === 200) {
        onAuthentication(response.data);
      } else {
        setIsIncorrect(true);
      }
    } catch (error) {
      setIsIncorrect(true);
      console.error("API Error:", error);
    }
  };

  return (
    <div className="container">
      <form className="signin-form">
        <h2 className="signin-heading">Venue Admin Login</h2>
        <input
          type="text"
          className="signin-input"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type={showPassword ? "text" : "password"}
          className="signin-input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <span className="eye-icon" onClick={handleTogglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        <button type="button" className="signin-button" onClick={handleSignIn}>
          Sign In
        </button>
        {isIncorrect && <p style={{ color: "red" }}>Incorrect Credentials</p>}
      </form>
    </div>
  );
};

export default SignIn;
