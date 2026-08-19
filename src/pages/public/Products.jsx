import { useState, useEffect } from "react";
import { HiSearch, HiShoppingBag } from "react-icons/hi";
import { MdSmartphone } from "react-icons/md";
import { getLocalProducts, subscribeToProducts } from "../../data/productsData";
import { useCart } from "../../context/CartContext";

export default function Products() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const { addToCart } = useCart();

  const brands = ["All", "Apple", "Samsung", "Google", "Xiaomi", "OnePlus"];
  const categories = ["All", "Flagship", "Mid-range", "Budget"];

  useEffect(() => {
    const unsubscribe = subscribeToProducts((list) => {
      setPhones(list.length ? list : getLocalProducts());
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const filtered = phones
    .filter((p) => {
      const matchSearch =
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.brand?.toLowerCase().includes(search.toLowerCase()) ||
        p.specs?.toLowerCase().includes(search.toLowerCase());
      const matchBrand = selectedBrand === "All" || p.brand?.toLowerCase() === selectedBrand.toLowerCase();
      const matchCat = selectedCategory === "All" || p.category?.toLowerCase() === selectedCategory.toLowerCase();
      return matchSearch && matchBrand && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return Number(a.price) - Number(b.price);
      if (sortBy === "price-high") return Number(b.price) - Number(a.price);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0; // default order
    });

  return (
    <div className="pt-28 pb-28 min-h-screen bg-[#f5f3ef]">
      <div className="container">
        <div className="product-list-shell">
          <div className="product-list-toolbar">
            <div className="search-field w-full lg:max-w-md">
              <HiSearch className="search-field-icon text-slate-400 text-xl" />
              <input
                id="phone-search"
                type="text"
                placeholder="Search models, brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field search-field-input rounded-full shadow-sm bg-white/80 border-slate-200"
              />
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <span className="text-sm font-semibold text-slate-500 hidden sm:inline">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field py-3 px-4 max-w-[220px] rounded-full shadow-sm font-medium text-slate-700 cursor-pointer appearance-none bg-white border-slate-200"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Model Name (A-Z)</option>
              </select>
            </div>
          </div>

          {(search || selectedBrand !== "All" || selectedCategory !== "All") && (
            <div className="product-list-filter-row">
              <span>{filtered.length} items found</span>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedBrand("All");
                  setSelectedCategory("All");
                }}
                className="text-[#1f4f7a] hover:underline font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}

          {loading ? (
            <div className="product-list-empty state-loading">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="product-row-loading" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="product-list-empty">
              <MdSmartphone className="text-6xl text-slate-300 mx-auto" />
              <h3 className="text-slate-900 text-xl font-bold">No items found</h3>
              <p className="text-slate-500 text-sm">
                We couldn't find any phone matching your criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedBrand("All");
                  setSelectedCategory("All");
                }}
                className="btn-secondary mt-4"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="product-list-table-wrap">
              <table className="product-list-table">
                <thead>
                  <tr>
                    <th>Smartphone</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((phone) => (
                    <tr key={phone.id} className="product-list-row">
                      <td className="product-model-cell">
                        <div className="product-model-wrap">
                          <div className="product-list-thumb">
                            <img
                              src={
                                phone.imageUrl ||
                                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"
                              }
                              alt={phone.name}
                              loading="lazy"
                            />
                          </div>
                          <div className="product-model-copy">
                            <h3>{phone.name}</h3>
                            <p>{phone.specs || "Premium smartphone with advanced performance and camera features."}</p>
                          </div>
                        </div>
                      </td>
                      <td className="product-brand-cell">{phone.brand}</td>
                      <td className="product-price-cell">${Number(phone.price).toLocaleString()}</td>
                      <td className="product-stock-cell">
                        <span
                          className={`product-stock-pill ${Number(phone.stock) > 0 ? "in-stock" : "sold-out"}`}
                        >
                          {Number(phone.stock) > 0 ? `${phone.stock} UNITS` : "SOLD OUT"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
