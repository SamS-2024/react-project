import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
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
import "./App.css";

const port = import.meta.env.VITE_PORT;
const SERVER_URL = "http://localhost:" + port;

function App() {
  // Skapar en referens till socket-anslutningen
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(SERVER_URL, {
      // Skickar token till backend för att kunna hantera update doc.
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <>
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
    </>
  );
}

export default App;
