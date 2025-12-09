const productsRef = db.collection("products");
const subcategoriesRef = db.collection("subcategories");

// Get subcategory ID from URL
const urlParams = new URLSearchParams(window.location.search);
const subcatId = urlParams.get("subcat");

const productTitle = document.getElementById("productTitle");
const productsGrid = document.getElementById("productsGrid");

// LOAD SUBCATEGORY NAME
async function loadTitle() {
    const doc = await subcategoriesRef.doc(subcatId).get();
    if (doc.exists) {
        productTitle.innerText = doc.data().name;
    }
}

loadTitle();

// LOAD PRODUCTS IN THAT SUBCATEGORY
async function loadProducts() {
    const snapshot = await productsRef
        .where("subcatId", "==", subcatId)
        .get();

    productsGrid.innerHTML = "";

    if (snapshot.empty) {
        productsGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    snapshot.forEach(doc => {
        const p = doc.data();

        productsGrid.innerHTML += `
            <div class="product-card" onclick="openProductDetails('${doc.id}')">

                <img class="product-img" src="${p.images[0]}" alt="product">

                <div class="product-info">
                    <div class="product-title">${p.title}</div>
                    <div class="product-price">₦${p.price}</div>
                    <div class="product-location">${p.location}</div>
                </div>

            </div>
        `;
    });
}

loadProducts();

function openProductDetails(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}
