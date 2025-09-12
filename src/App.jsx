import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Docs from "./pages/Docs/Docs.jsx";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
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
      <Footer />
    </>
  );
}

export default App;
