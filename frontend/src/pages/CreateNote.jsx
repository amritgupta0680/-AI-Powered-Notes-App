import { useState } from "react";
import axios from "axios";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/summarize", { content });
      setSummary(res.data.summary);
    } catch (error) {
      setSummary("Summarization failed. Try again later.");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/notes", { title, content });
      alert("Note saved successfully!");
      setTitle("");
      setContent("");
      setSummary("");
    } catch (error) {
      alert("Error saving note.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Create a Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:text-white"
      />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 h-40 border rounded dark:bg-gray-800 dark:text-white"
      />
      <button onClick={handleSummarize} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {summary && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
          <h3 className="font-semibold">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Save Note
      </button>
    </div>
  );
};

export default CreateNote;
