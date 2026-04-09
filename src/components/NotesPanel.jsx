import { useState } from "react";

export default function NotesPanel({ selectedDate, notesMap, onAddNote }) {
  const [input, setInput] = useState("");

  const key =
    selectedDate && selectedDate.toISOString().split("T")[0];

  const notes = notesMap[key] || [];

  return (
    <div className="notes">
      <h3>Notes</h3>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add note..."
      />

      <button
        onClick={() => {
          onAddNote(input);
          setInput("");
        }}
      >
        Add
      </button>

      <ul>
        {notes.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}