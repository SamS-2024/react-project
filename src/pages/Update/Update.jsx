import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../../api/data";

import "./Update.css";

function Update({ socket }) {
  const { id } = useParams(); // Hämtar id från URL.
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Hämtar initialt dokument
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
    // Eslint vill att det sparas i en variabel
    // som används i clean up.
    const soc = socket.current;
    // Joina rum.
    soc.emit("create", id);
    // Skapar en eventlyssnare för "doc"
    soc.on("doc", (data) => {
      setContent(data.content);
      setTitle(data.title);
    });

    return () => {
      // Tar bort listener när en komponent 'unmounts'.
      soc.off("doc");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const redirectToDocs = async () => {
    navigate("/docs"); // Tillbaka till listan
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
            content,
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
            title,
            content: e.target.value,
          });
        }}
        placeholder="Content"
      />
      <button className="update-btn" onClick={redirectToDocs}>
        Docs
      </button>
    </div>
  );
}

export default Update;
