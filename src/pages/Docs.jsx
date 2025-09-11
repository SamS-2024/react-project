import { useState, useEffect } from "react";
import { getAllData } from "../api/data";
import "./Docs.css";

function Docs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllData()
      .then((result) => setData(result.docs))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Documents</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Docs;
