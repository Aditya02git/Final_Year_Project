import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 500,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    media: [
      {
        type: {
          type: String,
          enum: ["image", "video"],
        },
        url: {
          type: String,
        },
        publicId: {
          type: String, // For Cloudinary deletion
        },
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replies: [replySchema],
    isAnonymous: {
      type: Boolean,
      default: true,
    },
    isModerated: {
      type: Boolean,
      default: false,
    },
    moderationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    community: {
      type: String,
      default: "general",
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
postSchema.index({ createdAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ community: 1 });
postSchema.index({ author: 1 });

const Post = mongoose.model("Post", postSchema);
export default Post;