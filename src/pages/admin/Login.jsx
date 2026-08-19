import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff, HiLockClosed, HiMail, HiShieldCheck, HiUser } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const { role } = await login(email, password);
      if (role === "admin") {
        toast.success("Welcome back, Admin!");
        navigate("/admin/dashboard");
      } else {
        toast.success("Welcome back to PhoneGenZ!");
        navigate("/");
      }
    } catch {
      toast.error("Invalid email or password. Please try again.");
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
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Sign in to your account to continue</p>
          </div>
        </div>

        {/* Role Pills */}
        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white shadow-md text-xs font-bold uppercase tracking-widest">
            <HiShieldCheck className="text-[#f94f25] text-base" /> Admin
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm text-xs font-bold uppercase tracking-widest">
            <HiUser className="text-[#0056ff] text-base" /> Customer
          </div>
        </div>

        {/* Auth Card */}
        <div className="card p-8 bg-white border border-slate-200 shadow-xl space-y-6">
          <form id="login-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  id="login-email"
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
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pl-icon pr-11 py-3 border border-slate-200 shadow-sm"
                  required
                />
                <button
                  type="button"
                  id="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <Link to="/forgot-password" id="forgot-password-link" className="text-xs font-bold text-[#f94f25] hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-md shadow-md"
            >
              {loading ? (
                <>
                  <span className="spinner border-white" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span>Don't have an account?</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <Link to="/register" id="go-to-register" className="btn-secondary w-full justify-center py-3.5 bg-white border-slate-200 text-slate-900 hover:bg-slate-50 font-bold">
            Create Customer Account
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
