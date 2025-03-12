//dotenv: Loads database credentials from .env file.
require("dotenv").config();
const express = require("express");
// cors: Allows the frontend to access the backend.
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL Connection
//Pool manages database connections.
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "notes_db",
  password: process.env.DB_PASSWORD || "ashokiran",
  port: process.env.DB_PORT || 5432,
});


// Ensure table exists
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        summary TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Table check complete");
  } catch (err) {
    console.error("❌ Error ensuring table exists:", err);
  }
})();

// Get all notes
app.get("/notes", async (req, res) => {
  try {
    // DESC meaning aranging it in descending order 
    const result = await pool.query("SELECT * FROM notes ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching notes:", err);
    res.status(500).json({ error: "Error fetching notes" });
  }
});

// Free AI Summarization API
async function summarizeText(content) {
  try {
    const response = await fetch("https://api.text-summarization.com/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: content, num_sentences: 3 }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Summarization API Response:", data);
    return data.summary || "Summarization failed";
  } catch (err) {
    console.error("❌ AI Summarization Failed:", err);
    return "AI summarization failed, please try again later.";
  }
}

// Create a new note with AI-powered summarization
app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    // Generate summary using Free API
    const summary = await summarizeText(content);

    const result = await pool.query(
      "INSERT INTO notes (title, content, summary) VALUES ($1, $2, $3) RETURNING *",
      [title, content, summary]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error creating note:", err);
    res.status(500).json({ error: "Error creating note" });
  }
});

// Delete a note by ID
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid note ID" });
    }

    const result = await pool.query("DELETE FROM notes WHERE id=$1 RETURNING *", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "✅ Note deleted", deletedNote: result.rows[0] });
  } catch (err) {
    console.error("❌ Error deleting note:", err);
    res.status(500).json({ error: "Error deleting note" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
