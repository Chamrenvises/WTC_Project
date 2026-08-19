import { Link } from "react-router-dom";
import { HiCheckCircle, HiLightningBolt, HiHeart } from "react-icons/hi";
import { MdStorefront } from "react-icons/md";

export default function About() {
  const values = [
    {
      icon: HiCheckCircle,
      title: "100% Authenticity",
      description: "Direct from factories. Zero clones.",
    },
    {
      icon: HiLightningBolt,
      title: "Innovation First",
      description: "Latest flagships within days of global launches.",
    },
    {
      icon: HiHeart,
      title: "Customer Dedication",
      description: "Firmware advice, warranty claims, and repairs.",
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-[#fafafa]">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-white py-24 sm:py-32 border-b border-[#eaeaea]">
        <div className="container relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter text-premium">
              Redesigning The Mobile Experience.
            </h1>
            <p className="text-slate-500 text-lg sm:text-xl font-medium">
              PhoneGenZ was founded on a singular obsession: simple, authentic, and high-performance devices.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container py-20">
        <div className="card-bordered p-10 sm:p-16 bg-white rounded-[32px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f5f7] text-slate-700 text-sm font-semibold">
                <MdStorefront className="text-lg text-slate-900" /> Established 2019
              </div>
              <h2 className="text-4xl font-black text-slate-900 leading-tight">
                Connecting People to the Future.
              </h2>
              <div className="space-y-6 text-slate-500 text-lg leading-relaxed">
                <p>
                  PhoneGenZ started with a simple belief: finding the perfect smartphone shouldn't be confusing or stressful.
                </p>
                <p>
                  Today, we have grown into a trusted destination for mobile lovers across the globe, offering genuine devices from Apple, Samsung, Google, and more.
                </p>
              </div>

              <div className="flex gap-10 pt-6">
                <div>
                  <div className="text-3xl font-black text-slate-900">50K+</div>
                  <div className="text-sm text-slate-500 font-semibold mt-1">Users</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">100%</div>
                  <div className="text-sm text-slate-500 font-semibold mt-1">Original</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="h-96 w-full rounded-[24px] overflow-hidden bg-[#f5f5f7]">
                <img
                  src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1000&auto=format&fit=crop&q=80"
                  alt="PhoneGenZ Store"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="container pb-24">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl font-black text-slate-900">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="card-bordered p-10 space-y-6 bg-white rounded-[24px]">
              <div className="w-14 h-14 rounded-full bg-[#f5f5f7] flex items-center justify-center text-black text-2xl">
                <v.icon />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{v.title}</h3>
              <p className="text-slate-500 text-base leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
