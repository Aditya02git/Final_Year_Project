
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AppointmentPage from "./pages/AppointmentPage";
import PeerSupportPage from "./pages/PeerSupportPage";
import ResourcePage from "./pages/ResourcePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./landingPage/LandingPage";
import AiChatPage from "./pages/AiChatPage";
import DashBoard from "./pages/DashBoard";
import PaymentPage from "./payment/PaymentPage";
import { ConfirmationScreen } from "./components/Appointment/components/ConfirmationScreen";
// import { useSocketListeners } from "./store/useSocketListeners";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  // useSocketListeners();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Routes>
        {/* DashBoard */}
        <Route
          path="/"
          element={authUser ? <DashBoard /> : <Navigate to="/landingPage" />}
        />
        {/* Landing Page */}
        <Route
          path="/landingPage"
          element={!authUser ? <LandingPage /> : <Navigate to="/" />}
        />
        {/* Auth Pages */}
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        {/* Protected Pages */}
        <Route
          path="/aiChat"
          element={authUser ? <AiChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/appointments"
          element={authUser ? <AppointmentPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/peer-support"
          element={authUser ? <PeerSupportPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/resources"
          element={authUser ? <ResourcePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/payment"
          element={authUser ? <PaymentPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/confirmation"
          element={authUser ? <ConfirmationScreen /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
