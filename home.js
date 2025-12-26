import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { app } from "./firebase-config.js";

const db = getFirestore(app);
const productGrid = document.getElementById("productGrid");

async function loadProducts() {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    productGrid.innerHTML = ""; // Clear grid

    querySnapshot.forEach(doc => {
        const data = doc.data();

        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const mainImage = data.images && data.images.length > 0 ? data.images[0] : "https://via.placeholder.com/150";

        productCard.innerHTML = `
            <img src="${mainImage}" alt="${data.title}">
            <h3 class="product-title">${data.title}</h3>
            <p class="product-price">₦${data.price}</p>
            <p class="product-tags">${data.tags ? data.tags.join(", ") : ""}</p>
            <div class="product-actions">
                <a href="tel:${data.phone}" class="btn-action">Call</a>
                <a href="messages.html?phone=${data.phone}" class="btn-action">Message</a>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

loadProducts();
