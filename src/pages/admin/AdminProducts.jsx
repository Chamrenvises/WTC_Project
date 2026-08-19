import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { HiPlus, HiPencil, HiTrash, HiSearch, HiX, HiUpload, HiPhotograph } from "react-icons/hi";
import { MdSmartphone } from "react-icons/md";
import {
  DEFAULT_PRODUCTS,
  getLocalProducts,
  saveLocalProduct,
  deleteLocalProduct,
  seedProducts,
  subscribeToProducts,
  getCatalogOptions,
  subscribeToCatalogOptions,
  saveCatalogOption,
  deleteCatalogOption,
} from "../../data/productsData";

function ProductModal({ open, onClose, onSave, initial, brands, categories }) {
  const [form, setForm] = useState(
    initial || { name: "", brand: "Apple", price: "", stock: "20", category: "Flagship", specs: "", description: "", imageUrl: "" }
  );
  const [preview, setPreview] = useState(initial?.imageUrl || "");
  const [previewError, setPreviewError] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    setForm(
      initial || {
        name: "",
        brand: "Apple",
        price: "",
        stock: "20",
        category: "Flagship",
        specs: "",
        description: "",
        imageUrl: "",
      }
    );
    setPreview(initial?.imageUrl || "");
    setPreviewError(false);
    setImageFile(null);
  }, [initial, open]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "imageUrl") {
      setPreview(value);
      setPreviewError(false);
    }
  }

  function handleImageFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setPreviewError(false);
      setImageFile(file);
      setForm((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price || !form.brand) {
      toast.error("Phone Name, Brand, and Price are required.");
      return;
    }
    onSave({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock || 0),
      imageFile,
      imageUrl:
        preview ||
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="modal-overlay bg-slate-900/60 backdrop-blur-sm">
      <div className="modal-content max-w-xl bg-white shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900">
            {initial ? "Edit Smartphone Model" : "Add New Smartphone"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 transition-colors p-1"
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Preview & URL input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Product Photo (URL or File)
            </label>
            <div className="flex gap-4 items-center">
              <div
                className="w-24 h-24 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center cursor-pointer hover:border-[#f94f25] transition-colors shrink-0 shadow-sm"
                onClick={() => fileRef.current?.click()}
                title="Click to select image file"
              >
                {preview && !previewError ? (
                  <img
                    src={preview}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                    onError={() => setPreviewError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-center px-2">
                    <HiPhotograph className="text-3xl text-slate-300" />
                    {previewError && <span className="text-[10px] font-semibold text-slate-400">Preview unavailable</span>}
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="url"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="input-field text-xs py-2.5 border-slate-200"
                />
                <p className="text-[11px] text-slate-400">Use a direct image link, or choose a file from your device.</p>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <HiUpload /> Choose Image
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Smartphone Model Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. iPhone 15 Pro Max"
                className="input-field text-sm border-slate-200"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Brand *</label>
              <select
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="input-field text-sm border-slate-200"
                required
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Category / Tier</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input-field text-sm border-slate-200"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Price ($ USD) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="1199"
                className="input-field text-sm border-slate-200"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Stock Units</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="25"
                className="input-field text-sm border-slate-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Key Technical Specifications
              </label>
              <input
                name="specs"
                value={form.specs}
                onChange={handleChange}
                placeholder="A17 Pro · 6.7'' OLED · 48MP Camera"
                className="input-field text-sm border-slate-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Detailed description of features, condition, warranty..."
                rows={3}
                className="input-field text-sm resize-none border-slate-200"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center text-sm py-2.5 bg-white border-slate-200 hover:bg-slate-50 text-slate-700">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1 justify-center text-sm py-2.5 bg-slate-900 hover:bg-slate-800 border-none shadow-md">
              {initial ? "Save Changes" : "Create Smartphone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [catalogOptions, setCatalogOptions] = useState(getCatalogOptions);
  const [optionType, setOptionType] = useState("brands");
  const [optionName, setOptionName] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((list) => {
      if (list.length === 0) {
        const localProducts = getLocalProducts();
        setProducts(localProducts);
        seedProducts(localProducts.length ? localProducts : DEFAULT_PRODUCTS).catch(() => {});
        return;
      }
      setProducts(list);
    });
    return unsubscribe;
  }, []);

  useEffect(() => subscribeToCatalogOptions(setCatalogOptions), []);

  async function handleAddOption(e) {
    e.preventDefault();
    if (!optionName.trim()) return;
    try {
      const updated = await saveCatalogOption(optionType, optionName);
      setCatalogOptions(updated);
      setOptionName("");
      toast.success(`${optionType === "brands" ? "Brand" : "Category / Tier"} added.`);
    } catch (error) {
      toast.error(error?.message || "Could not save this option.");
    }
  }

  async function handleDeleteOption(type, option) {
    if (!window.confirm(`Remove ${option} from the available options? Existing products will not change.`)) return;
    try {
      const updated = await deleteCatalogOption(type, option);
      setCatalogOptions(updated);
    } catch (error) {
      toast.error(error?.message || "Could not remove this option.");
    }
  }

  async function handleSave(data) {
    try {
      await saveLocalProduct(editing ? { ...editing, ...data } : data);
      toast.success(editing ? "Phone updated successfully!" : "New phone added to inventory!");
      setEditing(null);
    } catch (error) {
      // surface the underlying error when possible for easier debugging
      // eslint-disable-next-line no-console
      console.error("Failed saving product:", error);
      toast.error(error?.message || "Could not save the phone. Check your connection and try again.");
    }
  }

  async function handleDelete(id, name) {
    if (window.confirm(`Are you sure you want to delete "${name}" from inventory?`)) {
      try {
        await deleteLocalProduct(id);
        toast.success(`"${name}" removed from inventory.`);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed deleting product:", error);
        toast.error(error?.message || "Could not delete the phone. Check your connection and try again.");
      }
    }
  }

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(p) {
    setEditing(p);
    setModalOpen(true);
  }

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Smartphones Inventory</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Manage your store's phones, prices, stock levels, and product photos.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm px-6 py-3 flex items-center gap-2 shadow-md shadow-[#f94f25]/20">
          <HiPlus className="text-lg" /> Add Smartphone
        </button>
      </div>

      <div className="card p-5 sm:p-6 border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div>
            <h2 className="text-lg font-black text-slate-900">Catalog options</h2>
            <p className="text-sm text-slate-500 mt-1">Add brands and category tiers for product creation.</p>
          </div>
          <form onSubmit={handleAddOption} className="flex flex-col sm:flex-row gap-2 w-full lg:max-w-xl">
            <select value={optionType} onChange={(e) => setOptionType(e.target.value)} className="input-field text-sm sm:max-w-[170px]">
              <option value="brands">Brand</option>
              <option value="categories">Category / Tier</option>
            </select>
            <input value={optionName} onChange={(e) => setOptionName(e.target.value)} placeholder="e.g. Nothing or Premium" className="input-field text-sm flex-1" />
            <button type="submit" className="btn-primary text-sm px-4 py-2.5"><HiPlus /> Add</button>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 pt-5 border-t border-slate-100">
          {["brands", "categories"].map((type) => (
            <div key={type}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{type === "brands" ? "Brands" : "Category / Tier"}</p>
              <div className="flex flex-wrap gap-2">
                {catalogOptions[type].map((option) => (
                  <span key={option} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    {option}
                    <button type="button" onClick={() => handleDeleteOption(type, option)} className="text-slate-400 hover:text-red-500" title={`Remove ${option}`}><HiX /></button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card overflow-hidden border border-slate-200 bg-white shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
          <div className="search-field max-w-sm w-full">
            <HiSearch className="search-field-icon text-slate-400" />
            <input
              type="text"
              placeholder="Search by phone name or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field search-field-input py-2.5 text-xs bg-white border-slate-200"
            />
          </div>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Total Inventory: {products.length} models
          </span>
        </div>

        <div className="table-container">
          {filtered.length === 0 ? (
            <div className="p-20 text-center space-y-3">
              <MdSmartphone className="text-5xl text-slate-300 mx-auto" />
              <p className="text-slate-500 text-sm font-medium">No smartphones found.</p>
              <button onClick={openAdd} className="btn-primary text-xs px-5 py-2.5 mt-2">
                Add Your First Phone
              </button>
            </div>
          ) : (
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th className="col-model">Smartphone Model</th>
                  <th className="col-brand">Brand</th>
                  <th className="col-category">Category</th>
                  <th className="col-price">Price</th>
                  <th className="col-stock">Stock Status</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="admin-product-row">
                    <td className="col-model">
                      <div className="admin-product-model">
                        <div className="admin-product-image">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <MdSmartphone className="text-slate-400 text-xl" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="admin-product-name">{p.name}</p>
                          {p.specs && <p className="admin-product-specs">{p.specs}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="col-brand">
                      <span className="admin-text-strong">{p.brand}</span>
                    </td>
                    <td className="col-category">
                      <span className="admin-category-badge">{p.category || "General"}</span>
                    </td>
                    <td className="col-price">
                      <span className="admin-price">${Number(p.price).toLocaleString()}</span>
                    </td>
                    <td className="col-stock">
                      <span
                        className={`admin-stock-badge ${
                          Number(p.stock) > 0 ? "success" : "danger"
                        }`}
                      >
                        {Number(p.stock) > 0 ? `${p.stock} in stock` : "Out of stock"}
                      </span>
                    </td>
                    <td className="col-actions">
                      <div className="admin-actions">
                        <button
                          onClick={() => openEdit(p)}
                          className="admin-action-btn edit"
                          title="Edit Phone"
                        >
                          <HiPencil className="text-base" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="admin-action-btn delete"
                          title="Delete Phone"
                        >
                          <HiTrash className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ProductModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initial={editing}
        brands={catalogOptions.brands}
        categories={catalogOptions.categories}
      />
    </div>
  );
}
