import { useState } from "react";
import GetOneDoc from "./GetOneDoc.jsx";

function SearchPage() {
  const [docId, setDocId] = useState(""); // Värdet i inputfältet
  const [selectedId, setSelectedId] = useState(""); // ID som ska skickas till GetOneDoc

  return (
    <div>
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

export default SearchPage;
