import { products } from "./products.js";   // Load product database

// ------------------------------
// ELEMENTS
// ------------------------------
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryArea = document.getElementById("categoryArea");

// ------------------------------
// DISPLAY PRODUCTS
// ------------------------------
function displayProducts(list) {
    productGrid.innerHTML = "";

    if (list.length === 0) {
        productGrid.innerHTML = "<p class='empty-text'>No products found.</p>";
        return;
    }

    list.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product-card");

        div.innerHTML = `
            <img src="${product.image}" class="product-img">
            <h3>${product.name}</h3>
            <p class="price">₦${product.price.toLocaleString()}</p>
            <p class="location">${product.location}</p>
        `;

        div.onclick = () => {
            window.location.href = `product.html?id=${product.id}`;
        };

        productGrid.appendChild(div);
    });
}

// ------------------------------
// INITIAL LOAD
// ------------------------------
displayProducts(products);

// ------------------------------
// SEARCH FILTER
// ------------------------------
searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(text) ||
        p.category.toLowerCase().includes(text) ||
        p.location.toLowerCase().includes(text)
    );

    displayProducts(filtered);
});

// ------------------------------
// CATEGORY FILTER
// ------------------------------
categoryArea.addEventListener("click", (event) => {
    const box = event.target.closest(".cat-box");
    if (!box) return;

    const selected = box.dataset.category.toLowerCase();

    const filtered = products.filter(p =>
        p.category.toLowerCase() === selected
    );

    displayProducts(filtered);

    // highlight active category
    document.querySelectorAll(".cat-box").forEach(c => c.classList.remove("active"));
    box.classList.add("active");
});
