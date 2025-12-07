// ===============================
// HOME.JS – JIJI STYLE HOMEPAGE
// ===============================

// Firebase Setup
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ===============
// LOAD CATEGORIES
// ===============
async function loadCategories() {
    const categoryBox = document.getElementById("category-list");
    categoryBox.innerHTML = `<p class="loading">Loading categories...</p>`;

    const querySnapshot = await getDocs(collection(db, "categories"));

    categoryBox.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const data = doc.data();

        const item = document.createElement("div");
        item.className = "category-card";

        item.innerHTML = `
            <div class="icon">${data.icon || "📦"}</div>
            <p>${data.name}</p>
        `;

        item.onclick = () => {
            localStorage.setItem("selectedCategory", doc.id);
            window.location.href = "subcategories.html";
        };

        categoryBox.appendChild(item);
    });
}

// =====================
// LOAD RECENT PRODUCTS
// =====================
async function loadProducts() {
    const productsBox = document.getElementById("products-box");
    productsBox.innerHTML = `<p class='loading'>Loading products...</p>`;

    const productSnap = await getDocs(collection(db, "products"));

    productsBox.innerHTML = "";

    productSnap.forEach((doc) => {
        const p = doc.data();

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${p.images?.[0] || 'default.jpg'}" class="product-img">
            <p class="product-title">${p.title}</p>
            <p class="product-price">₦${p.price}</p>
            <p class="product-location">${p.location || "Unknown"}</p>
        `;

        card.onclick = () => {
            localStorage.setItem("selectedProduct", doc.id);
            window.location.href = "product.html";
        };

        productsBox.appendChild(card);
    });
}

// ==================
// SEARCH SYSTEM
// ==================
document.getElementById("searchBtn").onclick = function () {
    const query = document.getElementById("searchInput").value.trim();
    
    if (query === "") return;

    localStorage.setItem("searchQuery", query);
    window.location.href = "search.html";
};

// Start homepage
loadCategories();
loadProducts();
