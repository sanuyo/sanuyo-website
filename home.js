import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { app } from "./firebase-config.js";

const db = getFirestore(app);
const productGrid = document.getElementById("productGrid");

async function loadProducts() {
    try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        productGrid.innerHTML = "";

        snapshot.forEach(doc => {
            const data = doc.data();
            const mainImage = data.images && data.images.length > 0 ? data.images[0] : "https://via.placeholder.com/150";

            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${mainImage}" alt="${data.title}">
                <h3>${data.title}</h3>
                <p>₦${data.price}</p>
                <p>Tags: ${data.tags ? data.tags.join(", ") : ""}</p>
                <p>${data.urgent ? "⚡ Urgent" : ""} ${data.negotiable ? "💬 Negotiable" : ""}</p>
                <div class="actions">
                    <a href="tel:${data.phone}">Call</a>
                    <a href="messages.html?phone=${data.phone}">Message</a>
                </div>
            `;

            productGrid.appendChild(productCard);
        });
    } catch (err) {
        console.error(err);
        productGrid.innerHTML = "<p style='color:red;'>Failed to load products</p>";
    }
}

loadProducts();
