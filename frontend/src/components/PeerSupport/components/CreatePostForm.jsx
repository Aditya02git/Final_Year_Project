import { useState } from "react";
import {
  Send,
  AlertTriangle,
  X,
  ImageIcon,
  Video,
  Loader,
} from "lucide-react";

const availableTags = [
  "anxiety",
  "depression",
  "stress",
  "coping-strategies",
  "therapy",
  "support",
  "encouragement",
  "exams",
  "relationships",
  "sleep",
];

export function CreatePostForm({ onSubmit }) {
  const [newPost, setNewPost] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleMediaSelect = async (e) => {
    const files = Array.from(e.target.files);

    if (mediaFiles.length + files.length > 5) {
      alert("Maximum 5 media files allowed");
      return;
    }

    const newMedia = [];
    let processedCount = 0;

    for (const file of files) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        alert("Only images and videos are allowed");
        processedCount++;
        continue;
      }

      if (file.size > 50 * 1024 * 1024) {
        alert("File size must be less than 50MB");
        processedCount++;
        continue;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        newMedia.push({
          type: isImage ? "image" : "video",
          data: reader.result,
          preview: reader.result,
        });
        processedCount++;

        if (processedCount === files.length) {
          setMediaFiles((prev) => [...prev, ...newMedia]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!newPost.trim()) {
      alert("Please enter some content");
      return;
    }

    setUploading(true);
    try {
      await onSubmit({
        content: newPost,
        tags: selectedTags,
        media: mediaFiles,
      });

      // Reset form
      setNewPost("");
      setSelectedTags([]);
      setMediaFiles([]);
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-2">Share Your Experience</h2>
      <p className="text-sm text-gray-700 mb-4">
        Your story might help someone else feel less alone. All posts are
        anonymous and moderated by AI for safety.
      </p>

      <textarea
        className="w-full border rounded px-3 py-2 min-h-[120px]"
        placeholder="Share your thoughts, experiences, or words of encouragement..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        maxLength={2000}
      />

      <div className="text-xs text-right text-gray-600 mt-1">
        {newPost.length}/2000
      </div>

      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          {mediaFiles.map((media, idx) => (
            <div key={idx} className="relative">
              {media.type === "image" ? (
                <img
                  src={media.preview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={media.preview}
                  className="w-full h-32 rounded-lg"
                />
              )}
              <button
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                onClick={() => removeMedia(idx)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <label className="border px-3 py-2 rounded text-sm cursor-pointer hover:bg-gray-50 flex items-center gap-1">
          <ImageIcon className="h-4 w-4" />
          Add Image
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleMediaSelect}
          />
        </label>
        <label className="border px-3 py-2 rounded text-sm cursor-pointer hover:bg-gray-50 flex items-center gap-1">
          <Video className="h-4 w-4" />
          Add Video
          <input
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            onChange={handleMediaSelect}
          />
        </label>
        <span className="text-xs text-gray-600 self-center">
          Max 5 files, 50MB each
        </span>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium mb-2 block">
          Add tags (optional):
        </label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded text-sm ${
                selectedTags.includes(tag)
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <AlertTriangle className="h-4 w-4" />
          <span>AI moderation active for community safety</span>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          onClick={handleSubmit}
          disabled={!newPost.trim() || uploading}
        >
          {uploading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Send className="h-4 w-4" />
              Share
            </>
          )}
        </button>
      </div>
    </div>
  );
}