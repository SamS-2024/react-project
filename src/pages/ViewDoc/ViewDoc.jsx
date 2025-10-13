import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne, deleteOne } from "../../api/data";
import "./ViewDoc.css";

function ViewDoc() {
  const { id } = useParams(); // Hämtar id från URL.
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getOne(id)
      .then((result) => {
        setTitle(result.doc.title);
        setContent(result.doc.content);
        setType(result.doc.type);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async (id) => {
    deleteOne(id);
    navigate("/"); // Tillbaka till listan
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleCode = (id) => {
    navigate(`/code/${id}`);
  };

  const handleInvitation = (id) => {
    navigate(`/invite/${id}`);
  };

  const handleInternalInvitation = (id) => {
    navigate(`/invite-internal/${id}`);
  };

  return (
    <div className="update-container">
      <h2>Document {id}</h2>
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

      {type === "code" && (
        <button className="code-btn" onClick={() => handleCode(id)}>
          Code
        </button>
      )}

      <button className="update-btn" onClick={() => handleUpdate(id)}>
        Update
      </button>

      <button
        className="invite-btn"
        onClick={() => handleInternalInvitation(id)}
      >
        Invite members
      </button>

      <button className="invite-btn" onClick={() => handleInvitation(id)}>
        Invite others
      </button>

      <button className="delete-btn" onClick={() => handleDelete(id)}>
        Delete
      </button>
    </div>
  );
}

export default ViewDoc;
