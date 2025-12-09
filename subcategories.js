// subcategories.js

const subcatDiv = document.getElementById("subcat-list");
const catTitle = document.getElementById("cat-title");

const catId = localStorage.getItem("selectedCategoryId");
const catName = localStorage.getItem("selectedCategoryName");

// Set page title
catTitle.textContent = catName ?? "Subcategories";

async function loadSubcategories() {
    if (!catId) {
        subcatDiv.innerHTML = `<p class="empty-text">Category not found.</p>`;
        return;
    }

    try {
        const ref = firebase.firestore()
            .collection("categories")
            .doc(catId)
            .collection("subcategories");

        const snap = await ref.get();

        subcatDiv.innerHTML = "";

        if (snap.empty) {
            subcatDiv.innerHTML = `<p class="empty-text">No subcategories available.</p>`;
            return;
        }

        snap.forEach(doc => {
            const data = doc.data();

            const item = document.createElement("div");
            item.className = "category-item";

            item.innerHTML = `
                <div class="cat-icon">${data.icon}</div>
                <div class="cat-name">${data.name}</div>
            `;

            // On click → Go to Products page
            item.onclick = () => {
                localStorage.setItem("selectedSubId", doc.id);
                localStorage.setItem("selectedSubName", data.name);
                window.location.href = "products.html";
            };

            subcatDiv.appendChild(item);
        });

    } catch (error) {
        console.error("Error loading subcategories:", error);
    }
}

loadSubcategories();
