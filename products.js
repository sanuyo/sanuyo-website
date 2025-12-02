// ===========================
// PRODUCT DATA
// ===========================

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headset",
    price: 8500,
    image: "images/headset.jpg",
    category: "electronics",
    description: "High-quality Bluetooth headset with noise cancellation."
  },
  {
    id: 2,
    name: "Ladies Handbag",
    price: 12000,
    image: "images/handbag.jpg",
    category: "fashion",
    description: "Elegant handbag perfect for outings and events."
  },
  {
    id: 3,
    name: "Running Sneakers",
    price: 15000,
    image: "images/shoes.jpg",
    category: "fashion",
    description: "Comfortable and durable sneakers for sports and daily wear."
  },
  {
    id: 4,
    name: "Smartphone Power Bank 20,000mAh",
    price: 10500,
    image: "images/powerbank.jpg",
    category: "electronics",
    description: "Fast-charging high-capacity power bank."
  },
  {
    id: 5,
    name: "Non-stick Cooking Pot Set",
    price: 32000,
    image: "images/cookingpot.jpg",
    category: "home",
    description: "Durable and easy-to-clean non-stick pot set."
  }
];

// ===========================
// FILTER BY CATEGORY
// ===========================

function getProductsByCategory(category) {
  if (category === "all") {
    return products;
  }
  return products.filter(item => item.category === category);
}

// ===========================
// SEARCH PRODUCTS
// ===========================

function searchProducts(query) {
  const q = query.toLowerCase();
  return products.filter(item => item.name.toLowerCase().includes(q));
}

// ===========================
// EXPORT (for other scripts)
// ===========================

export { products, getProductsByCategory, searchProducts };
