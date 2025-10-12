import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { register } from "../../api/data";

import "../Login/Login.css";

function Register() {
  const navigate = useNavigate();

  // Hämtar docId från url.
  const params = useParams();
  const docId = params.docId;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    // Möjlighet att registrera sig själv eller bli inbjuden till dokument (docId).
    const result = await register({ email, password, docId: docId || null });

    if (result.data) {
      navigate("/login");
    } else if (result.errors) {
      setMessage(result.errors.detail || "Registration failed");
    } else {
      setMessage("Unknown error occured");
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
      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

export default Register;
