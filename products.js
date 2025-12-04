// Simulated database import
import { products } from "./products.js";

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Find the product
const product = products.find(p => p.id == productId);

// Display product
document.getElementById("product-image").src = product.image;
document.getElementById("product-title").textContent = product.title;
document.getElementById("product-price").textContent = "₦" + product.price.toLocaleString();
document.getElementById("product-location").textContent = "Location: " + product.location;
document.getElementById("product-date").textContent = "Posted: " + product.date;
document.getElementById("product-description").textContent = product.description;

// Seller Info
document.getElementById("seller-name").textContent = "Seller: " + product.sellerName;
document.getElementById("seller-phone").textContent = "Phone: " + product.sellerPhone;

// Call Seller
document.getElementById("call-btn").addEventListener("click", () => {
  window.location.href = `tel:${product.sellerPhone}`;
});

// Message Seller (WhatsApp)
document.getElementById("message-btn").addEventListener("click", () => {
  const message = encodeURIComponent(`Hello, I saw your product "${product.title}" on SM Market.`);
  window.location.href = `https://wa.me/${product.sellerPhone}?text=${message}`;
});

// Similar products
const similarCtn = document.getElementById("similar-container");

products
  .filter(p => p.category === product.category && p.id !== product.id)
  .slice(0, 4)
  .forEach(sim => {
    let card = document.createElement("div");
    card.className = "similar-card";
    card.innerHTML = `
      <img src="${sim.image}">
      <p>${sim.title}</p>
      <p>₦${sim.price.toLocaleString()}</p>
    `;
    card.onclick = () => {
      window.location.href = `product.html?id=${sim.id}`;
    };
    similarCtn.appendChild(card);
  });
