import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import Navbar from "./components/Navbar";
import DarkModeToggle from "./components/DarkModeToggle";
import "./index.css";

function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Router>
        <Navbar />
        <DarkModeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
