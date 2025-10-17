import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { getOne } from "../../api/data";

import "./Update.css";

function Update({ socket }) {
  const { id } = useParams(); // Hämtar id från URL.
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [editorReady, setEditorReady] = useState(false);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    setEditorReady(true);

    // Handle click on line numbers → add comment
    editor.onMouseDown((e) => {
      if (e.target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS) {
        const lineNumber = e.target.position.lineNumber;
        const text = prompt(`Comment for line ${lineNumber}:`);
        if (text) {
          console.log(text)
          socket.current.emit("addComment", {
            documentId: id,
            lineNumber,
            content: text,
            createdAt: new Date(),
          });
        }
      }
    });
  };

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
    if (!id || !socket.current) { console.log("No id or socket"); console.log(id); console.log(socket); return; }
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

    // When a new comment is added by anyone
    soc.on("newComment", (comment) => {
      setComments((prev) => [...prev, comment]);
    });

    // Load existing comments
    soc.emit("getComments", id);
    soc.on("loadComments", (data) => setComments(data));

    return () => {
      // Tar bort listener när en komponent 'unmounts'.
      soc.off("doc");
      soc.off("newComment");
      soc.off("loadComments");
    };
  }, [id, socket.current]);

  useEffect(() => {
    if (!editorReady || !editorRef.current || !monacoRef.current) return;

    if (!comments || comments.length === 0) {
      editorRef.current.deltaDecorations([], []);
      return;
    }

    const decorations = comments.map((c) => ({
      range: new monacoRef.current.Range(c.lineNumber, 1, c.lineNumber, 1),
      options: {
        isWholeLine: true,
        linesDecorationsClassName: "has-comment",
        hoverMessage: { value: `💬 ${c.content}` },
      },
    }));

    editorRef.current.deltaDecorations([], decorations);
  }, [editorReady, comments]);

  const redirectToDocs = () => {
    navigate("/");
  };

  if (!socket.current) {
    return <p>Connecting to server...</p>;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="code-editor-container">
      <div className="editor-section">
        <div className="update-actions">
          <div>
            <h2>Update document {id}</h2>
            <input
              className="update-title-input"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                socket.current.emit("doc", {
                  _id: id,
                  title: e.target.value,
                  content,
                });
              }}
              placeholder="Title"
            />
          </div>
          <div>
            <button className="update-btn-update" onClick={redirectToDocs}>
              Docs
            </button>
          </div>
        </div>

        <Editor
            height="80vh"
            defaultLanguage="plaintext"
            theme="vs-light"
            value={content}
            onMount={handleEditorDidMount}
            onChange={(value) => {
              if (value !== content) {
                setContent(value);
                socket.current.emit("doc", { _id: id, title, content: value });
              }
            }}
            options={{
              wordWrap: "on",
              minimap: { enabled: false },
              padding: { top: 16, bottom: 16 },
              fontSize: 16,
              fontFamily: 'Arial, sans-serif',
              cursorStyle: "line",
              scrollBeyondLastLine: false,
              renderLineHighlight: "none",
              automaticLayout: true,

              suggestOnTriggerCharacters: false,
              quickSuggestions: false,
              parameterHints: { enabled: false },
              acceptSuggestionOnEnter: "off",
              tabCompletion: "off",
              wordBasedSuggestions: false,

              overviewRulerLanes: 0,
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                handleMouseWheel: true,
                alwaysConsumeMouseWheel: false,
                verticalHasArrows: false,
                horizontalHasArrows: false,
                arrowSize: 0,
                verticalScrollbarSize: 12,
                horizontalScrollbarSize: 12,
              },
            }}
          />
      </div>

      <div className="update-comments-sidebar">
        <h3>Comments</h3>
        {comments.length === 0 && <p className="no-comments">No comments yet</p>}
        {[...comments]
        .sort((a, b) => a.lineNumber - b.lineNumber)
        .map((c, i) => {
          const lineCount = editorRef.current
            ? editorRef.current.getModel().getLineCount()
            : 0;
          const lineExists = c.lineNumber <= lineCount;

          return (
            <div
              key={i}
              className={`update-comment-card ${!lineExists ? "update-comment-disabled" : ""}`}
              onMouseEnter={() => {
                if (!lineExists) return;
                if (editorRef.current && monacoRef.current) {
                  const highlight = editorRef.current.deltaDecorations([], [
                    {
                      range: new monacoRef.current.Range(c.lineNumber, 1, c.lineNumber, 1),
                      options: { isWholeLine: true, className: "update-hover-highlight-line" },
                    },
                  ]);
                  c._highlightId = highlight;
                }
              }}
              onMouseLeave={() => {
                if (!lineExists || !c._highlightId) return;
                editorRef.current.deltaDecorations(c._highlightId, []);
                delete c._highlightId;
              }}
              onClick={() => {
                if (!lineExists) return;
                editorRef.current.revealLineInCenter(c.lineNumber);
              }}
            >
              <p className="update-comment-line">
                Line {lineExists ? c.lineNumber : "deleted"}
              </p>
              <p className="update-comment-content">💬 {c.content}</p>
              <p className="update-comment-author">{c.author}</p>
              <p className="update-comment-timestamp">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Update;
