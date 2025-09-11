import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllData } from "../../api/data";
import "./Docs.css";

function Docs() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllData()
      .then((result) => setData(result.docs))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="head">
        <h2>Documents</h2>
        <button onClick={() => navigate("/add")}>Add new</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Docs;
