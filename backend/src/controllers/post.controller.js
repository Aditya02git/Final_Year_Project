import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

// Get all posts (feed)
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, tags, community, search, authorId, sortOrder = "desc" } = req.query;
    
    const query = { moderationStatus: "approved" };
    
    if (tags) {
      query.tags = { $in: tags.split(",") };
    }
    
    if (community && community !== "general") {
      query.community = community;
    }
    
    if (search) {
      query.content = { $regex: search, $options: "i" };
    }
    
    // Filter by author if authorId is provided (for "My Posts")
    if (authorId) {
      query.author = authorId;
    }
    
    // Determine sort order: -1 for descending (latest), 1 for ascending (oldest)
    const sortDirection = sortOrder === "asc" ? 1 : -1;
    
    const posts = await Post.find(query)
      .populate("author", "fullName profilePic email")
      .populate("replies.user", "fullName profilePic email")
      .sort({ createdAt: sortDirection })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    
    const count = await Post.countDocuments(query);
    
    // Format posts - KEEP PROFILE PICS AND EMAIL
    const formattedPosts = posts.map(post => ({
      ...post,
      author: {
        _id: post.author._id,
        fullName: post.author.fullName,
        profilePic: post.author.profilePic,
        email: post.author.email
      },
      replies: post.replies.map(reply => ({
        ...reply,
        user: {
          _id: reply.user._id,
          fullName: reply.user.fullName,
          profilePic: reply.user.profilePic,
          email: reply.user.email
        }
      }))
    }));
    
    res.status(200).json({
      posts: formattedPosts,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      total: count,
    });
  } catch (error) {
    console.error("Error in getPosts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { content, tags, isAnonymous, community } = req.body;
    let { media } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: "Content is required" });
    }
    
    if (content.length > 2000) {
      return res.status(400).json({ message: "Content is too long (max 2000 characters)" });
    }
    
    // Upload media to Cloudinary
    const uploadedMedia = [];
    if (media && Array.isArray(media)) {
      for (const item of media) {
        if (item.data) {
          const uploadResponse = await cloudinary.uploader.upload(item.data, {
            resource_type: item.type === "video" ? "video" : "image",
            folder: "mindcare/posts",
            transformation: item.type === "image" ? [
              { width: 1200, height: 1200, crop: "limit" },
              { quality: "auto" }
            ] : [
              { width: 1280, height: 720, crop: "limit" },
              { quality: "auto" }
            ]
          });
          
          uploadedMedia.push({
            type: item.type,
            url: uploadResponse.secure_url,
            publicId: uploadResponse.public_id,
          });
        }
      }
    }
    
    const newPost = new Post({
      author: req.user._id,
      content,
      media: uploadedMedia,
      tags: tags || [],
      isAnonymous: isAnonymous !== false,
      community: community || "general",
      moderationStatus: "approved", // Auto-approve for now, add AI moderation later
    });
    
    await newPost.save();
    
    const populatedPost = await Post.findById(newPost._id)
      .populate("author", "fullName profilePic email"); 
    
    // Format for display - KEEP THE PROFILE PIC AND EMAIL
    const formattedPost = {
      ...populatedPost.toObject(),
      author: {
        _id: populatedPost.author._id,
        fullName: populatedPost.author.fullName,
        profilePic: populatedPost.author.profilePic,
        email: populatedPost.author.email
      }
    };
    
    res.status(201).json(formattedPost);
  } catch (error) {
    console.error("Error in createPost:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Like/unlike a post
export const toggleLikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const likeIndex = post.likes.indexOf(userId);
    
    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(userId);
    }
    
    await post.save();
    
    res.status(200).json({ 
      likes: post.likes.length,
      isLiked: likeIndex === -1
    });
  } catch (error) {
    console.error("Error in toggleLikePost:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a reply to a post
export const addReply = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: "Reply content is required" });
    }
    
    if (content.length > 500) {
      return res.status(400).json({ message: "Reply is too long (max 500 characters)" });
    }
    
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const reply = {
      user: userId,
      content,
      likes: [],
    };
    
    post.replies.push(reply);
    await post.save();
    
    const updatedPost = await Post.findById(postId)
      .populate("replies.user", "fullName profilePic email"); // ADDED EMAIL HERE
    
    const lastReply = updatedPost.replies[updatedPost.replies.length - 1];
    
    // Format reply - KEEP PROFILE PIC AND EMAIL
    const formattedReply = {
      ...lastReply.toObject(),
      user: {
        _id: lastReply.user._id,
        fullName: lastReply.user.fullName,
        profilePic: lastReply.user.profilePic,
        email: lastReply.user.email // ADDED EMAIL HERE
      }
    };
    
    res.status(201).json(formattedReply);
  } catch (error) {
    console.error("Error in addReply:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Like/unlike a reply
export const toggleLikeReply = async (req, res) => {
  try {
    const { postId, replyId } = req.params;
    const userId = req.user._id;
    
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const reply = post.replies.id(replyId);
    
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }
    
    const likeIndex = reply.likes.indexOf(userId);
    
    if (likeIndex > -1) {
      // Unlike
      reply.likes.splice(likeIndex, 1);
    } else {
      // Like
      reply.likes.push(userId);
    }
    
    await post.save();
    
    res.status(200).json({ 
      likes: reply.likes.length,
      isLiked: likeIndex === -1
    });
  } catch (error) {
    console.error("Error in toggleLikeReply:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    // Check if user is the author
    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }
    
    // Delete media from Cloudinary
    if (post.media && post.media.length > 0) {
      for (const item of post.media) {
        if (item.publicId) {
          await cloudinary.uploader.destroy(item.publicId, {
            resource_type: item.type === "video" ? "video" : "image"
          });
        }
      }
    }
    
    await Post.findByIdAndDelete(postId);
    
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user's own posts
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .populate("author", "fullName profilePic email") // ADDED EMAIL HERE
      .populate("replies.user", "fullName profilePic email") // ADDED EMAIL HERE
      .sort({ createdAt: -1 });
    
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getMyPosts:", error);
    res.status(500).json({ message: "Server error" });
  }
};