import { CheckCircle, Shield } from "lucide-react";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { AppWrapper } from "../../../layouts/AppWrapper";

export const ConfirmationScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment, selectedDate, selectedTime } = location.state || {};

  // Redirect if no appointment data
  if (!appointment) {
    return (
      <div className="card max-w-2xl mx-auto bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <p className="text-error mb-4">No appointment data found</p>
          <button onClick={() => navigate("/appointment")} className="btn btn-primary">
            Book an Appointment
          </button>
        </div>
      </div>
    );
  }

  // Get the payment amount from the appointment or fallback to counselor's sessionFee
  const paymentAmount = appointment.paymentAmount !== undefined && appointment.paymentAmount !== null
    ? appointment.paymentAmount
    : (appointment.counselorId?.sessionFee);

  return (
    <AppWrapper>
        <div className="card max-w-2xl mx-auto bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
            <CheckCircle className="h-16 w-16 text-success mb-4" />
            <h2 className="card-title text-2xl font-bold mb-4">Appointment Confirmed</h2>
            <div className="space-y-2 text-base-content/70 mb-6">
            <p>
                <strong>Date:</strong> {selectedDate && format(new Date(selectedDate), "MMMM d, yyyy")}
            </p>
            <p>
                <strong>Time:</strong> {selectedTime}
            </p>
            <p>
                <strong>Counselor:</strong> {appointment.counselorId?.name}
            </p>
            <p>
                <strong>Institution:</strong> {appointment.counselorId?.institution}
            </p>
            <p>
                <strong>Session Type:</strong>{" "}
                <span className="text-info">Paid Session</span>
            </p>
            <p>
                <strong>Amount:</strong> ₹{paymentAmount}
            </p>
            </div>
            <div className="alert alert-info mb-6">
            <Shield className="h-4 w-4" />
            <div className="text-left">
                <h3 className="font-bold">Confidentiality Notice</h3>
                <div className="text-sm">
                Your appointment and all discussions are completely confidential. You'll
                receive a confirmation email with session details and preparation tips.
                </div>
            </div>
            </div>
            <button onClick={() => navigate("/appointments")} className="btn btn-outline">
            Book Another Appointment
            </button>
        </div>
        </div>
    </AppWrapper>
  );
};