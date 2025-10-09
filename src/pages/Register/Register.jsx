import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/data";

import "../Login/Login.css";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register({ email, password });
    if (result.data) {
      navigate("/");
    } else {
      alert("User already exists, please enter another email adress.");
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      <button className="register-btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;
