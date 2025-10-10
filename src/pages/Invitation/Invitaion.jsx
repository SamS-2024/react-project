import { useState } from "react";
import { useParams } from "react-router-dom";
import { invite } from "../../api/data.js";

function Invitation() {
  // Hämtar dokumentets ID från URL
  const { id: docId } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleInvite = async () => {
    const res = await invite(docId, userEmail);
    if (res.success) {
      setMessage(res.message);
      setUserEmail("");
    } else {
      setMessage(res.message || "Failed to invite user");
    }
  };

  return (
    <div className="search-container">
      <h1>Invite user to document</h1>
      <input
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="Email"
      />
      <button
        onClick={async () => {
          await handleInvite();
          // Rensar inputfältet efter att användaren bjudits in.
          setUserEmail("");
        }}
      >
        Invite
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Invitation;
