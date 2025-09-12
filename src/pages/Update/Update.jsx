import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne, updateOne } from "../../api/data";
import "./Update.css";

function Update() {
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

  return (
    <div className="update-container">
      <h2>Update Document {id}</h2>
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
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Update;
