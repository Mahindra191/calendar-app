import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getDaysInMonth, isBetween } from "../utils/calendar";
import DayCell from "./DayCell";
import NotesPanel from "./NotesPanel";
import "./Calendar.css";

export default function Calendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [notesMap, setNotesMap] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notes, setNotes] = useState("");
//   const hasNote = notesMap[day.toISOString().split("T")[0]];
//   {hasNote && <div className="dot"></div>}
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
  // Load notes
  useEffect(() => {
  const saved = localStorage.getItem("notes-map");
  if (saved) {
    try {
      setNotesMap(JSON.parse(saved));
    } catch {
      setNotesMap({});
    }
  }
}, []);
useEffect(() => {
  localStorage.setItem("notes-map", JSON.stringify(notesMap));
}, [notesMap]);

  

  
  const handleClick = (date) => {
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
  if (value.trim() === "") return;

  const newNotes = { ...notesMap };

  // 👉 CASE 1: Only single date selected
  if (startDate && !endDate) {
    const key = startDate.toISOString().split("T")[0];

    if (!newNotes[key]) newNotes[key] = [];

    newNotes[key].push(value);
  }

  // 👉 CASE 2: Range selected
  else if (startDate && endDate) {
    let current = new Date(startDate);

    while (current <= endDate) {
      const key = current.toISOString().split("T")[0];

      if (!newNotes[key]) newNotes[key] = [];

      newNotes[key].push(value);

      current.setDate(current.getDate() + 1);
    }
  }

  setNotesMap(newNotes);
};

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full">
      <div className="month-nav">
  <button className="nav-btn" onClick={prevMonth}>◀</button>
  
  <h2 className="month-title">
    {format(currentMonth, "MMMM yyyy")}
  </h2>
  
  <button className="nav-btn" onClick={nextMonth}>▶</button>
</div>
      {/* HERO SECTION */}
      <div className="relative h-48 md:h-64">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-4 py-2 rounded-tr-xl">
          {format(currentMonth, "MMMM yyyy")}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        
        {/* CALENDAR GRID */}
        <div className="p-4 grid grid-cols-7 gap-2 flex-1">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} className="text-center font-semibold text-gray-500">
              {d}
            </div>
          ))}

          {days.map((day, i) => {
            const key = day.toISOString().split("T")[0];
const hasNote = notesMap[key];
  const isStart =
    startDate &&
    day.toDateString() === startDate.toDateString();

  const isEnd =
    endDate &&
    day.toDateString() === endDate.toDateString();

  const inRange =
    startDate &&
    endDate &&
    day >= startDate &&
    day <= endDate;

  const isSelected =
    selectedDate &&
    day.toDateString() === selectedDate.toDateString();

  return (
    <DayCell
      key={i}
      day={day}
      onClick={handleClick}
      isStart={isStart}
      isEnd={isEnd}
      isInRange={inRange}
      isSelected={isSelected}
      hasNote={hasNote}
    />
  );
})}
        </div>

        {/* NOTES */}
        <NotesPanel
  selectedDate={selectedDate}
  notesMap={notesMap}
  onAddNote={handleNoteChange}
/>
      </div>
    </div>
  );
}