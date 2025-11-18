import { Shield } from "lucide-react";

export const SessionDetailsForm = ({ user, formData, onInputChange, sessionFee }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Session Details</h2>
        <p className="text-sm opacity-70 mb-4">
          Booking for:{" "}
          <span className="font-bold">
            {user.fullName} ({user.email})
          </span>
        </p>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                How urgent is your need for support?{" "}
                <span className="text-red-600">*</span>
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.urgency}
              onChange={(e) => onInputChange("urgency", e.target.value)}
            >
              <option value="">Select urgency level</option>
              <option value="low">Low - General support and guidance</option>
              <option value="medium">Medium - Noticeable impact on daily life</option>
              <option value="high">High - Significant distress, need support soon</option>
              <option value="crisis">Crisis - Immediate help needed</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Have you received counseling before?{" "}
                <span className="text-red-600">*</span>
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.previousCounseling}
              onChange={(e) => onInputChange("previousCounseling", e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="no">No, this is my first time</option>
              <option value="yes-helpful">Yes, and it was helpful</option>
              <option value="yes-mixed">Yes, but it was mixed results</option>
              <option value="yes-unhelpful">Yes, but it wasn't helpful</option>
            </select>
          </div>

          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text">
                What brings you to counseling today?{" "}
                <span className="text-red-600">*</span>
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Please share what you'd like to work on or discuss. This helps your counselor prepare for your session."
              value={formData.reason}
              onChange={(e) => onInputChange("reason", e.target.value)}
            />
          </div>

          <div className="alert alert-info">
            <div>
              <div className="text-xl mb-2">💳</div>
              <h4 className="font-bold">Payment Required</h4>
              <p className="text-sm">
                A payment of ₹{sessionFee} is required to book this session.
              </p>
              <div className="bg-base-100 p-3 rounded mt-2">
                <div className="flex justify-between">
                  <span>Session Fee:</span>
                  <span className="text-lg font-bold">₹{sessionFee}</span>
                </div>
                <div className="flex justify-between text-xs opacity-70">
                  <span>Payment Method:</span>
                  <span>Online Payment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="alert">
            <Shield className="h-5 w-5" />
            <div>
              <h4 className="font-bold">Privacy & Confidentiality</h4>
              <p className="text-sm">
                Your information is protected by confidentiality policies. Sessions
                are private and secure, with exceptions only for imminent safety
                concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};