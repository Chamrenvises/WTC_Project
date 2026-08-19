import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { MdLocalShipping, MdSupportAgent, MdBuild, MdVerified, MdSwapHoriz, MdOutlineSecurity } from "react-icons/md";

export default function Services() {
  const servicesList = [
    {
      title: "Express Doorstep Delivery",
      description: "Fast, insured shipping directly to your home within 1-3 business days. Free shipping on all orders over $500.",
      icon: MdLocalShipping,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      tag: "Express",
    },
    {
      title: "Certified Repair",
      description: "Original OEM screen replacements, battery renewals, and diagnostics by certified technicians.",
      icon: MdBuild,
      image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=800&auto=format&fit=crop&q=80",
      tag: "Certified Lab",
    },
    {
      title: "Instant Trade-In",
      description: "Trade in your current smartphone and receive instant credit towards any brand-new flagship device.",
      icon: MdSwapHoriz,
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&auto=format&fit=crop&q=80",
      tag: "High Value",
    },
    {
      title: "1-Year Warranty",
      description: "Complete coverage against manufacturing defects, screen anomalies, and internal hardware faults.",
      icon: MdOutlineSecurity,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80",
      tag: "Protected",
    },
    {
      title: "24/7 Tech Concierge",
      description: "Expert assistance for device setup, data migration, eSIM activation, and troubleshooting.",
      icon: MdSupportAgent,
      image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=800&auto=format&fit=crop&q=80",
      tag: "Available",
    },
    {
      title: "100% Authenticity",
      description: "Every single phone is inspected, IMEI verified, factory unlocked, and sealed.",
      icon: MdVerified,
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
      tag: "Verified",
    },
  ];

  return (
    <div className="pt-28 pb-28 min-h-screen bg-[#fafafa]">
      
      {/* Hero Section */}
      <div className="container mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text & CTA */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-black text-white text-xs font-bold tracking-widest uppercase">
              Professional Care
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight text-premium">
              Elevate Your Rotation.
            </h1>
            
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              From deep industrial cleaning to bespoke artistic redesigns. We treat your devices with technical precision and artisanal passion.
            </p>
            
            <div className="flex gap-4 pt-4">
              <Link to="/contact" className="btn-primary px-10">
                Book Service
              </Link>
            </div>
          </div>

          {/* Right: Bright Image */}
          <div className="relative">
             <div className="h-96 w-full rounded-[32px] overflow-hidden bg-slate-100">
               <img
                  src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1000&auto=format&fit=crop&q=80"
                  alt="Professional Services"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="container">
        <div className="mb-16 space-y-4 max-w-2xl">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight text-premium">Choose Your Device Care</h2>
          <p className="text-slate-500 text-lg font-medium">Explore our services managed by our expert tech team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.title}
              className="card-bordered overflow-hidden group hover:shadow-xl transition-all flex flex-col justify-between bg-white rounded-[24px]"
            >
              <div className="h-64 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-gray bg-white/90 backdrop-blur-md">
                    {service.tag}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center text-black text-xl mb-6">
                  <service.icon />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
