import { useState, useEffect } from "react";
import { HiSearch, HiShoppingBag } from "react-icons/hi";
import { MdSmartphone } from "react-icons/md";
import { getLocalProducts } from "../../data/productsData";
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
    const list = getLocalProducts();
    setPhones(list);
    setLoading(false);
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
    <div className="pt-28 pb-28 min-h-screen bg-[#fafafa]">
      
      {/* Header */}
      <div className="container mb-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto py-12">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight text-premium">
            Store
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium">
            The latest models, fully unlocked. Ready to ship.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Controls & Filter Bar */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="search-field w-full lg:max-w-md">
              <HiSearch className="search-field-icon text-slate-400 text-xl" />
              <input
                id="phone-search"
                type="text"
                placeholder="Search models, brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field search-field-input rounded-full shadow-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <span className="text-sm text-slate-500 font-semibold hidden sm:inline">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field py-3 px-4 max-w-[200px] rounded-full shadow-sm font-medium text-slate-700 cursor-pointer appearance-none bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Model Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
            {/* Brands */}
            <div className="flex flex-wrap items-center gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedBrand === brand
                      ? "bg-black text-white shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            <div className="hidden sm:block w-px h-6 bg-slate-200"></div>

            {/* Category */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-slate-800 text-white shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-sm font-medium text-slate-500">
          <span>{filtered.length} items found</span>
          {(search || selectedBrand !== "All" || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedBrand("All");
                setSelectedCategory("All");
              }}
              className="text-[#0066cc] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-6 animate-pulse space-y-4 bg-white border-none shadow-sm">
                <div className="h-72 bg-[#f5f5f7] rounded-xl"></div>
                <div className="h-6 bg-[#f5f5f7] rounded w-1/2"></div>
                <div className="h-4 bg-[#f5f5f7] rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-bordered p-16 text-center max-w-lg mx-auto space-y-4 bg-white rounded-3xl">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((phone) => (
              <div
                key={phone.id}
                className="card card-bordered group flex flex-col justify-between overflow-hidden bg-white"
              >
                {/* Photo container */}
                <div className="h-80 w-full bg-[#f5f5f7] relative overflow-hidden flex items-center justify-center p-8">
                  <img
                    src={
                      phone.imageUrl ||
                      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"
                    }
                    alt={phone.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="badge badge-gray uppercase tracking-wider shadow-sm bg-white/80 backdrop-blur">
                      {phone.brand}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 line-clamp-1">
                      {phone.name}
                    </h3>
                    {phone.specs && (
                      <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                        {phone.specs}
                      </p>
                    )}
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between gap-4 mt-auto">
                    <span className="text-3xl font-black text-slate-900">
                      ${Number(phone.price).toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(phone)}
                      className="btn-buy"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
