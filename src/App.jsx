import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Docs from "./pages/Docs/Docs.jsx";
import AddDoc from "./pages/Add/Add.jsx";
import Header from "./components/Header/Header.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Docs />} />
            <Route path="/add" element={<AddDoc />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
