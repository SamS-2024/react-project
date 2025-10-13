import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { inviteInternal, getUsersList } from "../../api/data.js";
import "../Invitation/Invitation.css";

function InviteInternal() {
  const { id: docId } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [usersList, setUsersList] = useState({ owner: "", allowedUsers: [] });

  const handleUsersList = useCallback(async () => {
    const res = await getUsersList(docId);
    if (res) setUsersList(res);
  }, [docId]);

  useEffect(() => {
    handleUsersList();
  }, [handleUsersList]);

  const handleInvite = async () => {
    const res = await inviteInternal(docId, userEmail);
    if (res.success) {
      setMessage(res.message);
      handleUsersList();
    } else {
      setMessage(res.message || "Failed to invite user");
    }
  };

  return (
    <div className="invitation-container">
      <h1>Invite internal user to document</h1>
      <input
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="Email"
      />
      <button
        onClick={async () => {
          await handleInvite();
          setUserEmail("");
        }}
      >
        Invite
      </button>
      {message && <p className="invite-message">{message}</p>}

      <div className="users-list">
        <ul>
          <li className="users">Owner:</li>
          <li>{usersList.owner}</li>

          {usersList.allowedUsers.length > 0 && (
            <>
              <li className="users">Users:</li>
              {usersList.allowedUsers.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </>
          )}

          {usersList.allowedUsers.length === 0 && (
            <li className="invite-message">No collaborators yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default InviteInternal;
