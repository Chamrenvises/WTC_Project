const PRODUCTS_STORAGE_KEY = "phonezone_products";

export const DEFAULT_PRODUCTS = [
  {
    id: "phone-1",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "Flagship",
    price: 1199,
    stock: 25,
    specs: "A17 Pro · 6.7\" Super Retina XDR · 48MP Camera",
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.",
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    badge: "New",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "phone-2",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Flagship",
    price: 1299,
    stock: 18,
    specs: "Snapdragon 8 Gen 3 · 6.8\" Dynamic AMOLED · 200MP",
    description: "Unleash new levels of creativity, productivity, and possibility with Galaxy AI on a stunning titanium frame with built-in S Pen.",
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
    badge: "Best Seller",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "phone-3",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    category: "Flagship",
    price: 999,
    stock: 14,
    specs: "Google Tensor G3 · 6.7\" Super Actua · 50MP",
    description: "Engineered by Google, Pixel 8 Pro has pro-level cameras, extraordinary AI photo editing, and all-day battery life.",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
    badge: "Top Rated",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: "phone-4",
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    category: "Flagship",
    price: 1099,
    stock: 10,
    specs: "Leica Quad Camera · 6.73\" WQHD+ · Snapdragon 8 Gen 3",
    description: "Co-engineered with Leica, featuring a legendary 1-inch sensor and four focal length master optics for breathtaking photography.",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    badge: "Hot",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "phone-5",
    name: "OnePlus 12",
    brand: "OnePlus",
    category: "Flagship",
    price: 799,
    stock: 20,
    specs: "Snapdragon 8 Gen 3 · 6.82\" 2K ProXDR · 5400mAh",
    description: "Fast and Smooth experience defined. Powered by 4th Gen Hasselblad Camera system and ultra-fast 100W SUPERVOOC charging.",
    imageUrl: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80",
    badge: "Value King",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: "phone-6",
    name: "iPhone 15",
    brand: "Apple",
    category: "Mid-range",
    price: 799,
    stock: 35,
    specs: "A16 Bionic · 6.1\" Super Retina · Dynamic Island",
    description: "Dynamic Island, 48MP Main camera, and durable color-infused glass and aluminum design in a compact form.",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
    badge: "Popular",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

export function getLocalProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    return parsed;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function saveLocalProduct(productData) {
  const products = getLocalProducts();
  if (productData.id) {
    // Update existing
    const updated = products.map((p) =>
      p.id === productData.id ? { ...p, ...productData, updatedAt: new Date().toISOString() } : p
    );
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    return productData;
  } else {
    // Add new
    const newProduct = {
      ...productData,
      id: `phone-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    return newProduct;
  }
}

export function deleteLocalProduct(productId) {
  const products = getLocalProducts();
  const filtered = products.filter((p) => p.id !== productId);
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(filtered));
  return true;
}
