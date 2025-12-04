// -------------------------
// FIREBASE IMPORTS
// -------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// -------------------------
// FIREBASE CONFIG
// -------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website",
  storageBucket: "sanuyo-website.firebasestorage.app",
  messagingSenderId: "765213630366",
  appId: "1:765213630366:web:03279e61a58289b088808f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -------------------------
// LOAD PRODUCTS
// -------------------------
async function loadProducts() {
  const productGrid = document.getElementById("productGrid");

  let q = query(collection(db, "products"), orderBy("timestamp", "desc"));

  const snapshot = await getDocs(q);

  let items = [];
  snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));

  // -------------------------
  // APPLY FILTERS
  // -------------------------
  const params = new URLSearchParams(window.location.search);

  const min = params.get("min");
  const max = params.get("max");
  const condition = params.get("condition");
  const location = params.get("location");
  const category = params.get("cat");
  const subCategory = params.get("sub");
  const sortBy = params.get("sort");

  // Price filter
  if (min) items = items.filter(p => Number(p.price) >= Number(min));
  if (max) items = items.filter(p => Number(p.price) <= Number(max));

  // Condition filter
  if (condition) items = items.filter(p => p.condition === condition);

  // Location filter
  if (location) items = items.filter(p => p.location === location);

  // Category filter
  if (category) items = items.filter(p => p.category === category);

  // Sub-category filter
  if (subCategory) items = items.filter(p => p.subCategory === subCategory);

  // -------------------------
  // SORTING
  // -------------------------
  if (sortBy === "low") {
    items.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "high") {
    items.sort((a, b) => b.price - a.price);
  }

  // "latest" is already handled by Firestore orderBy

  // -------------------------
  // DISPLAY PRODUCTS
  // -------------------------
  productGrid.innerHTML = "";

  if (items.length === 0) {
    productGrid.innerHTML = `
      <p style="text-align:center; width:100%; color:#666; margin-top:20px;">
        No products match your filters.
      </p>`;
    return;
  }

  items.forEach(p => {
    productGrid.innerHTML += `
      <div class="product-card" onclick="window.location.href='product.html?id=${p.id}'">
        
        <img src="${p.image1}" class="prod-img">

        <div class="prod-info">
          <h3 class="prod-title">${p.title}</h3>
          <p class="prod-price">₦${Number(p.price).toLocaleString()}</p>
          <p class="prod-location">${p.location}</p>
        </div>

      </div>
    `;
  });
}

loadProducts();
