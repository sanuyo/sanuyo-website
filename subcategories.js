// ==========================
// SUBCATEGORIES.JS – LEVEL 2
// ==========================

import { db } from "./firebase.js";
import {
    doc,
    getDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Get selected category from homepage
const categoryId = localStorage.getItem("selectedCategory");

async function loadSubcategories() {
    const titleBox = document.getElementById("categoryTitle");
    const subList = document.getElementById("subList");

    if (!categoryId) {
        titleBox.innerText = "No category selected";
        return;
    }

    // GET CATEGORY TITLE
    const catRef = doc(db, "categories", categoryId);
    const catSnap = await getDoc(catRef);

    if (catSnap.exists()) {
        titleBox.innerText = catSnap.data().name;
    }

    // LOAD SUBCATEGORIES
    const subRef = collection(db, `categories/${categoryId}/subcategories`);
    const subSnap = await getDocs(subRef);

    subList.innerHTML = "";

    subSnap.forEach((docItem) => {
        const sub = docItem.data();

        const card = document.createElement("div");
        card.className = "subcategory-card";

        card.innerHTML = `
            <p>${sub.name}</p>
        `;

        card.onclick = () => {
            localStorage.setItem("selectedSub", docItem.id);
            window.location.href = "products-list.html"; // next page
        };

        subList.appendChild(card);
    });

}

loadSubcategories();
