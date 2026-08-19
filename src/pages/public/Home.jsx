import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiStar, HiShoppingBag, HiCheckCircle } from "react-icons/hi";
import { MdLocalShipping, MdSupportAgent, MdSwapHoriz } from "react-icons/md";
import { getLocalProducts } from "../../data/productsData";
import { useCart } from "../../context/CartContext";

export default function Home() {
  const [featuredPhones, setFeaturedPhones] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const all = getLocalProducts();
    setFeaturedPhones(all.slice(0, 4));
  }, []);

  const features = [
    {
      icon: MdLocalShipping,
      title: "Free Express Delivery",
      description: "Insured, tracked 1-3 day doorstep delivery.",
    },
    {
      icon: HiCheckCircle,
      title: "1-Year Warranty",
      description: "Complete manufacturing defect protection.",
    },
    {
      icon: MdSwapHoriz,
      title: "Value Trade-In",
      description: "Trade your current phone for instant store credit.",
    },
    {
      icon: MdSupportAgent,
      title: "24/7 Tech Support",
      description: "Expert setup, data transfer, and assistance.",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1920&q=80"
            alt="Samsung Galaxy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container relative z-10 text-center text-white space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-premium">
            The Future is Here.
          </h1>
          <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90">
            Experience the pinnacle of mobile technology. Pre-order the latest flagship devices today.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="btn-buy px-10 py-4 text-lg">
              Shop Now
            </Link>
            <Link to="/about" className="btn-secondary bg-white/10 text-white hover:bg-white/20 border border-white/20 px-10 py-4 text-lg backdrop-blur-md">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Smartphones Grid */}
      <section className="section bg-[#fafafa]">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight text-premium">
                Latest Models
              </h2>
              <p className="text-slate-500 text-lg">
                The best devices from Apple, Samsung, Google and more.
              </p>
            </div>
            <Link to="/products" className="text-black font-semibold hover:text-[#0066cc] flex items-center gap-2 transition-colors">
              View all models <HiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPhones.map((phone) => (
              <div
                key={phone.id}
                className="card card-bordered group flex flex-col justify-between overflow-hidden"
              >
                {/* Photo container */}
                <div className="h-72 w-full bg-[#f5f5f7] relative overflow-hidden flex items-center justify-center p-6">
                  <img
                    src={phone.imageUrl}
                    alt={phone.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-gray uppercase tracking-wider">
                      {phone.brand}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between bg-white flex-1">
                  <div className="space-y-1 mb-6">
                    <h3 className="text-xl font-bold text-slate-900 line-clamp-1">
                      {phone.name}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2">
                      {phone.specs}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-auto">
                    <span className="text-2xl font-black text-slate-900">
                      ${phone.price.toLocaleString()}
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
        </div>
      </section>

      {/* Services & Guarantees */}
      <section className="section-sm bg-white border-t border-[#eaeaea]">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature) => (
              <div key={feature.title} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto text-black text-2xl">
                  <feature.icon />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
