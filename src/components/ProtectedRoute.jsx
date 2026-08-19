import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If route requires admin and user is a customer, redirect home
  if (adminOnly && userRole === "customer") {
    return <Navigate to="/" replace />;
  }

  return children;
}
