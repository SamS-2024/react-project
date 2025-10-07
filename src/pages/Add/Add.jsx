import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addOne } from "../../api/data";
import "./Add.css";

function AddDoc() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("text");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    await addOne({ title: title, content: content, type: type });
    navigate("/");
  };

  const toggleType = () => {
    setType((prev) => (prev === "text" ? "code" : "text"));
  };

  return (
    <div className="add-container">
      <h1>Add New Document</h1>
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
        <div className="type">
          <label>Type:</label>
          <div className="type-slider" onClick={toggleType}>
            <div className={`slider ${type}`}>{type.toUpperCase()}</div>
          </div>
        </div>
        <button id="submit" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddDoc;
