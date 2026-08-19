import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { HiX, HiTrash, HiPlus, HiMinus, HiArrowRight, HiShoppingBag, HiShieldCheck } from "react-icons/hi";
import { toast } from "react-toastify";
import { purchaseProducts } from "../data/productsData";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, subtotal, totalCount } = useCart();

  useEffect(() => {
    if (!isCartOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  async function handleCheckout() {
    try {
      await purchaseProducts(cart);
      toast.success("Order placed successfully! Thank you for shopping with PhoneGenZ.");
      clearCart();
      setIsCartOpen(false);
    } catch (error) {
      toast.error(error.message || "Could not complete your order. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-[40] overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity pointer-events-auto"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 top-[4.75rem] w-full max-w-md pointer-events-auto">
        <div className="h-[calc(100%-4.75rem)] w-full bg-[#0f111e] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#131526]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <HiShoppingBag className="text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
                <p className="text-xs text-slate-400">{totalCount} items selected</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <HiX className="text-2xl" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500 text-3xl">
                  <HiShoppingBag />
                </div>
                <h3 className="text-lg font-bold text-white">Your Cart is Empty</h3>
                <p className="text-slate-400 text-xs max-w-xs mx-auto">
                  Explore our latest flagship smartphones and add your favorites to the cart!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary text-xs px-6 py-2.5 mt-2"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="card p-4 flex gap-4 items-center border border-white/10 bg-[#14172a] hover:border-indigo-500/40 transition-all"
                >
                  <div className="w-20 h-20 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-white/10">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-400 transition-colors p-1"
                        title="Remove"
                      >
                        <HiTrash className="text-base" />
                      </button>
                    </div>

                    <p className="text-xs text-indigo-400 font-semibold">{item.brand}</p>
                    <p className="text-sm font-black text-white">${Number(item.price).toLocaleString()}</p>
                    <p className={`text-xs font-semibold ${Number(item.stock) > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {Number(item.stock) > 0 ? `${item.stock} in stock` : "Out of stock"}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="inline-flex items-center border border-white/15 rounded-lg bg-black/30">
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="p-1.5 text-slate-300 hover:text-white transition-colors"
                        >
                          <HiMinus className="text-xs" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-white">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          disabled={(item.quantity || 1) >= Number(item.stock || 0)}
                          className="p-1.5 text-slate-300 hover:text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <HiPlus className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Info */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#131526] space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Warranty Included</span>
                  <span className="text-indigo-400 font-semibold">1 Year Official</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-base">
                  <span className="font-bold text-white">Estimated Total</span>
                  <span className="font-black text-xl text-white">${subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full justify-center text-sm py-3.5 flex items-center gap-2 shadow-xl shadow-indigo-600/30"
                >
                  Proceed to Checkout <HiArrowRight />
                </button>
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-500 hover:text-red-400 text-center w-full py-1 transition-colors"
                >
                  Empty Cart
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                <HiShieldCheck className="text-indigo-400 text-sm" />
                <span>256-Bit SSL Encrypted Safe Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
