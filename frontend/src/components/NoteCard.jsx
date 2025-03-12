const NoteCard = ({ note }) => {
    return (
      <div className="border p-4 rounded shadow-md mb-4 dark:bg-gray-800 dark:text-white">
        <h3 className="font-bold text-lg">{note.title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{note.content}</p>
        {note.summary && (
          <p className="mt-2 italic text-gray-500 dark:text-gray-400">Summary: {note.summary}</p>
        )}
      </div>
    );
  };
  
  export default NoteCard;
  