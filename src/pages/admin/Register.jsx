import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff, HiLockClosed, HiMail, HiUser } from "react-icons/hi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await register(email, password, name);
      toast.success("Account created! Welcome to PhoneGenZ!");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("An account with this email already exists.");
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="w-full max-w-md z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 mx-auto">
            <span className="auth-brand-mark">PG</span>
            <span className="auth-brand-name">PhoneGenZ</span>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Join PhoneGenZ as a customer today</p>
          </div>
        </div>

        <div className="card p-8 bg-white border border-slate-200 shadow-xl space-y-6">
          <form id="register-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="input-field pl-icon py-3 border border-slate-200 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-field pl-icon py-3 border border-slate-200 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="input-field pl-icon pr-11 py-3 border border-slate-200 shadow-sm"
                  required
                />
                <button
                  type="button"
                  id="toggle-password-register"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Confirm Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  id="register-confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="input-field pl-icon py-3 border border-slate-200 shadow-sm"
                  required
                />
              </div>
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-md shadow-md mt-2"
            >
              {loading ? (
                <>
                  <span className="spinner border-white" />
                  Creating Account...
                </>
              ) : (
                "Create My Account"
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span>Already have an account?</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <Link to="/login" id="go-to-login" className="btn-secondary w-full justify-center py-3.5 bg-white border-slate-200 text-slate-900 hover:bg-slate-50 font-bold">
            Sign In
          </Link>
        </div>

        <div className="text-center">
          <Link to="/" className="text-xs font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider">
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
