import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { app } from "./firebase.js";

const db = getFirestore(app);
const productGrid = document.getElementById("productGrid");

async function loadProducts() {
    productGrid.innerHTML = "";
    const q = collection(db, "products");
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        const product = doc.data();
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price} ₦</p>
            ${product.urgent ? `<span class="badge urgent">URGENT</span>` : ""}
            ${product.negotiable ? `<span class="badge negotiable">NEGOTIABLE</span>` : ""}
            <div class="product-actions">
                <a href="tel:${product.phone}" class="btn-call">Call</a>
                <a href="https://wa.me/${product.phone}?text=Hi, I'm interested in ${product.title}" class="btn-whatsapp">WhatsApp</a>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

loadProducts();
