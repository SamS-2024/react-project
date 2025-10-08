import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/data";

import "./Update.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result.data && result.data.token) {
      localStorage.setItem("token", result.data.token);

      navigate("/docs");
    } else {
      alert("Wrong email or password");
    }
  };

  const toRegister = () => {
    navigate("/register");
  };

  return (
    <div className="update-container">
      <h2>Login</h2>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      <button className="update-btn" onClick={handleLogin}>
        Login
      </button>
      <button className="update-btn" onClick={toRegister}>
        Register
      </button>
    </div>
  );
}

export default Login;
