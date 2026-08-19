import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

const CART_STORAGE_KEY = "phonegenz_cart";

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  function addToCart(product, quantity = 1) {
    if (!currentUser) {
      toast.info("Please sign in before adding items to your cart.");
      return;
    }

    const available = Number(product.stock ?? 0);
    if (available <= 0) {
      toast.error(`${product.name} is out of stock.`);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const nextQuantity = (existing?.quantity || 0) + quantity;
      if (nextQuantity > available) {
        toast.info(`Only ${available} ${product.name} available.`);
        return prev;
      }
      if (existing) {
        toast.info(`Increased ${product.name} quantity in cart (${nextQuantity})`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, ...product, quantity: nextQuantity } : item
        );
      } else {
        toast.success(`Added ${product.name} to your cart!`);
        return [...prev, { ...product, quantity }];
      }
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    toast.info("Item removed from cart");
  }

  function updateQuantity(productId, newQty) {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => prev.map((item) => {
      if (item.id !== productId) return item;
      const available = Number(item.stock ?? 0);
      if (newQty > available) {
        toast.info(`Only ${available} ${item.name} available.`);
        return item;
      }
      return { ...item, quantity: newQty };
    }));
  }

  function clearCart() {
    setCart([]);
  }

  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
