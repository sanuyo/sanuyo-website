import { getFirestore, collection, getDocs, query, orderBy }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { app } from "./firebase-config.js";

console.log("✅ home.js running");

const db = getFirestore(app);
const productGrid = document.getElementById("productGrid");

async function loadProducts() {
  try {
    const q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    console.log("📦 Products:", snapshot.size);

    if (snapshot.empty) {
      productGrid.innerHTML = "<p>No ads yet</p>";
      return;
    }

    productGrid.innerHTML = "";

    snapshot.forEach(doc => {
      const d = doc.data();

      const image =
        Array.isArray(d.images) && d.images.length > 0
          ? d.images[0]
          : "https://via.placeholder.com/300x200?text=No+Image";

      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${image}" />
        <div class="card-body">
          <h3>${d.title}</h3>
          <p class="price">₦${d.price.toLocaleString()}</p>
          <p class="location">${d.location}</p>
          <div class="tags">
            ${(d.tags || []).map(t => `<span>#${t}</span>`).join("")}
          </div>
        </div>
      `;

      productGrid.appendChild(card);
    });

  } catch (e) {
    console.error("❌ Load error:", e);
    productGrid.innerHTML = "<p>Error loading ads</p>";
  }
}

loadProducts();
