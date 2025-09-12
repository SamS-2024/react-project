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
            <th className="th-delete"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>

                <button
                  className="update-btn"
                  onClick={() => handleUpdate(item._id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Docs;
