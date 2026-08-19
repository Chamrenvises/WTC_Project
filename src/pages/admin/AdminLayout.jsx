import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  MdDashboard,
  MdInventory,
  MdMiscellaneousServices,
  MdMenu,
  MdClose,
  MdPerson,
} from "react-icons/md";
import { HiLogout, HiExternalLink } from "react-icons/hi";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to logout");
    }
  }

  const navItems = [
    { to: "/admin/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/admin/products", icon: MdInventory, label: "Products" },
    { to: "/admin/services", icon: MdMiscellaneousServices, label: "Services" },
    { to: "/admin/profile", icon: MdPerson, label: "Profile & Security" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div>
          {/* Logo */}
          <div className="admin-brand-wrap">
            <Link to="/" className="admin-brand">
              <span className="admin-brand-mark">PG</span>
              <span className="admin-brand-name">PhoneGenZ</span>
            </Link>
            <span className="admin-brand-meta">Admin workspace</span>
          </div>

          {/* Navigation Links */}
          <nav className="p-5 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                id={`sidebar-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setSidebarOpen(false)}
                className={`sidebar-link ${
                  location.pathname === item.to ? "active" : ""
                }`}
              >
                <item.icon className="text-xl shrink-0" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 space-y-2">
          <Link
            to="/"
            id="sidebar-view-site"
            target="_blank"
            className="sidebar-link text-slate-500 hover:text-slate-900"
          >
            <HiExternalLink className="text-xl shrink-0" />
            <span>View Live Store</span>
          </Link>
          <button
            id="sidebar-logout"
            onClick={handleLogout}
            className="sidebar-link w-full text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <HiLogout className="text-xl shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-wrapper">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              id="sidebar-toggle"
              className="lg:hidden p-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
            </button>

            <h2 className="text-slate-900 font-black text-xl capitalize tracking-tight">
              {location.pathname.split("/").pop().replace("-", " ") || "Dashboard"}
            </h2>
          </div>

          <Link
            to="/admin/profile"
            className="flex items-center gap-3.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 transition-all border border-slate-200 shadow-sm hover:shadow-md"
            title="Edit Admin Profile & Password"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm text-slate-900 font-bold">
                {currentUser?.name || "Admin"}
              </p>
              <p className="text-xs text-slate-500 truncate max-w-[200px] font-medium">
                {currentUser?.email}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {currentUser?.email?.[0]?.toUpperCase() || "A"}
            </div>
          </Link>
        </header>

        {/* Main Content Container */}
        <main className="p-8 lg:p-10 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
