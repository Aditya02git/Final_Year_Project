import { useState } from "react";

export const SimpleCalendar = ({ selected, onSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);
    
    if (clickedDate >= today && clickedDate.getDay() !== 0) {
      onSelect(clickedDate);
    }
  };

  const isDisabled = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    const isPastDate = date < today;
    const isSunday = date.getDay() === 0;
    return isPastDate || isSunday;
  };

  const isSelected = (day) => {
    if (!selected) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.toDateString() === selected.toDateString();
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="btn btn-sm btn-ghost">
          ←
        </button>
        <h3 className="font-semibold">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h3>
        <button onClick={nextMonth} className="btn btn-sm btn-ghost">
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500 p-2">
            {day}
          </div>
        ))}
        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={isDisabled(day)}
              className={`p-2 text-sm rounded-lg ${
                isSelected(day)
                  ? "bg-primary text-white"
                  : isDisabled(day)
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-base-200"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};