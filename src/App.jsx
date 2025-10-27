import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Docs from "./pages/Docs/Docs.jsx";
import ViewDoc from "./pages/ViewDoc/ViewDoc.jsx";
import AddDoc from "./pages/Add/Add.jsx";
import Search from "./pages/Search/Search.jsx";
import Update from "./pages/Update/Update.jsx";
import CodeEditor from "./pages/CodeEditor/CodeEditor.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Invitation from "./pages/Invitation/Invitation.jsx";
import InviteInternal from "./pages/InviteInternal/InviteInternal.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import "./App.css";

// const port = import.meta.env.VITE_PORT;
// const SERVER_URL = "http://localhost:" + port;

const SERVER_URL =
  "https://jsramverk-hagt21-fdbhdnf5hrgrcbcc.northeurope-01.azurewebsites.net/";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  // Skapar en referens till socket-anslutningen
  const socket = useRef(null);

  useEffect(() => {
    if (!token) return;

    // Stänger gammal anslutning innan ny skapas.
    if (socket.current) {
      socket.current.disconnect();
    }

    const soc = io(SERVER_URL, {
      auth: { token },
    });

    socket.current = soc;

    return () => {
      // Stänger socket när komponenten avmonteras.
      soc.disconnect();
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Docs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/:docId?" element={<Register />} />
            <Route path="/view/:id" element={<ViewDoc />} />
            <Route path="/add" element={<AddDoc />} />
            <Route path="/search" element={<Search />} />
            <Route path="/update/:id" element={<Update socket={socket} />} />
            <Route path="/code/:id" element={<CodeEditor socket={socket} />} />
            <Route path="/invite/:id" element={<Invitation />} />
            <Route path="/invite-internal/:id" element={<InviteInternal />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
