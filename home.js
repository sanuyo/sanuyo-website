import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productGrid = document.getElementById("productGrid");

// Load products
async function loadProducts() {
  productGrid.innerHTML = "";

  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const productId = docSnap.id;

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${data.image || 'https://via.placeholder.com/300'}">
      <div class="product-info">
        <h4>₦${data.price}</h4>
        <p>${data.title}</p>
        <span class="location">📍 ${data.location}</span>
        <span class="views">👁 ${data.views || 0} views</span>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${productId}`;
    });

    productGrid.appendChild(card);
  });
}

loadProducts();
