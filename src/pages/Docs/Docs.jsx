import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllData } from "../../api/data";
import "./Docs.css";

function Docs() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    // Tar bort email-visningen
    localStorage.removeItem("email");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    // För endast visning av inloggad användare.
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail || "");

    if (!storedToken) return;

    getAllData()
      .then((result) => {
        if (result && result.docs) {
          setData(result.docs);
        }
      })
      .catch((err) => {
        // Om token går ut och backend skickar 401.
        if (err.status === 401) {
          logout();
        }
        console.error(err);
      });
  }, [logout]);

  return (
    <>
      {token ? (
        <div>
          <h1>Documents</h1>
          {email && <h2>Welcome {email}</h2>}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => navigate(`/view/${item._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{item._id}</td>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td>{item.type || "text"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button className="add-new-btn" onClick={() => navigate("/search")}>
            Search
          </button>
          <button
            id="add-btn"
            className="add-new-btn"
            onClick={() => navigate("/add")}
          >
            Add new
          </button>
          <button className="add-new-btn" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h3>
            Welcome to the SSR editor. Please log in or register to create
            documents and view your saved ones.
          </h3>
          <button className="add-new-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      )}
    </>
  );
}

export default Docs;
