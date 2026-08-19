import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { HiPlus, HiPencil, HiTrash, HiX } from "react-icons/hi";
import { MdMiscellaneousServices } from "react-icons/md";

const DEFAULT_SERVICES = [
  {
    id: "srv-1",
    title: "Express Doorstep Delivery",
    description: "Insured 1-3 day delivery nationwide with real-time tracking.",
  },
  {
    id: "srv-2",
    title: "Certified Smartphone Repair",
    description: "OEM screen replacements, battery swaps, and diagnostics by certified technicians.",
  },
  {
    id: "srv-3",
    title: "Instant Trade-In Program",
    description: "Trade in your older smartphone for immediate store credit towards any new flagship.",
  },
  {
    id: "srv-4",
    title: "1-Year Official Warranty Coverage",
    description: "Comprehensive hardware defect protection with quick replacement service.",
  },
];

const SERVICES_KEY = "phonegenz_services";

function getServices() {
  try {
    const raw = localStorage.getItem(SERVICES_KEY);
    if (!raw) {
      localStorage.setItem(SERVICES_KEY, JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SERVICES;
  }
}

function saveServices(list) {
  try {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
}

function ServiceModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || { title: "", description: "" });

  useEffect(() => {
    setForm(initial || { title: "", description: "" });
  }, [initial, open]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Title and description are required");
      return;
    }
    onSave(form);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="modal-overlay bg-slate-900/60 backdrop-blur-sm">
      <div className="modal-content max-w-md bg-white shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900">
            {initial ? "Edit Service Offering" : "Add New Service"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors p-1">
            <HiX className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Service Title *</label>
            <input
              id="service-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Express Battery Replacement"
              className="input-field py-2.5 text-sm border-slate-200"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description *</label>
            <textarea
              id="service-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Detailed description of coverage and turnaround time..."
              rows={4}
              className="input-field text-sm resize-none border-slate-200"
              required
            />
          </div>
          <div className="flex gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center text-sm py-2.5 bg-white border-slate-200 hover:bg-slate-50 text-slate-700">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1 justify-center text-sm py-2.5 bg-slate-900 hover:bg-slate-800 border-none shadow-md">
              {initial ? "Save Changes" : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  function loadServices() {
    setServices(getServices());
  }

  useEffect(() => {
    loadServices();
  }, []);

  function handleSave(data) {
    const list = getServices();
    if (editing) {
      const updated = list.map((s) => (s.id === editing.id ? { ...s, ...data } : s));
      saveServices(updated);
      toast.success("Service updated successfully!");
    } else {
      const newSrv = { ...data, id: `srv-${Date.now()}` };
      list.push(newSrv);
      saveServices(list);
      toast.success("New service added!");
    }
    setEditing(null);
    loadServices();
  }

  function handleDelete(service) {
    if (window.confirm(`Delete service "${service.title}"?`)) {
      const list = getServices();
      const updated = list.filter((s) => s.id !== service.id);
      saveServices(updated);
      toast.success("Service deleted");
      loadServices();
    }
  }

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(s) {
    setEditing(s);
    setModalOpen(true);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Store Services & Repairs</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Manage repair packages, trade-in tiers, and customer assistance offerings.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm px-6 py-3 flex items-center gap-2 shadow-md shadow-[#f94f25]/20">
          <HiPlus className="text-lg" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.id} className="card p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-slate-900 font-bold text-lg">{s.title}</h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openEdit(s)}
                    className="p-2 rounded-lg bg-slate-50 text-slate-500 border border-slate-200 hover:text-[#0056ff] hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm"
                    title="Edit Service"
                  >
                    <HiPencil />
                  </button>
                  <button
                    onClick={() => handleDelete(s)}
                    className="p-2 rounded-lg bg-red-50 text-red-500 border border-red-100 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all shadow-sm"
                    title="Delete Service"
                  >
                    <HiTrash />
                  </button>
                </div>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      <ServiceModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  );
}
