import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/data";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result.data && result.data.token) {
      localStorage.setItem("token", result.data.token);
      // Endast för visning i frontend så det syns vem som har loggat in.
      localStorage.setItem("email", email);

      navigate("/");
    } else {
      setMessage("Wrong email or password");
    }
  };

  const toRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
      <button className="to-register-btn" onClick={toRegister}>
        To register
      </button>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

export default Login;
