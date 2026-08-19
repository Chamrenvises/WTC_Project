import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import AdminLayout from "./pages/admin/AdminLayout";

import Home from "./pages/public/Home";
import Products from "./pages/public/Products";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Contact from "./pages/public/Contact";
import Profile from "./pages/Profile";

import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import ForgotPassword from "./pages/admin/ForgotPassword";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminServices from "./pages/admin/AdminServices";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-between">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <CartDrawer />
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/profile" element={<PublicLayout><Profile /></PublicLayout>} />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/forgot-password" element={<Navigate to="/forgot-password" replace />} />

            {/* Admin-protected pages */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout><Dashboard /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout><AdminProducts /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout><AdminServices /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout><Profile /></AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </CartProvider>
    </AuthProvider>
  );
}
