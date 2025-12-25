import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore();
const productGrid = document.getElementById("productGrid");
const categoryIcons = document.getElementById("categoryIcons");

// List of categories with icons
const categories = [
    { name: "Phones", icon: "https://cdn-icons-png.flaticon.com/128/1040/1040230.png" },
    { name: "Electronics", icon: "https://cdn-icons-png.flaticon.com/128/3202/3202926.png" },
    { name: "Fashion", icon: "https://cdn-icons-png.flaticon.com/128/679/679922.png" },
    { name: "Home", icon: "https://cdn-icons-png.flaticon.com/128/2803/2803487.png" },
    { name: "Computers", icon: "https://cdn-icons-png.flaticon.com/128/706/706164.png" },
    { name: "Appliances", icon: "https://cdn-icons-png.flaticon.com/128/3081/3081559.png" },
    { name: "Vehicles", icon: "https://cdn-icons-png.flaticon.com/128/565/565547.png" },
    { name: "Kids", icon: "https://cdn-icons-png.flaticon.com/128/2965/2965567.png" }
];

// Render categories
categories.forEach(cat => {
    const div = document.createElement("div");
    div.classList.add("cat-box");
    div.innerHTML = `<img src="${cat.icon}"><p>${cat.name}</p>`;
    categoryIcons.appendChild(div);
});

// Fetch products from Firestore
async function loadProducts() {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    productGrid.innerHTML = "";

    querySnapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${data.images[0] || 'https://via.placeholder.com/150'}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p class="price">₦${data.price}</p>
            <p class="location">${data.location}</p>
            <div class="actions">
                <a href="messages.html?user=${data.userId}" class="msg-btn">Message</a>
                <a href="tel:${data.phone}" class="call-btn">Call</a>
            </div>
        `;
        productGrid.appendChild(div);
    });
}

loadProducts();
