// FIRESTORE REFERENCES
const categoriesRef = db.collection("categories");
const subcategoriesRef = db.collection("subcategories");

// DOM ITEMS
const categoriesGrid = document.getElementById("categoriesGrid");
const subcategoriesGrid = document.getElementById("subcategoriesGrid");
const subcatTitle = document.getElementById("subcatTitle");

// LOAD CATEGORIES
async function loadCategories() {
    const snapshot = await categoriesRef.get();

    categoriesGrid.innerHTML = "";

    snapshot.forEach(doc => {
        const data = doc.data();

        categoriesGrid.innerHTML += `
            <div class="category-card" onclick="showSubcategories('${doc.id}', '${data.name}')">
                <div class="category-icon">${data.icon}</div>
                <div class="category-name">${data.name}</div>
            </div>
        `;
    });
}

loadCategories();

// SHOW SUBCATEGORIES OF CLICKED CATEGORY
async function showSubcategories(categoryId, categoryName) {
    subcatTitle.innerText = "Subcategories of " + categoryName;
    subcatTitle.classList.remove("hidden");

    const snapshot = await subcategoriesRef
        .where("categoryId", "==", categoryId)
        .get();

    subcategoriesGrid.classList.remove("hidden");
    subcategoriesGrid.innerHTML = "";

    snapshot.forEach(doc => {
        const data = doc.data();

        subcategoriesGrid.innerHTML += `
            <div class="subcat-card" onclick="openProducts('${doc.id}')">
                ${data.icon} ${data.name}
            </div>
        `;
    });
}

// OPEN PRODUCT LIST PAGE
function openProducts(subcatId) {
    window.location.href = `products.html?subcat=${subcatId}`;
}
