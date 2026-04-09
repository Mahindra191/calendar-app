import { format } from "date-fns";

export default function DayCell({
  day,
  onClick,
  isStart,
  isEnd,
  isInRange,
  isSelected,
  hasNote
}) {
  return (
    <div
      onClick={() => onClick(day)}
      className={`p-3 text-center cursor-pointer rounded-lg transition relative
      ${isStart ? "bg-blue-600 text-white" : ""}
      ${isEnd ? "bg-blue-800 text-white" : ""}
      ${isInRange ? "bg-blue-200" : ""}
      ${isSelected ? "bg-blue-100 ring-2 ring-blue-400" : ""} 
      hover:bg-blue-100`}
    >
      {format(day, "d")}

      {/* The Red Dot */}
      {hasNote && <div className="dot"></div>}
    </div>
  );
}