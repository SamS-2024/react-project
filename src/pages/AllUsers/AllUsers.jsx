import { useState, useEffect, useCallback } from "react";
import { getAllUsers } from "../../api/data.js";
import "./AllUsers.css";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const handleUsers = useCallback(async () => {
    const res = await getAllUsers();

    console.log(res);
    if (res && res.length > 0) {
      setUsers(res);
    } else {
      setMessage("No users yet in the database.");
    }
  }, []);

  useEffect(() => {
    handleUsers();
  }, [handleUsers]);

  return (
    <div className="members-container">
      <h1>Members registered in the database</h1>
      {message && <p className="invite-message">{message}</p>}

      <div className="users-list">
        <ul>
          {users.length > 0 && (
            <>
              {users &&
                users.map((user) => <li key={user.email}>{user.email}</li>)}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AllUsers;
