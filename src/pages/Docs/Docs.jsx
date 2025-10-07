import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllData, deleteOne } from "../../api/data";
import "./Docs.css";

function Docs() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllData()
      .then((result) => setData(result.docs))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    deleteOne(id);
    setData(data.filter((item) => item._id !== id));
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div>
      <h1>Documents</h1>
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
          {data.map((item) => (
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
      <button
        id="add-btn"
        className="add-new-btn"
        onClick={() => navigate("/add")}
      >
        Add new
      </button>
    </div>
  );
}

export default Docs;
