import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Trash2,
} from "lucide-react";
import { ADMIN_EMAIL } from "../../../constants/constants";

export function PostCard({ post, currentUser, onDelete, onToggleLike, onReply }) {
  const [replyingTo, setReplyingTo] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(post._id, replyContent);
      setReplyContent("");
      setReplyingTo(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {post.author?.profilePic ? (
              <img
                src={post.author.profilePic}
                alt={post.author.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium">
                {post.author?.fullName?.charAt(0) || "?"}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">
                {post.author?.fullName || "Anonymous"}
              </span>
              {post.author?.email === ADMIN_EMAIL && (
                <span className="bg-amber-300 rounded-lg px-2 text-[12px]">
                  Admin
                </span>
              )}
            </div>
            <span className="text-xs text-gray-600">
              {formatTimestamp(post.createdAt)}
            </span>
          </div>
        </div>
        {currentUser && post.author?._id === currentUser._id && (
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => onDelete(post._id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="text-sm leading-relaxed mt-4">{post.content}</p>

      {post.media && post.media.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {post.media.map((media, idx) => (
            <div key={idx} className="relative">
              {media.type === "image" ? (
                <img
                  src={media.url}
                  alt="Post media"
                  className="rounded-lg w-full h-full object-cover"
                />
              ) : (
                <video
                  src={media.url}
                  controls
                  className="rounded-lg w-full h-48"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
        <button
          className="flex items-center gap-1 hover:text-red-600 transition-colors"
          onClick={() => onToggleLike(post._id)}
        >
          <Heart className="h-4 w-4" />
          <span>{post.likes?.length || 0}</span>
        </button>
        <button
          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          onClick={() => setReplyingTo(!replyingTo)}
        >
          <MessageCircle className="h-4 w-4" />
          <span>{post.replies?.length || 0} replies</span>
        </button>
      </div>

      {post.replies && post.replies.length > 0 && (
        <div className="mt-4 space-y-3 border-t pt-4">
          {post.replies.map((reply) => (
            <div key={reply._id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {reply.user?.profilePic ? (
                  <img
                    src={reply.user.profilePic}
                    alt={reply.user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs">
                    {reply.user?.fullName?.charAt(0) || "?"}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">
                    {reply.user?.fullName || "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-600">
                    {formatTimestamp(reply.createdAt)}
                  </span>
                </div>
                <p className="text-sm mt-1">{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {replyingTo && (
        <div className="mt-4 border-t pt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleReplySubmit()}
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={handleReplySubmit}
              disabled={!replyContent.trim()}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}