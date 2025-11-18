import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

// const BASE_URL ="http://localhost:5000" ;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
      if (error.response?.status !== 401) {
        toast.error("Authentication failed");
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      
      if (res.data.token) {
        localStorage.setItem('auth-token', res.data.token);
      }
      
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create account");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      
      if (res.data.token) {
        localStorage.setItem('auth-token', res.data.token);
      }
      
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      // Fixed: Safely access nested properties with optional chaining
      const errorMessage = error.response?.data?.message || "Failed to login. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      
      localStorage.removeItem('auth-token');
      
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

connectSocket: () => {
  // Socket connection removed - keeping function for compatibility
},

disconnectSocket: () => {
  // Socket disconnection removed - keeping function for compatibility
},
}));