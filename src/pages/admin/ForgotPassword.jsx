import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { HiMail, HiArrowLeft } from "react-icons/hi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success("Password reset instructions sent!");
    } catch (err) {
      if (err.code === "auth/email-service-not-configured") {
        toast.error("Password reset email is not configured yet. Add your Firebase settings first.");
      } else if (err.code === "auth/operation-not-allowed") {
        toast.error("Enable Email/Password sign-in in Firebase Authentication settings.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Enter a valid email address.");
      } else if (err.code === "auth/user-not-found") {
        toast.error("No account was found with this email address.");
      } else if (err.code === "auth/too-many-requests") {
        toast.error("Too many reset attempts. Please wait and try again.");
      } else {
        console.error("Password reset failed:", err);
        toast.error(err?.message || "Failed to send reset email. Check your email address.");
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
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 mx-auto">
            <span className="auth-brand-mark">PG</span>
            <span className="auth-brand-name">PhoneGenZ</span>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reset Password</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Enter your email and we'll send you a password reset link
            </p>
          </div>
        </div>

        <div className="card p-8 bg-white border border-slate-200 shadow-xl space-y-6">
          {sent ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-500 text-3xl shadow-sm">
                <HiMail />
              </div>
              <h3 className="text-slate-900 font-bold text-xl">Check Your Email</h3>
              <p className="text-slate-500 text-sm font-medium">
                We've sent a password reset link to{" "}
                <span className="text-[#f94f25] font-bold">{email}</span>.
              </p>
              <Link
                to="/login"
                id="back-to-login-from-success"
                className="btn-primary w-full justify-center text-sm py-3 mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-md shadow-md"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form id="forgot-password-form" onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="input-field pl-icon py-3 border border-slate-200 shadow-sm"
                    required
                  />
                </div>
              </div>

              <button
                id="reset-submit"
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-md shadow-md mt-2"
              >
                {loading ? (
                  <>
                    <span className="spinner border-white" />
                    Sending Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  id="back-to-login"
                  className="inline-flex items-center gap-2 text-slate-500 text-xs font-bold hover:text-slate-900 transition-colors uppercase tracking-wider"
                >
                  <HiArrowLeft /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
