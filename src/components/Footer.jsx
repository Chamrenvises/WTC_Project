import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker, HiShieldCheck } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="border-t border-[#eaeaea] bg-white text-slate-600">
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-0">
              <span className="text-3xl font-black text-slate-900 tracking-tighter text-premium">PhoneGenZ.</span>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
              Your premier destination for certified flagship smartphones, factory-sealed devices, and expert repair services.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FaFacebook, href: "#", label: "Facebook" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaYoutube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center text-slate-600 hover:text-white hover:bg-black transition-all"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { to: "/", label: "Home Store" },
                { to: "/products", label: "All Smartphones" },
                { to: "/services", label: "Care & Services" },
                { to: "/about", label: "About PhoneGenZ" },
                { to: "/contact", label: "Customer Support" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-500 hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Brands */}
          <div className="space-y-6">
            <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider">Brands</h3>
            <ul className="space-y-4 text-sm font-medium">
              {["Apple", "Samsung", "Google", "Xiaomi", "OnePlus"].map(
                (brand) => (
                  <li key={brand}>
                    <Link to="/products" className="text-slate-500 hover:text-black transition-colors">
                      {brand}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-slate-400 text-lg mt-0.5 shrink-0" />
                <span className="text-slate-500">
                  Phnom Penh City
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="text-slate-400 text-lg shrink-0" />
                <span className="text-slate-500">(+855) 12345678</span>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="text-slate-400 text-lg shrink-0" />
                <span className="text-slate-500">support@phonegenz.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#eaeaea] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <p>© {new Date().getFullYear()} PhoneGenZ Store. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-600">
            <HiShieldCheck className="text-lg text-black" />
            <span>100% Genuine Certified Smartphones</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
