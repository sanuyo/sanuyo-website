// categories.js

const categoryListDiv = document.getElementById("category-list");

async function loadCategories() {
    try {
        const ref = firebase.firestore().collection("categories");
        const snap = await ref.get();

        categoryListDiv.innerHTML = "";

        snap.forEach(doc => {
            const data = doc.data();

            const cat = document.createElement("div");
            cat.className = "category-item";

            cat.innerHTML = `
                <div class="cat-icon">${data.icon}</div>
                <div class="cat-name">${data.name}</div>
            `;

            // On click → Go to Subcategories page
            cat.onclick = () => {
                localStorage.setItem("selectedCategoryId", doc.id);
                localStorage.setItem("selectedCategoryName", data.name);
                window.location.href = "subcategories.html";
            };

            categoryListDiv.appendChild(cat);
        });

    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

loadCategories();
