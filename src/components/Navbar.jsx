import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX, HiLogout, HiShoppingBag, HiSearch, HiBell } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userRole, logout } = useAuth();
  const { totalCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Store" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="navbar-logo shrink-0">
            PhoneGenZ.
          </Link>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link ${isActive(link.to) ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Search Bar (Desktop) */}
            <form onSubmit={handleSearch} className="hidden xl:block search-field">
              <HiSearch className="search-field-icon text-slate-400 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="search-field-input pr-4 py-2.5 bg-slate-100 border-none rounded-full text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all w-48 font-medium"
              />
            </form>

            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-700 hover:text-black transition-colors"
                title="View Cart"
              >
                <HiShoppingBag className="text-2xl" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0066cc] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Auth Controls */}
              <div className="hidden md:flex items-center gap-3">
                {currentUser ? (
                  <>
                    <Link
                      to={userRole === "admin" ? "/admin/dashboard" : "/profile"}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition-colors"
                      title="Account Profile"
                    >
                      {currentUser.name?.[0]?.toUpperCase() || currentUser.email?.[0]?.toUpperCase() || "U"}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-slate-400 hover:text-red-500 transition-colors p-2"
                      title="Sign Out"
                    >
                      <HiLogout className="text-xl" />
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="btn-primary text-sm px-6 py-2">
                    Log In
                  </Link>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden text-slate-900 p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="py-6 border-t border-slate-100 md:hidden bg-white/95 backdrop-blur-xl absolute left-0 right-0 top-[4.5rem] shadow-xl">
            <div className="container px-6">
              <form onSubmit={handleSearch} className="mb-6">
                <div className="search-field">
                  <HiSearch className="search-field-icon text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="search-field-input w-full pr-4 py-3 bg-slate-100 border-none rounded-full text-sm font-medium text-slate-900"
                  />
                </div>
              </form>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-lg font-semibold ${
                      isActive(link.to) ? "text-black" : "text-slate-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
                {currentUser ? (
                  <>
                    <Link
                      to={userRole === "admin" ? "/admin/dashboard" : "/profile"}
                      className="btn-secondary w-full"
                    >
                      My Profile
                    </Link>
                    <button onClick={handleLogout} className="btn-primary w-full bg-red-500 hover:bg-red-600">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-primary w-full">
                      Log In
                    </Link>
                    <Link to="/register" className="btn-secondary w-full">
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
