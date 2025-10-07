import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne, updateOne } from "../../api/data";
import Editor from '@monaco-editor/react';
import "./CodeEditor.css";
import { execJs } from "../../api/execjs";

function CodeEditor() {
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

    const handleRun = async (id) => {
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

    const handleSave = async () => {
        await updateOne({ id, title, content });
        navigate("/"); // Tillbaka till listan
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

            <button
                className="update-btn-code"
                onClick={() => handleSave(id)}
            >
                Save and exit
            </button>
            <Editor 
                height="60vh"
                defaultLanguage="javascript"
                theme="vs-dark"
                defaultValue={content}
                onChange={(value) => setContent(value)}
                options={{
                    padding: { top: 16}
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
