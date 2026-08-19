import { useState } from "react";
import { toast } from "react-toastify";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem("phonegenz_contacts") || "[]");
        stored.push({ ...form, createdAt: new Date().toISOString() });
        localStorage.setItem("phonegenz_contacts", JSON.stringify(stored));
      } catch {}
      toast.success("Message sent successfully! Our specialists will reach out within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 500);
  }

  const contactInfo = [
    {
      icon: HiLocationMarker,
      title: "Flagship Location",
      detail: "Royal University of Phnom Penh\nPhnom Penh, Cambodia",
    },
    {
      icon: HiPhone,
      title: "Phone Support",
      detail: "(+855) 12345678\nMon-Fri: 9am - 6pm",
    },
    {
      icon: HiMail,
      title: "Email Us",
      detail: "chamrenvises6@gmail.com",
    },
  ];

  return (
    <div className="pt-28 pb-28 min-h-screen bg-[#fafafa]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Header Text & Image Column */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-10">
            <div className="space-y-6 max-w-lg">
              <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] text-premium">
                Let's connect. <br />
                We're here for you.
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                Whether you have a question about our latest drops, need help with sizing, or just want to talk tech, our team is ready to assist.
              </p>
            </div>
            
            <div className="h-80 rounded-[32px] overflow-hidden bg-slate-200">
               <img
                  src="https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=1000&auto=format&fit=crop&q=80"
                  alt="Contact Us Support"
                  className="w-full h-full object-cover"
                />
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="card-bordered p-10 sm:p-14 bg-white rounded-[32px]">
              <h2 className="text-3xl font-black text-slate-900 mb-10 text-premium">Send a Message</h2>

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="input-field appearance-none"
                  >
                    <option value="Order Support">Order Support</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Returns">Returns</option>
                    <option value="Warranty">Warranty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    rows={5}
                    className="input-field resize-none rounded-2xl"
                    required
                  />
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full text-lg py-4"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-10 pl-0 lg:pl-10 pt-4">
            <h2 className="text-3xl font-black text-slate-900 mb-8 text-premium">Store Information</h2>
            <div className="space-y-10">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center shrink-0 text-black text-2xl">
                    <info.icon />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-lg mb-1">{info.title}</h3>
                    <p className="text-slate-500 text-base leading-relaxed whitespace-pre-line">{info.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
