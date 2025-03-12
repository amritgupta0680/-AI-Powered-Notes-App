import { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/notes").then((res) => setNotes(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">My Notes</h1>
      {notes.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No notes yet. Create one!</p>
      ) : (
        notes.map((note) => <NoteCard key={note.id} note={note} />)
      )}
    </div>
  );
};

export default Home;
