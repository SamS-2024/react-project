import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Login</Link>
        <Link to="/docs">Documents</Link>
        <Link to="/add">Add Document</Link>
        <Link to="/search">Search</Link>
      </nav>
    </header>
  );
}

export default Header;
