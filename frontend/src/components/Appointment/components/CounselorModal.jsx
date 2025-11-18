import { useState } from "react";
import { Loader, Upload, X } from "lucide-react";
import { institutionsList, daysOfWeek } from "../../../constants/constants";

export const CounselorModal = ({
  showModal,
  onClose,
  formData,
  onInputChange,
  onAvailabilityToggle,
  onSubmit,
  loading,
  editingCounselor,
}) => {
  const [imagePreview, setImagePreview] = useState(formData.profilePic);
  const [uploadMethod, setUploadMethod] = useState("url"); // "url" or "upload"

  if (!showModal) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        onInputChange("profilePic", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview("/placeholder-user.jpg");
    onInputChange("profilePic", "/placeholder-user.jpg");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title">
              {editingCounselor ? "Edit Counselor" : "Add New Counselor"}
            </h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Name <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.name}
                  onChange={(e) => onInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Email <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={formData.email}
                  onChange={(e) => onInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">
                  Institution <span className="text-red-600">*</span>
                </span>
              </label>
              <select
                className="select select-bordered"
                value={formData.institution}
                onChange={(e) => onInputChange("institution", e.target.value)}
                required
              >
                <option value="">Select Institution</option>
                {institutionsList.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">
                  Specialties <span className="text-red-600">*</span>{" "}
                  (comma-separated)
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Anxiety, Depression, Academic Stress"
                value={formData.specialties}
                onChange={(e) => onInputChange("specialties", e.target.value)}
                required
              />
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">
                  Languages <span className="text-red-600">*</span>{" "}
                  (comma-separated)
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="English, Hindi, Bengali"
                value={formData.languages}
                onChange={(e) => onInputChange("languages", e.target.value)}
                required
              />
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">
                  Availability <span className="text-red-600">*</span>
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => onAvailabilityToggle(day)}
                    className={`btn btn-sm ${
                      formData.availability.includes(day)
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-20 w-full"
                placeholder="Brief professional bio"
                value={formData.bio}
                onChange={(e) => onInputChange("bio", e.target.value)}
              />
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">
                  Qualifications (comma-separated)
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="PhD Psychology, Licensed Counselor"
                value={formData.qualifications}
                onChange={(e) =>
                  onInputChange("qualifications", e.target.value)
                }
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Experience (years)</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  min="0"
                  value={formData.experience}
                  onChange={(e) => onInputChange("experience", e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Session Fee (₹) <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  min="0"
                  value={formData.sessionFee}
                  onChange={(e) => onInputChange("sessionFee", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Profile Picture Section */}
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">Profile Picture</span>
              </label>

              {/* Upload Method Toggle */}
              <div className="tabs tabs-boxed mb-3">
                <button
                  type="button"
                  className={`tab ${
                    uploadMethod === "upload" ? "tab-active" : ""
                  }`}
                  onClick={() => setUploadMethod("upload")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </button>
                <button
                  type="button"
                  className={`tab ${
                    uploadMethod === "url" ? "tab-active" : ""
                  }`}
                  onClick={() => setUploadMethod("url")}
                >
                  URL
                </button>
              </div>

              {uploadMethod === "upload" ? (
                <div className="space-y-3">
                  {/* Image Preview */}
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={imagePreview || "/placeholder-user.jpg"}
                          alt="Preview"
                        />
                      </div>
                    </div>
                    {imagePreview &&
                      imagePreview !== "/placeholder-user.jpg" && (
                        <button
                          type="button"
                          onClick={removeImage}
                          className="btn btn-ghost btn-sm btn-circle"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                  </div>

                  {/* File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input file-input-bordered w-full"
                  />
                  <p className="text-xs opacity-70">
                    Supported formats: JPG, PNG, GIF (Max size: 5MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="https://example.com/image.jpg"
                    value={
                      formData.profilePic === "/placeholder-user.jpg"
                        ? ""
                        : formData.profilePic
                    }
                    onChange={(e) => {
                      const url = e.target.value || "/placeholder-user.jpg";
                      onInputChange("profilePic", url);
                      setImagePreview(url);
                    }}
                  />
                  {imagePreview && (
                    <div className="avatar">
                      <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          onError={(e) => {
                            e.target.src = "/placeholder-user.jpg";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2 justify-end mt-6">
              <button type="button" onClick={onClose} className="btn btn-ghost">
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin mr-2" /> Saving...
                  </>
                ) : editingCounselor ? (
                  "Update Counselor"
                ) : (
                  "Add Counselor"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
