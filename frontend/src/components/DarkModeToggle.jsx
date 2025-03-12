import { useState, useEffect } from "react";


// localStorage.getItem() is a JavaScript method that retrieves data stored in the browser's localStorage.

// localStorage.getItem("darkMode") fetches the saved dark mode state.
// If the saved value is "true", darkMode is set to true (dark mode ON).
// If "false" or null, darkMode is set to false (light mode ON).


const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded transition"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
