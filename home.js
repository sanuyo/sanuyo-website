import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { app } from "./firebase.js";

const db = getFirestore(app);
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const urgentFilter = document.getElementById("urgentFilter");
const negotiableFilter = document.getElementById("negotiableFilter");

async function loadProducts() {
    productGrid.innerHTML = "";
    const searchValue = searchInput.value.toLowerCase();
    const urgentVal = urgentFilter.value;
    const negotiableVal = negotiableFilter.value;

    let q = collection(db, "products");
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        const product = doc.data();
        let show = true;

        // Filter search
        if (searchValue && !product.title.toLowerCase().includes(searchValue)) {
            show = false;
        }

        // Filter urgent
        if (urgentVal !== "all" && String(product.urgent) !== urgentVal) show = false;
        if (negotiableVal !== "all" && String(product.negotiable) !== negotiableVal) show = false;

        if (show) {
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
        }
    });
}

searchInput.addEventListener("input", loadProducts);
urgentFilter.addEventListener("change", loadProducts);
negotiableFilter.addEventListener("change", loadProducts);

loadProducts();
