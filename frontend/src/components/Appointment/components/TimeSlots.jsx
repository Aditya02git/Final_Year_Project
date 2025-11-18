import { Clock } from "lucide-react";
import { format } from "date-fns";
import { timeSlots } from "../../../constants/constants";

export const TimeSlots = ({
  counselorName,
  selectedDate,
  selectedTime,
  onTimeSelect,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <Clock className="h-5 w-5" />
          Available Times
        </h2>
        <p className="text-sm opacity-70 mb-4">
          Select a time slot for your appointment with {counselorName}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot.time}
              className={`btn ${
                selectedTime === slot.time ? "btn-primary" : "btn-outline"
              }`}
              disabled={!slot.available}
              onClick={() => onTimeSelect(slot.time)}
            >
              {slot.time}
            </button>
          ))}
        </div>
        {selectedTime && (
          <div className="alert mt-4">
            <div>
              <strong>Selected:</strong> {selectedTime} on{" "}
              {selectedDate && format(selectedDate, "MMMM d, yyyy")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
