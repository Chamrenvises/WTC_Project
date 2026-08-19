import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  HiUser,
  HiMail,
  HiLockClosed,
  HiShieldCheck,
  HiArrowLeft,
} from "react-icons/hi";

export default function Profile() {
  const { currentUser, userRole, updateUserProfile, updateEmailAddress, updateUserPassword } =
    useAuth();

  // Profile info state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  // Update Name & Email
  async function handleProfileSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please provide your name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please provide a valid email");
      return;
    }

    setSavingProfile(true);
    try {
      if (name.trim() !== currentUser.name) {
        await updateUserProfile(name.trim());
      }
      if (email.trim().toLowerCase() !== currentUser.email.toLowerCase()) {
        await updateEmailAddress(email.trim());
      }
      toast.success("Profile information updated successfully!");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email address is already used by another account.");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setSavingProfile(false);
    }
  }

  // Update Password
  async function handlePasswordSubmit(e) {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    // Verify current password if user has one stored
    if (currentUser.password && currentPassword !== currentUser.password) {
      toast.error("Current password is incorrect");
      return;
    }

    setSavingPassword(true);
    try {
      await updateUserPassword(newPassword);
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Failed to change password. Please try again.");
    } finally {
      setSavingPassword(false);
    }
  }

  if (!currentUser) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="card p-10 text-center max-w-md mx-auto space-y-4 bg-white border border-slate-200 shadow-md">
          <p className="text-slate-600 font-medium">You need to sign in to view your profile.</p>
          <Link to="/login" className="btn-primary py-3">
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-32 pb-24 min-h-screen ${userRole === "admin" ? "" : "bg-[#f8fafc]"}`}>
      <div className="container max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to={userRole === "admin" ? "/admin/dashboard" : "/"}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors font-bold"
          >
            <HiArrowLeft />
            {userRole === "admin" ? "Back to Admin Dashboard" : "Back to Home Store"}
          </Link>
        </div>

        {/* Profile Header Card */}
        <div className="card p-8 mb-10 border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-3xl font-black shadow-md shrink-0">
              {currentUser.email?.[0]?.toUpperCase() || "U"}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {currentUser.name || "User Account"}
                </h1>
                <span
                  className={`badge ${
                    userRole === "admin" ? "badge-orange" : "badge-success"
                  } text-[10px] py-1 px-3 uppercase font-bold tracking-wider`}
                >
                  {userRole === "admin" ? (
                    <span className="flex items-center gap-1">
                      <HiShieldCheck /> Admin Account
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <HiUser /> Customer Account
                    </span>
                  )}
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Settings Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Change Account Details */}
          <div className="card p-8 border border-slate-200 bg-white shadow-sm space-y-6">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                <HiUser className="text-2xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Account Information</h2>
                <p className="text-xs text-slate-500 font-medium">Update your name & email address</p>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name"
                    className="input-field pl-icon py-2.5 text-sm border-slate-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@domain.com"
                    className="input-field pl-icon py-2.5 text-sm border-slate-200"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="btn-primary w-full justify-center text-sm py-3 shadow-md bg-slate-900 hover:bg-slate-800"
                >
                  {savingProfile ? "Saving Changes..." : "Save Account Info"}
                </button>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="card p-8 border border-slate-200 bg-white shadow-sm space-y-6">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                <HiLockClosed className="text-2xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
                <p className="text-xs text-slate-500 font-medium">Keep your account protected</p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              {currentUser.password && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="input-field pl-icon py-2.5 text-sm border-slate-200"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  New Password
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="input-field pl-icon py-2.5 text-sm border-slate-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="input-field pl-icon py-2.5 text-sm border-slate-200"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="btn-primary w-full justify-center text-sm py-3 shadow-md bg-slate-900 hover:bg-slate-800"
                >
                  {savingPassword ? "Updating Password..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
