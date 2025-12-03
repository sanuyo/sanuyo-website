// ===============================
// GET CATEGORY & SUBCATEGORY
// ===============================

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("cat") || "All Products";
const subcategory = urlParams.get("sub") || null;

document.getElementById("categoryTitle").innerText =
    subcategory ? `${subcategory}` : `${category}`;



// ===============================
// FIREBASE CONNECTION
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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



// ===============================
// LOAD PRODUCTS
// ===============================
async function loadProducts() {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "<p>Loading products...</p>";

    const querySnapshot = await getDocs(collection(db, "products"));

    grid.innerHTML = "";

    querySnapshot.forEach(doc => {
        const p = doc.data();

        // CATEGORY FILTER
        if (category && category !== "All Products" && p.category !== category) return;

        // SUBCATEGORY FILTER
        if (subcategory && p.subcategory !== subcategory) return;

        const item = document.createElement("div");
        item.classList.add("product-item");

        item.innerHTML = `
            <img src="${p.imageUrl}" class="product-img">

            <div class="product-info">
                <h3>${p.title}</h3>
                <p class="price">₦${p.price}</p>
                <p class="loc">${p.location}</p>
            </div>
        `;

        // Go to product page
        item.onclick = () => {
            window.location.href = `product.html?id=${doc.id}`;
        };

        grid.appendChild(item);
    });
}

loadProducts();
