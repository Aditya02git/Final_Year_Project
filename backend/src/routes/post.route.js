import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getPosts,
  createPost,
  toggleLikePost,
  addReply,
  toggleLikeReply,
  deletePost,
  getMyPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

// Get all posts (feed)
router.get("/", protectRoute, getPosts);

// Get user's own posts
router.get("/my-posts", protectRoute, getMyPosts);

// Create a new post
router.post("/", protectRoute, createPost);

// Delete a post
router.delete("/:postId", protectRoute, deletePost);

// Like/unlike a post
router.post("/:postId/like", protectRoute, toggleLikePost);

// Add a reply to a post
router.post("/:postId/reply", protectRoute, addReply);

// Like/unlike a reply
router.post("/:postId/reply/:replyId/like", protectRoute, toggleLikeReply);

export default router;