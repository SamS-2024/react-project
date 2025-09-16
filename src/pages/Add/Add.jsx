import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addOne } from "../../api/data";
import "./Add.css";

function AddDoc() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    await addOne({ title: title, content: content });

    navigate("/");
  };

  return (
    <div>
      <h2>Add New Document</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddDoc;
