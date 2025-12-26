import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const productGrid = document.getElementById("productGrid");

async function loadProducts() {
  productGrid.innerHTML = "";
  const q = query(collection(db, "products"), orderBy("timestamp", "desc"), limit(20));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${data.images[0]}" alt="${data.title}">
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      <p>₦${data.price}</p>
      <p>${data.location}</p>
      <p>Tags: ${data.tags.join(", ")}</p>
      <a href="product.html?id=${doc.id}">View Details</a>
    `;
    productGrid.appendChild(div);
  });
}

loadProducts();
