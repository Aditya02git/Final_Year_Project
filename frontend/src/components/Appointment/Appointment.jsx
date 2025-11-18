import { useState, useEffect, useCallback } from "react";
import {
  CalendarIcon,
  Filter,
  Loader,
  Plus,
  Users,
  CheckCircle,
  History,
} from "lucide-react";
import axios from "axios";
import { ADMIN_EMAIL } from "../../constants/constants";
import { SimpleCalendar } from "./components/SimpleCalendar";
import { CounselorModal } from "./components/CounselorModal";
import { CounselorTable } from "./components/CounselorTable";
import { CounselorCard } from "./components/CounselorCard";
import { TimeSlots } from "./components/TimeSlots";
import { SessionDetailsForm } from "./components/SessionDetailsForm";
import { StepIndicator } from "./components/StepIndicator";
import { BookingHistory } from "./components/BookingHistory";
import { useNavigate } from "react-router-dom";

export function Appointment({ user }) {
  // Common state
  const [counselors, setCounselors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const navigate = useNavigate();

  // Admin state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editingCounselor, setEditingCounselor] = useState(null);
  const [adminTab, setAdminTab] = useState("counselors");
  const [adminFormData, setAdminFormData] = useState({
    name: "",
    email: "",
    specialties: "",
    availability: [],
    languages: "",
    institution: "",
    profilePic: "/placeholder-user.jpg",
    bio: "",
    qualifications: "",
    experience: 0,
    sessionFee: 0,
  });

  // User booking state
  const [selectedDate, setSelectedDate] = useState();
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [specialties, setSpecialties] = useState([]);
  const [formData, setFormData] = useState({
    reason: "",
    urgency: "",
    previousCounseling: "",
  });
  const [step, setStep] = useState(1);
  const [viewMode, setViewMode] = useState("booking");

  const isAdmin = user?.email === ADMIN_EMAIL;

  // Use useCallback to memoize the fetch functions
  const fetchCounselors = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/counselors");
      setCounselors(response.data);

      // Extract all unique specialties from all counselors
      const allSpecialties = response.data.flatMap(
        (counselor) => counselor.specialties
      );
      const uniqueSpecialties = ["All", ...new Set(allSpecialties)];
      setSpecialties(uniqueSpecialties);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching counselors:", error);
      setError("Failed to load counselors. Please try again.");
      setLoading(false);
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/all",
        {
          withCredentials: true,
        }
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchCounselors();
      if (isAdmin) {
        await fetchAppointments();
      }
    };

    loadData();
  }, [fetchCounselors, fetchAppointments, isAdmin]);

  const filteredCounselors =
    specialtyFilter === "All"
      ? counselors
      : counselors.filter((counselor) =>
          counselor.specialties.includes(specialtyFilter)
        );

  const paidCounselors = filteredCounselors;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdminInputChange = (field, value) => {
    // Convert to number for numeric fields
    if (field === "sessionFee" || field === "experience") {
      value = value === "" ? 0 : Number(value);
    }
    setAdminFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvailabilityToggle = (day) => {
    setAdminFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }));
  };

  const resetAdminForm = () => {
    setAdminFormData({
      name: "",
      email: "",
      specialties: "",
      availability: [],
      languages: "",
      institution: "",
      profilePic: "/placeholder-user.jpg",
      bio: "",
      qualifications: "",
      experience: 0,
      sessionFee: 0,
    });
    setEditingCounselor(null);
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const counselorData = {
        ...adminFormData,
        specialties: adminFormData.specialties
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        languages: adminFormData.languages
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean),
        qualifications: adminFormData.qualifications
          .split(",")
          .map((q) => q.trim())
          .filter(Boolean),
        // Ensure sessionFee and experience are numbers
        sessionFee: Number(adminFormData.sessionFee),
        experience: Number(adminFormData.experience) || 0,
      };

      if (editingCounselor) {
        await axios.put(
          `http://localhost:5000/api/counselors/${editingCounselor._id}`,
          counselorData,
          { withCredentials: true }
        );
        setSuccess("Counselor updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/counselors",
          counselorData,
          {
            withCredentials: true,
          }
        );
        setSuccess("Counselor added successfully!");
      }

      fetchCounselors();
      resetAdminForm();
      setShowAdminModal(false);
      setLoading(false);

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error saving counselor:", error);
      setError(error.response?.data?.message || "Failed to save counselor");
      setLoading(false);
    }
  };

  const handleEdit = (counselor) => {
    setEditingCounselor(counselor);
    setAdminFormData({
      name: counselor.name,
      email: counselor.email,
      specialties: counselor.specialties.join(", "),
      availability: counselor.availability,
      languages: counselor.languages.join(", "),
      institution: counselor.institution,
      profilePic: counselor.profilePic,
      bio: counselor.bio || "",
      qualifications: counselor.qualifications?.join(", ") || "",
      experience: counselor.experience || 0,
      sessionFee: counselor.sessionFee,
    });
    setShowAdminModal(true);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/counselors/${confirmDeleteId}`,
        {
          withCredentials: true,
        }
      );

      setSuccess("Counselor deleted successfully!");
      fetchCounselors();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error deleting counselor:", error);
      setError(error.response?.data?.message || "Failed to delete counselor");
    }

    setConfirmDeleteId(null);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const selectedCounselorData = counselors.find(
        (c) => c._id === selectedCounselor
      );

      if (!selectedCounselorData) {
        setError("Selected counselor not found");
        setLoading(false);
        return;
      }

      const appointmentData = {
        counselorId: selectedCounselor,
        appointmentDate: selectedDate,
        timeSlot: selectedTime,
        reason: formData.reason,
        urgency: formData.urgency,
        previousCounseling: formData.previousCounseling,
        paymentAmount: selectedCounselorData.sessionFee,
      };

      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        appointmentData,
        { withCredentials: true }
      );

      // Navigate to payment page with appointment data
      navigate("/payment", {
        state: {
          appointment: response.data.appointment,
          selectedDate,
          selectedTime,
        },
      });

      setLoading(false);
    } catch (error) {
      console.error("Error creating appointment:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create appointment. Please try again."
      );
      setLoading(false);
    }
  };

  const selectedCounselorData = counselors.find(
    (c) => c._id === selectedCounselor
  );
  const canProceedToStep2 = selectedDate && selectedCounselor && selectedTime;
  const canSubmit =
    canProceedToStep2 &&
    formData.reason &&
    formData.urgency &&
    formData.previousCounseling;

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading user data...</span>
      </div>
    );
  }

  if (loading && counselors.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading counselors...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={() => setError("")} className="btn btn-sm btn-ghost">
            ×
          </button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <CheckCircle className="h-5 w-5" />
          <span>{success}</span>
        </div>
      )}

      {isAdmin && (
        <div className="flex justify-end gap-2">
          <button
            onClick={() =>
              setViewMode(viewMode === "booking" ? "admin" : "booking")
            }
            className="btn btn-outline"
          >
            {viewMode === "booking" ? (
              <>
                <Users className="h-5 w-5 mr-2" />
                Manage Counselors
              </>
            ) : (
              <>
                <CalendarIcon className="h-5 w-5 mr-2" />
                Book Appointment
              </>
            )}
          </button>
        </div>
      )}

      {isAdmin && viewMode === "admin" ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Counselor Management</h1>
              <p className="text-base-content/70">Add and manage counselors</p>
            </div>
            <button
              onClick={() => {
                resetAdminForm();
                setShowAdminModal(true);
              }}
              className="btn btn-primary"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Counselor
            </button>
          </div>

          <div className="tabs tabs-boxed">
            <button
              className={`tab ${adminTab === "counselors" ? "tab-active" : ""}`}
              onClick={() => setAdminTab("counselors")}
            >
              <Users className="h-4 w-4 mr-2" />
              Counselors ({counselors.length})
            </button>
            <button
              className={`tab ${adminTab === "history" ? "tab-active" : ""}`}
              onClick={() => setAdminTab("history")}
            >
              <History className="h-4 w-4 mr-2" />
              Booking History ({appointments.length})
            </button>
          </div>

          {confirmDeleteId && (
            <dialog id="delete_modal" className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Delete Counselor?</h3>
                <p className="py-4">
                  Are you sure you want to delete this counselor?
                </p>

                <div className="modal-action">
                  <button className="btn btn-error" onClick={confirmDelete}>
                    Yes, Delete
                  </button>

                  <button
                    className="btn"
                    onClick={() => setConfirmDeleteId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </dialog>
          )}

          {adminTab === "counselors" ? (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">
                  All Counselors ({counselors.length})
                </h2>
                <CounselorTable
                  counselors={counselors}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ) : (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">
                  All Bookings ({appointments.length})
                </h2>
                <BookingHistory appointments={appointments} loading={loading} />
              </div>
            </div>
          )}

          <CounselorModal
            showModal={showAdminModal}
            onClose={() => {
              setShowAdminModal(false);
              resetAdminForm();
            }}
            formData={adminFormData}
            onInputChange={handleAdminInputChange}
            onAvailabilityToggle={handleAvailabilityToggle}
            onSubmit={handleAdminSubmit}
            loading={loading}
            editingCounselor={editingCounselor}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <StepIndicator currentStep={step} />

          {step === 1 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">
                      <CalendarIcon className="h-5 w-5" />
                      Select Date
                    </h2>
                    <SimpleCalendar
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                    />
                  </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">
                      <Filter className="h-5 w-5" />
                      Filter by Specialty
                    </h2>
                    <select
                      className="select select-bordered w-full"
                      value={specialtyFilter}
                      onChange={(e) => setSpecialtyFilter(e.target.value)}
                    >
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {paidCounselors.length > 0 && (
                <div className="card bg-base-100 shadow-xl border-2 border-info">
                  <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 bg-info rounded-full"></div>
                        <div>
                          <h2 className="card-title text-info">
                            Available Counselors
                          </h2>
                          <p className="text-sm opacity-70">
                            Session fees vary by counselor
                          </p>
                        </div>
                      </div>
                      <div className="badge badge-info badge-lg">
                        {paidCounselors.length} available
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paidCounselors.map((counselor) => (
                        <CounselorCard
                          key={counselor._id}
                          counselor={counselor}
                          isSelected={selectedCounselor === counselor._id}
                          onSelect={setSelectedCounselor}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedCounselor && (
                <TimeSlots
                  counselorName={selectedCounselorData?.name}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                />
              )}
            </div>
          )}

          {step === 2 && (
            <SessionDetailsForm
              user={user}
              formData={formData}
              onInputChange={handleInputChange}
              sessionFee={selectedCounselorData?.sessionFee}
            />
          )}

          <div className="flex justify-between">
            <button
              className="btn btn-outline"
              onClick={() => setStep(1)}
              disabled={step === 1}
            >
              Previous
            </button>
            <div className="flex gap-2">
              {step === 1 && (
                <button
                  className="btn btn-primary"
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                >
                  Continue to Session Details
                </button>
              )}
              {step === 2 && (
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!canSubmit || loading}
                >
                  {loading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin mr-2" />{" "}
                      Processing...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
