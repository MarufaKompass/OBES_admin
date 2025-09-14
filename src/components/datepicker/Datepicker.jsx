// CustomDatePicker.jsx
import dayjs from "dayjs";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
export default function DatePicker({ value, onChange }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(dayjs());
  const selectedDate = value ? dayjs(value) : null;

  const daysInMonth = viewDate.daysInMonth();
  const startDay = viewDate.startOf("month").day();

  const handleDateClick = (day) => {
    const newDate = viewDate.date(day);
    onChange(newDate.format("YYYY-MM-DD"));
    setShowCalendar(false);
  };

  const handlePrevMonth = () => setViewDate(viewDate.subtract(1, "month"));
  const handleNextMonth = () => setViewDate(viewDate.add(1, "month"));

  const handleYearChange = (e) => {
    setViewDate(viewDate.year(parseInt(e.target.value)));
  };

  return (
    <div className="relative ">
      <input
        readOnly
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-transparent"
        value={selectedDate?.format("YYYY-MM-DD")}
        placeholder="choose date"
        onClick={() => setShowCalendar(!showCalendar)}
      />

      {showCalendar && (
        <div className="absolute top-full mt-2 left-0 w-full bg-white border rounded-md shadow-md p-4 z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handlePrevMonth}
              className="px-2 text-gray-600 hover:text-black"
            >
              <ChevronsLeft />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{viewDate.format("MMMM")}</span>
              <select
                className="border rounded px-1 py-0.5 text-sm"
                value={viewDate.year()}
                onChange={handleYearChange}
              >
                {Array.from({ length: 100 }, (_, i) => {
                  const year = dayjs().year() - i;
                  return (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              onClick={handleNextMonth}
              className="px-2 text-gray-600 hover:text-black"
            >
              {" "}
              <ChevronsRight />
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 text-center text-sm">
            {[...Array(startDay)].map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const date = viewDate.date(day);
              const isSelected = selectedDate?.isSame(date, "day");

              return (
                <div
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`p-1 rounded cursor-pointer hover:bg-blue-500 hover:text-white ${
                    isSelected ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="absolute top-3 right-2">
        {showCalendar ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </div>
    </div>
  );
}
