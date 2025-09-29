import { useState } from "react";
import GetOneDoc from "../GetOneDoc/GetOneDoc.jsx";
import "./Search.css";

function Search() {
  const [docId, setDocId] = useState(""); // Värdet i inputfältet
  const [selectedId, setSelectedId] = useState(""); // ID som ska skickas till GetOneDoc

  return (
    <div className="search-container">
      <h1>Search for a document</h1>
      <input
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
        placeholder="Enter ID"
      />
      <button
        onClick={() => {
          setSelectedId(docId);
          setDocId(""); // Rensar inputfältet.
        }}
      >
        Search
      </button>
      {selectedId && <GetOneDoc id={selectedId} />}
    </div>
  );
}

export default Search;
