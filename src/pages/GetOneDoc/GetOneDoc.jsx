import { useState, useEffect } from "react";
import { getOne } from "../../api/data";
import "../Docs/Docs.css";

function GetOneDoc({ id }) {
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    if (!id) return;
    getOne(id)
      .then((result) => setDoc(result.doc))
      .catch((err) => console.error(err));
  }, [id]);

  if (!doc) return <p>No doc with the provided ID was found</p>;

  return (
    <div>
      <h2>Document {doc.id}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          <tr key={doc._id}>
            <td>{doc._id}</td>
            <td>{doc.title}</td>
            <td>{doc.content}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GetOneDoc;
