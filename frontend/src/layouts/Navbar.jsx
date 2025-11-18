import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  Shield,
  User,
  Moon,
  Sun,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Chat with our AI support bot",
  },
  {
    name: "AI Assistant",
    href: "/aiChat",
    icon: MessageCircle,
    description: "Chat with our AI support bot",
  },
  {
    name: "Book Appointment",
    href: "/appointments",
    icon: Calendar,
    description: "Schedule with counselors",
  },
  {
    name: "Resources",
    href: "/resources",
    icon: BookOpen,
    description: "Guides and wellness content",
  },
  {
    name: "Peer Support",
    href: "/peer-support",
    icon: Users,
    description: "Connect with community",
  },
];

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="bg-base-100 border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-primary-content" />
            </div>
            <span className="font-serif font-bold text-xl">MindCare</span>
          </Link>

          {/* Desktop Navigation - Center (Only if authenticated) */}
          {authUser && (
            <div className="hidden md:flex flex-1 justify-center mx-4">
              <div className="flex items-center gap-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`btn btn-ghost btn-sm gap-2 ${
                        isActive ? "btn-active" : ""
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Right Side - Theme Toggle & Auth Actions */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            {/* User Profile - Desktop Only (Only if authenticated) */}
            {authUser && (
              <Link
                to={"/profile"}
                className="hidden lg:flex items-center gap-3 mr-2"
              >
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-base-200">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
                      {authUser?.profilePic ? (
                        <img
                          src={authUser.profilePic}
                          alt={authUser.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {authUser?.fullName || "Guest User"}
                    </span>
                    <span className="text-xs opacity-60">
                      {authUser?.email || "MindCare Platform"}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Login/Signup Buttons - Desktop (Only if NOT authenticated) */}
            {!authUser && (
              <div className="hidden md:flex items-center gap-2 mr-2">
                <Link to="/login" className="btn btn-ghost btn-sm gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Link>
              </div>
            )}

            {/* Theme Toggle - Always Visible */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>

            {/* Mobile Menu Button */}
            <label
              htmlFor="mobile-drawer"
              className="btn btn-ghost btn-circle md:hidden"
            >
              <Menu className="h-5 w-5" />
            </label>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="drawer drawer-end">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-50">
          <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 min-h-full bg-base-100">
            <div className="flex flex-col gap-6">
              {/* Logo in Drawer */}
              <div className="flex items-center gap-2 px-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-primary-content" />
                </div>
                <span className="font-serif font-bold text-xl">
                  MindCare
                </span>
              </div>

              {/* Conditional Content Based on Auth Status */}
              {authUser ? (
                <>
                  {/* Navigation Links - Authenticated */}
                  <ul className="space-y-2">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={`flex items-center gap-3 ${
                              isActive ? "active" : ""
                            }`}
                          >
                            <item.icon className="h-5 w-5" />
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs opacity-60">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="divider"></div>

                  {/* User Profile Section */}
                  <Link
                    to={"/profile"}
                    className="flex items-center gap-3 p-4 bg-base-200 rounded-lg mb-4"
                  >
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content w-10 rounded-full flex items-center justify-center overflow-hidden">
                        {authUser?.profilePic ? (
                          <img
                            src={authUser.profilePic}
                            alt={authUser.fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {authUser?.fullName || "Guest User"}
                      </div>
                      <div className="text-xs opacity-60">
                        {authUser?.email || "MindCare Platform"}
                      </div>
                    </div>
                  </Link>

                  {/* Privacy Notice */}
                  <div className="alert">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-sm">Privacy Protected</h4>
                      <p className="text-xs opacity-70">
                        All conversations and appointments are confidential and
                        secure.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Login/Signup Buttons - Not Authenticated */}
                  <div className="flex flex-col gap-3 px-4">
                    <Link
                      to="/login"
                      className="btn btn-outline btn-primary gap-2 w-full"
                    >
                      <LogIn className="h-5 w-5" />
                      Login to Your Account
                    </Link>
                    <Link
                      to="/signup"
                      className="btn btn-primary gap-2 w-full"
                    >
                      <UserPlus className="h-5 w-5" />
                      Create New Account
                    </Link>
                  </div>

                  <div className="divider"></div>

                  {/* Welcome Message */}
                  <div className="alert alert-info">
                    <MessageCircle className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium text-sm">Welcome to MindCare</h4>
                      <p className="text-xs opacity-70">
                        Sign in to access AI assistance, book appointments, and connect with our community.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}