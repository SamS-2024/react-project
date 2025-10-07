import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { getOne, updateOne } from "../../api/data";
import { getOne } from "../../api/data";

import "./Update.css";
// import { socket } from "../../App.jsx";

function Update({ socket }) {
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

  // Sockets
  useEffect(() => {
    if (!id || !socket.current) return;
    // Joina rum.
    socket.current.emit("create", id);
    // Skapar en eventlyssnare för "doc"
    socket.current.on("doc", (data) => {
      setContent(data.html);
      setTitle(data.title);
    });

    return () => {
      // Tar bort listener när en komponent 'unmount'.
      socket.current.off("doc");
    };
  }, [id]);

  const handleSave = async () => {
    // await updateOne({ id, title, content });

    navigate("/"); // Tillbaka till listan
  };

  return (
    <div className="update-container">
      <h2>Update document {id}</h2>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          socket.current.emit("doc", {
            _id: id,
            title: e.target.value,
            html: content,
          });
        }}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          socket.current.emit("doc", {
            _id: id,
            title: title,
            html: e.target.value,
          });
        }}
        placeholder="Content"
      />
      <button className="update-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default Update;
