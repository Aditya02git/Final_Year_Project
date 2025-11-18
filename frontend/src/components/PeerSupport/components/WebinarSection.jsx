import { useState } from "react";
import {
  Plus,
  X,
  Calendar,
  Clock,
  Users,
  ExternalLink,
  Loader,
  Trash2,
} from "lucide-react";

const webinarTraits = [
  "stress",
  "anxiety",
  "depression",
  "mindfulness",
  "ocd",
  "sleep",
  "relationships",
  "coping-strategies",
];

export function WebinarSection({
  webinars,
  currentUser,
  isAdmin,
  loading,
  onCreateWebinar,
  onJoinWebinar,
  onDeleteWebinar,
}) {
  const [showWebinarForm, setShowWebinarForm] = useState(false);
  const [webinarForm, setWebinarForm] = useState({
    title: "",
    description: "",
    host: "",
    trait: "",
    date: "",
    time: "",
    duration: "",
    meetingLink: "",
  });

  const handleWebinarFormChange = (e) => {
    const { name, value } = e.target;
    setWebinarForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateWebinar = async () => {
    if (
      !webinarForm.title ||
      !webinarForm.description ||
      !webinarForm.host ||
      !webinarForm.trait ||
      !webinarForm.date ||
      !webinarForm.time ||
      !webinarForm.duration ||
      !webinarForm.meetingLink
    ) {
      alert("Please fill in all fields");
      return;
    }

    await onCreateWebinar(webinarForm);
    setWebinarForm({
      title: "",
      description: "",
      host: "",
      trait: "",
      date: "",
      time: "",
      duration: "",
      meetingLink: "",
    });
    setShowWebinarForm(false);
  };

  const formatWebinarDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", day: "2-digit", month: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="space-y-4">
      {isAdmin && (
        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            onClick={() => setShowWebinarForm(!showWebinarForm)}
          >
            <Plus className="h-4 w-4" />
            Create Webinar
          </button>
        </div>
      )}

      {showWebinarForm && isAdmin && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create New Webinar</h2>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowWebinarForm(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={webinarForm.title}
                onChange={handleWebinarFormChange}
                placeholder="Managing Exam Stress 101"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={webinarForm.description}
                onChange={handleWebinarFormChange}
                placeholder="Practical breathing, grounding, and time-planning strategies for stressful weeks."
                className="w-full border rounded px-3 py-2"
                rows="3"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Host Name
                </label>
                <input
                  type="text"
                  name="host"
                  value={webinarForm.host}
                  onChange={handleWebinarFormChange}
                  placeholder="Dr. John Smith"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Trait/Topic
                </label>
                <select
                  name="trait"
                  value={webinarForm.trait}
                  onChange={handleWebinarFormChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select a topic</option>
                  {webinarTraits.map((trait) => (
                    <option key={trait} value={trait}>
                      {trait}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={webinarForm.date}
                  onChange={handleWebinarFormChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={webinarForm.time}
                  onChange={handleWebinarFormChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={webinarForm.duration}
                  onChange={handleWebinarFormChange}
                  placeholder="60 mins"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Meeting Link
              </label>
              <input
                type="url"
                name="meetingLink"
                value={webinarForm.meetingLink}
                onChange={handleWebinarFormChange}
                placeholder="https://zoom.us/j/..."
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="border px-4 py-2 rounded hover:bg-gray-50"
                onClick={() => setShowWebinarForm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleCreateWebinar}
              >
                Create Webinar
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : webinars.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <Calendar className="h-16 w-16 mx-auto mb-4" />
          <p>No webinars scheduled yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {webinars.map((webinar) => (
            <div
              key={webinar._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {webinar.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    {webinar.description}
                  </p>
                </div>
                {isAdmin && (
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => onDeleteWebinar(webinar._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Trait:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {webinar.trait}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Host:</span>
                  <span>{webinar.host}</span>
                </div>
              </div>

              <div className="border-t my-4"></div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatWebinarDate(webinar.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{webinar.time}</span>
                  </div>
                </div>
                <div className="text-gray-600">{webinar.duration}</div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{webinar.attendees?.length || 0} registered</span>
                </div>

                {webinar.attendees?.includes(currentUser?._id) ? (
                  <a
                    href={webinar.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 flex items-center gap-1"
                  >
                    Join Webinar
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <button
                    className="border px-4 py-2 rounded text-sm hover:bg-gray-50"
                    onClick={() => onJoinWebinar(webinar._id)}
                  >
                    Register
                  </button>
                )}
              </div>

              {webinar.attendees?.includes(currentUser?._id) ? (
                <div className="mt-2 text-center">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    Already Registered
                  </span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}