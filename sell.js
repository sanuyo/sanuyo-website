// Initialize Firestore
const db = firebase.firestore();

// HTML elements
const categorySelect = document.getElementById("category");
const subcategorySelect = document.getElementById("subcategory");

// LOAD CATEGORIES
async function loadCategories() {
    categorySelect.innerHTML = `<option>Loading...</option>`;

    const snapshot = await db.collection("categories").orderBy("name").get();

    categorySelect.innerHTML = `<option value="">Select Category</option>`;

    snapshot.forEach(doc => {
        const c = doc.data();
        categorySelect.innerHTML += `
            <option value="${doc.id}">${c.icon} ${c.name}</option>
        `;
    });
}

// LOAD SUBCATEGORIES WHEN CATEGORY IS SELECTED
categorySelect.addEventListener("change", async function () {
    const catId = this.value;

    subcategorySelect.innerHTML = `<option>Loading...</option>`;

    if (!catId) {
        subcategorySelect.innerHTML = `<option value="">Select category first</option>`;
        return;
    }

    const snapshot = await db.collection("subcategories")
        .where("categoryId", "==", catId)
        .orderBy("name")
        .get();

    subcategorySelect.innerHTML = `<option value="">Select Subcategory</option>`;

    snapshot.forEach(doc => {
        const s = doc.data();
        subcategorySelect.innerHTML += `
            <option value="${doc.id}">${s.icon} ${s.name}</option>
        `;
    });
});

// RUN
loadCategories();
