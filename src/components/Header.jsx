import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Docs</Link>
      </nav>
    </header>
  );
}

export default Header;
