import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../../api/data";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import { execJs } from "../../api/execjs";

function CodeEditor({ socket }) {
  const { id } = useParams(); // Hämtar id från URL.
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    getOne(id)
      .then((result) => {
        setTitle(result.doc.title);
        setContent(result.doc.content);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // Sockets
  useEffect(() => {
    if (!id || !socket.current) return;
    // Eslint vill att det sparas i en variabel
    // som används i clean up.
    const soc = socket.current;
    // Joina rum.
    soc.emit("create", id);
    // Skapar en eventlyssnare för "doc"
    soc.on("doc", (data) => {
      setContent(data.content);
      setTitle(data.title);
    });

    return () => {
      // Tar bort listener när en komponent 'unmounts'.
      soc.off("doc");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //const handleRun = async (id) => {
  const handleRun = async () => {
    setRunning(true);
    setOutput("");

    try {
      const res = await execJs(content);
      setOutput(res);
    } catch (err) {
      setOutput("Error running code.");
      console.error(err);
    } finally {
      setRunning(false);
    }
  };

  const redirectToDocs = async () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <>
      <h2>Code Editor for document {id}</h2>
      <button
        className="run-btn-code"
        onClick={() => handleRun(id)}
        disabled={running}
      >
        {running ? "Running..." : "Run code"}
      </button>

      <button className="update-btn-code" onClick={redirectToDocs}>
        Docs
      </button>
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        // För att uppdatera innehåll i realtid.
        value={content}
        onChange={(value) => {
          // Skickar endast till socket om något ändrats.
          if (value !== content) {
            setContent(value);
            socket.current.emit("doc", { _id: id, title, content: value });
          }
        }}
        options={{
          padding: { top: 16 },
        }}
      />
      <h3>Output:</h3>
      {running ? (
        <div className="output-loading">
          <div className="spinner"></div>
          <p>Running code...</p>
        </div>
      ) : (
        <pre className="output-box">{output}</pre>
      )}
    </>
  );
}

export default CodeEditor;
