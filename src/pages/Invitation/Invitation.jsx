import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { invite, getUsersList } from "../../api/data.js";
import "./Invitation.css";

function Invitation() {
  // Hämtar dokumentets id från URL
  const { id: docId } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [usersList, setUsersList] = useState({ owner: "", allowedUsers: [] });

  const handleUsersList = useCallback(async () => {
    const res = await getUsersList(docId);
    if (res) {
      setUsersList(res);
    }
  }, [docId]);

  useEffect(() => {
    handleUsersList();
  }, [handleUsersList]);

  const handleInvite = async () => {
    const res = await invite(docId, userEmail);
    if (res.success) {
      setMessage(res.message);
    } else {
      setMessage(res.message || "Failed to invite user");
    }
  };

  return (
    <div className="invitation-container">
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
      {message && <p className="invite-message">{message}</p>}

      <div className="users-list">
        <ul>
          {/* Visar ägare */}
          <li key="users-header" className="users">
            Document owner:
          </li>
          <li key="owner">{usersList.owner}</li>

          {/* Visar allowedUsers som lista */}
          {Array.isArray(usersList.allowedUsers) &&
            usersList.allowedUsers.length > 0 && (
              <>
                <li key="users-header" className="users">
                  Collaborators:
                </li>
                {usersList.allowedUsers.map((user) => {
                  return <li key={user}>{user}</li>;
                })}
              </>
            )}

          {/* Om allowedUsers saknas */}
          {(!usersList.allowedUsers || usersList.allowedUsers.length === 0) && (
            <li className="invite-message">No collaborators yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Invitation;
