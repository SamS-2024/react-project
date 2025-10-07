import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Docs from "./pages/Docs/Docs.jsx";
import AddDoc from "./pages/Add/Add.jsx";
import Search from "./pages/Search/Search.jsx";
import Update from "./pages/Update/Update.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

const port = import.meta.env.VITE_PORT;
const SERVER_URL = "http://localhost:" + port;

let socket;

function App() {
  useEffect(() => {
    socket = io(SERVER_URL);

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Docs />} />
            <Route path="/add" element={<AddDoc />} />
            <Route path="/search" element={<Search />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </>
  );
}

export default App;
export { socket };
