import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getDaysInMonth } from "../utils/calendar";
import DayCell from "./DayCell";
import NotesPanel from "./NotesPanel";
import "./Calendar.css"; // Ensure you use the updated CSS below

export default function Calendar() {
  const today = new Date();
  
  // 1. Initialize from LocalStorage immediately (for persistence)
  const [notesMap, setNotesMap] = useState(() => {
    const saved = localStorage.getItem("notes-map");
    try {
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentNote, setCurrentNote] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 2. Persist to LocalStorage whenever notesMap changes
  useEffect(() => {
    localStorage.setItem("notes-map", JSON.stringify(notesMap));
  }, [notesMap]);

  const days = getDaysInMonth(currentMonth);

  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };
  const handleEditNote = (index, newValue) => {
  if (!selectedDate || !newValue.trim()) return;
  const key = selectedDate.toISOString().split("T")[0];

  setNotesMap(prev => {
    const newMap = { ...prev };
    if (newMap[key]) {
      const updatedArray = [...newMap[key]];
      updatedArray[index] = newValue;
      newMap[key] = updatedArray;
    }
    return newMap;
  });
};

const handleDeleteNote = (index) => {
  if (!selectedDate) return;
  const key = selectedDate.toISOString().split("T")[0];

  setNotesMap(prev => {
    const newMap = { ...prev };
    if (newMap[key]) {
      // Filter out the note at that index
      const updatedArray = newMap[key].filter((_, i) => i !== index);
      
      if (updatedArray.length === 0) {
        delete newMap[key];
      } else {
        newMap[key] = updatedArray;
      }
    }
    return newMap;
  });
};
  const handleClick = (date) => {
    // Selection logic (unchanged)
    if (!startDate || endDate) {
      setStartDate(date);
      setEndDate(null);
      setSelectedDate(date);
    } else {
      if (date >= startDate) {
        setEndDate(date);
        setSelectedDate(date);
      } else {
        setStartDate(date);
        setSelectedDate(date);
      }
    }
    const key = date.toISOString().split("T")[0];
    setCurrentNote(notesMap[key] || "");
  };

  const handleNoteChange = (value) => {
    // Note saving logic (unchanged)
    if (!value.trim()) return;
    const newNotes = { ...notesMap };
    
    if (startDate && !endDate) {
      const key = startDate.toISOString().split("T")[0];
      newNotes[key] = [...(newNotes[key] || []), value];
    } else if (startDate && endDate) {
      let current = new Date(startDate);
      while (current <= endDate) {
        const key = current.toISOString().split("T")[0];
        newNotes[key] = [...(newNotes[key] || []), value];
        current.setDate(current.getDate() + 1);
      }
    }
    setNotesMap(newNotes);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full">
      {/* A. MONTH NAVIGATION (Header) */}
      <div className="month-nav">
        <button className="nav-btn-circle" onClick={prevMonth}>◀</button>
        <h2 className="month-title">{format(currentMonth, "MMMM yyyy")}</h2>
        <button className="nav-btn-circle" onClick={nextMonth}>▶</button>
      </div>

      {/* ========================================================= */}
      {/* NEW: CALENDAR HERO IMAGE SECTION (Inserted Here)          */}
      {/* ========================================================= */}
      <div className="calendar-hero-banner">
        <img
          src="calendar.avif" // You can change this URL
          alt="Calendar Landscape"
          className="hero-image"
        />
      </div>
      {/* ========================================================= */}

      {/* B. MAIN CONTENT (Flex Container) */}
      <div className="flex flex-col md:flex-row p-4 pt-0">
        
        {/* CALENDAR GRID */}
        <div className="grid grid-cols-7 gap-2 flex-1">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} className="text-center font-semibold text-gray-500">{d}</div>
          ))}

          {days.map((day, i) => {
            const key = day.toISOString().split("T")[0];
            return (
              <DayCell
                key={i}
                day={day}
                onClick={handleClick}
                isStart={startDate?.toDateString() === day.toDateString()}
                isEnd={endDate?.toDateString() === day.toDateString()}
                isInRange={startDate && endDate && day >= startDate && day <= endDate}
                isSelected={selectedDate?.toDateString() === day.toDateString()}
                hasNote={!!notesMap[key]}
              />
            );
          })}
        </div>

        {/* NOTES PANEL */}
        {/* Inside Calendar.jsx - near the bottom */}
<NotesPanel
  selectedDate={selectedDate}
  notesMap={notesMap}
  onAddNote={handleNoteChange}
  onEditNote={handleEditNote}    // Add this
  onDeleteNote={handleDeleteNote} // Add this
/>
      </div>
    </div>
  );
}