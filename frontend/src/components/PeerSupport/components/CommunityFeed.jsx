import {
  MessageCircle,
  Search,
  Loader,
  AlertTriangle,
} from "lucide-react";
import { PostCard } from "./PostCard";

export function CommunityFeed({
  posts,
  currentUser,
  loading,
  error,
  hasMore,
  page,
  sortBy,
  onSortChange,
  onDelete,
  onToggleLike,
  onReply,
  onRetry,
}) {
  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">{error}</span>
          </div>
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="latest">Latest</option>
            <option value="old">Oldest</option>
            <option value="mine">My Posts</option>
          </select>
        </div>
      </div>

      {loading && page === 1 ? (
        <div className="flex justify-center p-8">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <MessageCircle className="h-16 w-16 mx-auto mb-4" />
          <p>No posts yet. Be the first to share!</p>
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              currentUser={currentUser}
              onDelete={onDelete}
              onToggleLike={onToggleLike}
              onReply={onReply}
            />
          ))}

          {loading && page > 1 && (
            <div className="flex justify-center py-4">
              <Loader className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          )}

          {!hasMore && posts.length > 0 && (
            <div className="text-center py-4 text-gray-600 text-sm">
              You've reached the end
            </div>
          )}
        </>
      )}
    </div>
  );
}