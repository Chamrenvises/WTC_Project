import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth, firebaseConfigured } from "../firebase/config";

const AuthContext = createContext();
const ADMIN_EMAILS = ["chamrenvises6@gmail.com"];

export function useAuth() {
  return useContext(AuthContext);
}

function getRole(email) {
  return ADMIN_EMAILS.includes(email?.toLowerCase()) ? "admin" : "customer";
}

function mapFirebaseUser(user) {
  if (!user) return null;

  return {
    id: user.uid,
    uid: user.uid,
    email: user.email || "",
    name: user.displayName || user.email?.split("@")[0] || "User",
    role: getRole(user.email),
    createdAt: user.metadata.creationTime,
  };
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseConfigured || !auth) {
      setLoading(false);
      return undefined;
    }

    return onAuthStateChanged(auth, (user) => {
      const mappedUser = mapFirebaseUser(user);
      setCurrentUser(mappedUser);
      setUserRole(mappedUser?.role || null);
      setLoading(false);
    });
  }, []);

  async function register(email, password, name = "") {
    if (!firebaseConfigured || !auth) {
      const error = new Error("Firebase Authentication is not configured");
      error.code = "auth/not-configured";
      throw error;
    }

    const cleanEmail = email.trim().toLowerCase();
    const credential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
    const cleanName = name.trim() || cleanEmail.split("@")[0];

    await updateProfile(credential.user, { displayName: cleanName });
    const mappedUser = mapFirebaseUser(credential.user);
    const role = getRole(cleanEmail);
    mappedUser.name = cleanName;
    mappedUser.role = role;
    setCurrentUser(mappedUser);
    setUserRole(role);

    return { user: mappedUser, role };
  }

  async function login(email, password) {
    if (!firebaseConfigured || !auth) {
      const error = new Error("Firebase Authentication is not configured");
      error.code = "auth/not-configured";
      throw error;
    }

    const credential = await signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password
    );
    const mappedUser = mapFirebaseUser(credential.user);
    setCurrentUser(mappedUser);
    setUserRole(mappedUser.role);

    return { user: mappedUser, role: mappedUser.role };
  }

  async function logout() {
    if (auth) await signOut(auth);
    setCurrentUser(null);
    setUserRole(null);
  }

  async function resetPassword(email) {
    if (!firebaseConfigured || !auth) {
      const error = new Error("Password reset email is not configured");
      error.code = "auth/email-service-not-configured";
      throw error;
    }

    await sendPasswordResetEmail(auth, email.trim().toLowerCase());
  }

  async function updateUserProfile(newName) {
    if (!auth?.currentUser) throw new Error("Not logged in");
    await updateProfile(auth.currentUser, { displayName: newName });
    const mappedUser = mapFirebaseUser(auth.currentUser);
    setCurrentUser(mappedUser);
    return mappedUser;
  }

  async function updateEmailAddress(newEmail) {
    if (!auth?.currentUser) throw new Error("Not logged in");
    await updateEmail(auth.currentUser, newEmail.trim().toLowerCase());
    const mappedUser = mapFirebaseUser(auth.currentUser);
    setCurrentUser(mappedUser);
    setUserRole(mappedUser.role);
    return mappedUser;
  }

  async function updateUserPassword(newPassword) {
    if (!auth?.currentUser) throw new Error("Not logged in");
    await updatePassword(auth.currentUser, newPassword);
  }

  const value = {
    currentUser,
    userRole,
    register,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    updateEmailAddress,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
