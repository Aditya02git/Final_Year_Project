export const StepIndicator = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 1 ? "bg-primary text-primary-content" : "bg-base-300"
          }`}
        >
          1
        </div>
        <span className="text-sm font-medium">Select Date & Counselor</span>
      </div>
      <div className="w-8 h-px bg-base-300" />
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 2 ? "bg-primary text-primary-content" : "bg-base-300"
          }`}
        >
          2
        </div>
        <span className="text-sm font-medium">Session Details</span>
      </div>
    </div>
  );
};