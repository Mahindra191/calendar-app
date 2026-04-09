import { useState, useEffect } from "react";

export default function NotesPanel({ selectedDate, notesMap, onAddNote, onEditNote, onDeleteNote }) {
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const key = selectedDate && selectedDate.toISOString().split("T")[0];
  const notes = notesMap[key] || [];

  useEffect(() => {
    setEditingIndex(null);
    setInput("");
  }, [selectedDate]);

  const handleSave = () => {
    if (editingIndex !== null) {
      onEditNote(editingIndex, input);
      setEditingIndex(null);
    } else {
      onAddNote(input);
    }
    setInput("");
  };

  const startEditing = (index, currentText) => {
    setEditingIndex(index);
    setInput(currentText);
  };

  return (
    <div className="notes-panel">
      <h3>Notes</h3>
      
      <textarea
        className="notes-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={editingIndex !== null ? "Editing your note..." : "Add note..."}
        disabled={!selectedDate}
      />

      <div className="button-group">
        <button
          className="add-note-btn"
          onClick={handleSave}
          disabled={!selectedDate || !input.trim()}
        >
          {editingIndex !== null ? "Save Changes" : "Add Note"}
        </button>

        {editingIndex !== null && (
          <button className="cancel-btn" onClick={() => {setEditingIndex(null); setInput("");}}>
            Cancel
          </button>
        )}
      </div>

      <div className="saved-notes-list">
        <ul>
          {notes.map((n, i) => (
            <li key={i} className="note-item">
              <span className="note-text">{n}</span>
              <div className="note-actions">
                <button 
                  className="edit-icon-btn" 
                  onClick={() => startEditing(i, n)}
                  title="Edit"
                >
                  ✏️
                </button>
                <button 
                  className="delete-icon-btn" 
                  onClick={() => onDeleteNote(i)} // Corrected call
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}