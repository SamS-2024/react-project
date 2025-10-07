import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Docs from "./pages/Docs/Docs.jsx";
import ViewDoc from "./pages/ViewDoc/ViewDoc.jsx";
import AddDoc from "./pages/Add/Add.jsx";
import Search from "./pages/Search/Search.jsx";
import Update from "./pages/Update/Update.jsx";
import CodeEditor from "./pages/CodeEditor/CodeEditor.jsx";
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
            <Route path="/view/:id" element={<ViewDoc />} />
            <Route path="/add" element={<AddDoc />} />
            <Route path="/search" element={<Search />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/code/:id" element={<CodeEditor />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </>
  );
}

export default App;
