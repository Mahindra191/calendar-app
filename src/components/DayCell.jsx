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
      className={`p-3 text-center cursor-pointer rounded-lg transition
      ${isStart ? "bg-blue-600 text-white" : ""}
      ${isEnd ? "bg-blue-800 text-white" : ""}
      ${isInRange ? "bg-blue-200" : ""}
      ${isSelected ? "selected" : ""}
      ${hasNote ? "has-note" : ""}
      hover:bg-blue-100`}
    >
      {format(day, "d")}
      {hasNote && <div className="dot"></div>}
    </div>
  );
}