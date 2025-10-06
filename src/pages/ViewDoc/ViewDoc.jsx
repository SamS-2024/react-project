import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne, updateOne } from "../../api/data";
import "./ViewDoc.css";

function ViewDoc() {
  const { id } = useParams(); // Hämtar id från URL.
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getOne(id)
      .then((result) => {
        setTitle(result.doc.title);
        setContent(result.doc.content);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSave = async () => {
    await updateOne({ id, title, content });
    navigate("/"); // Tillbaka till listan
  };

  const handleDelete = async (id) => {
    deleteOne(id);
    setData(data.filter((item) => item._id !== id));
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="update-container">
      <h2>Update document {id}</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />

      <button
        className="update-btn"
        onClick={() => handleUpdate(id)}
      >
        Update
      </button>

      <button
        className="delete-btn"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
}

export default ViewDoc;
