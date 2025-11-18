import { format } from "date-fns";
import { Calendar, Clock, User, Mail, FileText } from "lucide-react";

export const BookingHistory = ({ appointments, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-base-content/70">No appointments found</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "badge-warning",
      confirmed: "badge-success",
      completed: "badge-info",
      cancelled: "badge-error",
    };
    return statusColors[status] || "badge-ghost";
  };

  const getUrgencyBadge = (urgency) => {
    const urgencyColors = {
      low: "badge-success",
      medium: "badge-warning",
      high: "badge-error",
      crisis: "badge-error",
    };
    return urgencyColors[urgency] || "badge-ghost";
  };

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment._id} className="card bg-base-100 border border-base-300">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={appointment.counselorId?.profilePic || "/placeholder-user.jpg"}
                      alt={appointment.counselorId?.name}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">
                      {appointment.counselorId?.name || "Unknown Counselor"}
                    </h3>
                    <div className={`badge ${getStatusBadge(appointment.status)}`}>
                      {appointment.status}
                    </div>
                    <div className={`badge badge-sm ${getUrgencyBadge(appointment.urgency)}`}>
                      {appointment.urgency} urgency
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-base-content/70" />
                        <span className="font-medium">Student:</span>
                        <span>{appointment.userId?.fullName || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-base-content/70" />
                        <span>{appointment.userId?.email || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-base-content/70" />
                        <span className="font-medium">Date:</span>
                        <span>
                          {appointment.appointmentDate
                            ? format(new Date(appointment.appointmentDate), "MMM dd, yyyy")
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-base-content/70" />
                        <span className="font-medium">Time:</span>
                        <span>{appointment.timeSlot || "N/A"}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-base-content/70 mt-0.5" />
                        <div>
                          <span className="font-medium">Reason:</span>
                          <p className="text-base-content/70 mt-1">{appointment.reason || "Not specified"}</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Previous Counseling:</span>
                        <span className="ml-2 text-base-content/70">
                          {appointment.previousCounseling || "N/A"}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Amount Paid:</span>
                        <span className="ml-2 font-bold text-success">
                          ₹{appointment.paymentAmount !== undefined && appointment.paymentAmount !== null 
                            ? appointment.paymentAmount 
                            : (appointment.counselorId?.sessionFee || 500)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-base-content/50">
                    Booked on: {format(new Date(appointment.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};