import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdInventory, MdMiscellaneousServices, MdTrendingUp, MdSmartphone, MdPerson } from "react-icons/md";
import { HiUsers, HiArrowRight, HiShieldCheck } from "react-icons/hi";
import { getLocalProducts, subscribeToProducts } from "../../data/productsData";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    products: 0,
    services: 6,
    contacts: 12,
  });

  useEffect(() => {
    const unsubscribe = subscribeToProducts((list) => {
      const products = list.length ? list : getLocalProducts();
      setProducts(products);
      setStats((prev) => ({ ...prev, products: products.length }));
    });
    return unsubscribe;
  }, []);

  const statCards = [
    {
      label: "Smartphones in Store",
      value: stats.products,
      icon: MdInventory,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
      text: "text-blue-600"
    },
    {
      label: "Active Services",
      value: stats.services,
      icon: MdMiscellaneousServices,
      color: "from-purple-500 to-fuchsia-600",
      bg: "bg-purple-50",
      text: "text-purple-600"
    },
    {
      label: "Customer Inquiries",
      value: stats.contacts,
      icon: HiUsers,
      color: "from-pink-500 to-rose-600",
      bg: "bg-pink-50",
      text: "text-pink-600"
    },
    {
      label: "Total Store Inventory Value",
      value: `$${products.reduce((acc, p) => acc + (p.price * (p.stock || 1)), 0).toLocaleString()}`,
      icon: MdTrendingUp,
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600"
    },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="card p-8 sm:p-10 bg-gradient-to-r from-orange-50 via-white to-white border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f94f25]/10 text-[#f94f25] text-xs font-bold border border-[#f94f25]/20">
              <HiShieldCheck /> PhoneGenZ Admin Portal
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Welcome back, {currentUser?.name || "Admin"}!
            </h1>
            <p className="text-slate-600 text-sm font-medium">
              Signed in as <span className="text-slate-900 font-bold">{currentUser?.email}</span>. Here is your live business overview.
            </p>
          </div>
          <Link to="/admin/profile" className="btn-secondary text-xs px-5 py-3 flex items-center gap-2 shrink-0">
            <MdPerson className="text-base" /> Profile & Security
          </Link>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.label} className="card space-y-4 bg-white border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div
                className={`w-14 h-14 rounded-2xl ${card.bg} border border-slate-100 flex items-center justify-center`}
              >
                <card.icon className={`text-2xl ${card.text}`} />
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1">
                {card.value}
              </div>
              <div className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wider">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Recent Products Table & Quick Tools */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Recent Products */}
        <div className="xl:col-span-8 card overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
              <h3 className="text-slate-900 font-bold text-lg">Inventory Highlights</h3>
              <p className="text-xs text-slate-500 font-medium">Recently featured smartphones</p>
            </div>
            <Link to="/admin/products" className="text-[#f94f25] text-xs font-bold hover:underline flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              Manage All Products <HiArrowRight />
            </Link>
          </div>
          <div className="table-container">
            <table className="min-w-[550px]">
              <thead>
                <tr>
                  <th>Smartphone</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td>
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover mix-blend-multiply" />
                          ) : (
                            <MdSmartphone className="text-slate-400 text-2xl my-2 mx-auto" />
                          )}
                        </div>
                        <div>
                          <span className="text-slate-900 font-bold text-sm block">{p.name}</span>
                          <span className="text-xs text-slate-500 font-medium">{p.specs || p.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-slate-700 font-bold text-sm">{p.brand}</td>
                    <td className="text-slate-900 font-black text-sm">
                      ${Number(p.price).toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`badge text-[10px] uppercase font-bold tracking-wider ${
                          Number(p.stock) > 0 ? "badge-success" : "badge-danger"
                        }`}
                      >
                        {Number(p.stock) > 0 ? `${p.stock} units` : "Out of stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="xl:col-span-4 card p-8 space-y-6 border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-slate-900 font-bold text-lg">Quick Tools</h3>
            <p className="text-slate-500 text-xs font-medium">Direct access to store management</p>
          </div>

          <div className="space-y-3.5">
            <Link
              to="/admin/products"
              className="btn-primary w-full justify-center text-sm py-3.5"
            >
              Add / Edit Smartphones
            </Link>
            <Link
              to="/admin/services"
              className="btn-secondary w-full justify-center text-sm py-3.5"
            >
              Manage Services
            </Link>
            <Link
              to="/admin/profile"
              className="btn-secondary w-full justify-center text-sm py-3.5"
            >
              Admin Security Settings
            </Link>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Store Engine Status
            </h4>
            <div className="space-y-2.5">
              {[
                { label: "Cloud Firestore Database", status: "Connected" },
                { label: "Auth Provider Engine", status: "Active" },
                { label: "Image CDN & Storage", status: "Online" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-bold">{item.label}</span>
                  <span className="badge badge-success text-[10px] py-0.5">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
