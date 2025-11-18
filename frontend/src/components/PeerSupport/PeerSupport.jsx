import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
// import { ADMIN_EMAIL } from "../constants/constants";
import { CommunityFeed } from "./components/CommunityFeed";
import { CreatePostForm } from "./components/CreatePostForm";
import { WebinarSection } from "./components/WebinarSection";
import { ADMIN_EMAIL } from "../../constants/constants";

const API_BASE_URL = "http://localhost:5000/api";

export function PeerSupport() {
  // State
  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [webinars, setWebinars] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [sortBy, setSortBy] = useState("latest");

  // Fetch current user
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Fetch posts when tab or sort changes
  useEffect(() => {
    if (activeTab === "feed") {
      setPage(1);
      setPosts([]);
      setHasMore(true);
      fetchPosts(1);
    }
  }, [activeTab, sortBy]);

  // Fetch more posts when page changes
  useEffect(() => {
    if (activeTab === "feed" && page > 1) {
      fetchPosts(page);
    }
  }, [page]);

  // Fetch webinars
  useEffect(() => {
    if (activeTab === "webinars") {
      fetchWebinars();
    }
  }, [activeTab]);

  // Infinite scroll
  useEffect(() => {
    if (activeTab !== "feed") return;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight - 300 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, loading, hasMore]);

  const fetchPosts = async (pageNum = page) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: "10",
      });

      if (sortBy === "mine" && currentUser) {
        params.append("authorId", currentUser._id);
      }

      if (sortBy === "old") {
        params.append("sortOrder", "asc");
      } else if (sortBy === "latest") {
        params.append("sortOrder", "desc");
      }

      const response = await fetch(`${API_BASE_URL}/posts?${params}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch posts (${response.status})`
        );
      }

      const data = await response.json();
      let fetchedPosts = data.posts || [];

      if (pageNum === 1) {
        setPosts(fetchedPosts);
      } else {
        setPosts((prev) => [...prev, ...fetchedPosts]);
      }

      setHasMore(data.currentPage < data.totalPages);
      setError(null);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(
        error.message || "Failed to load posts. Please check your connection."
      );
      if (pageNum === 1) {
        setPosts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchWebinars = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/webinars`, {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch webinars");

      const data = await response.json();
      setWebinars(data);
    } catch (error) {
      console.error("Error fetching webinars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async (postData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...postData,
          isAnonymous: false,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create post");
      }

      const newPostData = await response.json();
      setPosts((prev) => [newPostData, ...prev]);
      setActiveTab("feed");
    } catch (error) {
      console.error("Error creating post:", error);
      alert(error.message || "Failed to create post");
      throw error;
    }
  };

  const toggleLikePost = async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to toggle like");

      const data = await response.json();
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, likes: Array(data.likes).fill(null) }
            : post
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleReply = async (postId, content) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to add reply");

      const replyData = await response.json();
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, replies: [...(post.replies || []), replyData] }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const deletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete post");
      }

      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(error.message || "Failed to delete post");
    }
  };

  const handleCreateWebinar = async (webinarData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/webinars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(webinarData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create webinar");
      }

      const newWebinar = await response.json();
      setWebinars((prev) => [...prev, newWebinar]);
      alert("Webinar created successfully!");
    } catch (error) {
      console.error("Error creating webinar:", error);
      alert(error.message || "Failed to create webinar");
    }
  };

  const handleJoinWebinar = async (webinarId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/webinars/${webinarId}/join`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to join webinar");
      }

      setWebinars((prev) =>
        prev.map((w) =>
          w._id === webinarId
            ? { ...w, attendees: [...(w.attendees || []), currentUser._id] }
            : w
        )
      );

      alert("Successfully registered for webinar!");
    } catch (error) {
      console.error("Error joining webinar:", error);
      alert(error.message || "Failed to join webinar");
    }
  };

  const handleDeleteWebinar = async (webinarId) => {
    if (!window.confirm("Are you sure you want to delete this webinar?"))
      return;

    try {
      const response = await fetch(`${API_BASE_URL}/webinars/${webinarId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete webinar");
      }

      setWebinars((prev) => prev.filter((w) => w._id !== webinarId));
      alert("Webinar deleted successfully!");
    } catch (error) {
      console.error("Error deleting webinar:", error);
      alert(error.message || "Failed to delete webinar");
    }
  };

  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Peer Support & Communities</h1>
        <p className="text-gray-600">
          Share your story, join communities, and connect with volunteers
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-bold text-blue-900">
            Community Guidelines
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">✓ Encouraged:</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Share coping strategies and experiences</li>
              <li>• Offer support and encouragement</li>
              <li>• Ask questions about resources</li>
              <li>• Celebrate progress and victories</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">✗ Not Allowed:</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Personal identifying information</li>
              <li>• Crisis situations (use hotline: 988)</li>
              <li>• Harmful or triggering content</li>
              <li>• Medical advice or diagnosis</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex bg-gray-100 rounded-lg shadow-md justify-center">
        <button
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "feed"
              ? " border-blue-600 text-blue-600 bg-white rounded-lg m-1"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("feed")}
        >
          Community Feed
        </button>
        <button
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "create"
              ? " border-blue-600 text-blue-600 bg-white rounded-lg m-1"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("create")}
        >
          Share Your Story
        </button>
        <button
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "webinars"
              ? " border-blue-600 text-blue-600 bg-white rounded-lg m-1"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("webinars")}
        >
          Webinars
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === "feed" && (
          <CommunityFeed
            posts={posts}
            currentUser={currentUser}
            loading={loading}
            error={error}
            hasMore={hasMore}
            page={page}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onDelete={deletePost}
            onToggleLike={toggleLikePost}
            onReply={handleReply}
            onRetry={() => fetchPosts(1)}
          />
        )}

        {activeTab === "create" && (
          <CreatePostForm onSubmit={handleSubmitPost} />
        )}

        {activeTab === "webinars" && (
          <WebinarSection
            webinars={webinars}
            currentUser={currentUser}
            isAdmin={isAdmin}
            loading={loading}
            onCreateWebinar={handleCreateWebinar}
            onJoinWebinar={handleJoinWebinar}
            onDeleteWebinar={handleDeleteWebinar}
          />
        )}
      </div>
    </div>
  );
}