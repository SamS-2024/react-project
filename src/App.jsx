import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Docs from "./pages/Docs.jsx";
import Header from "./components/Header.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Docs />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
