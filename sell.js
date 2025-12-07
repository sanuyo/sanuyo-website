// ============================
// SELL PAGE JS (FULLY FIXED)
// ============================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// ELEMENTS
const catSelect = document.getElementById("categorySelect");
const subSelect = document.getElementById("subSelect");
const postBtn = document.getElementById("postBtn");


// ====================================================
// 1. LOAD CATEGORIES INTO DROPDOWN
// ====================================================

async function loadCategories() {
    let snap = await getDocs(collection(db, "categories"));
    catSelect.innerHTML = `<option value="">Select Category</option>`;

    snap.forEach((doc) => {
        catSelect.innerHTML += `
            <option value="${doc.id}">${doc.data().name}</option>
        `;
    });
}

loadCategories();


// ====================================================
// 2. WHEN CATEGORY SELECTED → LOAD SUBCATEGORIES
// ====================================================

catSelect.addEventListener("change", async () => {

    let categoryId = catSelect.value;

    if (!categoryId) {
        subSelect.innerHTML = `<option value="">Select category first</option>`;
        return;
    }

    let subRef = collection(db, `categories/${categoryId}/subcategories`);
    let subSnap = await getDocs(subRef);

    subSelect.innerHTML = `<option value="">Select Subcategory</option>`;

    subSnap.forEach((doc) => {
        subSelect.innerHTML += `
            <option value="${doc.id}">${doc.data().name}</option>
        `;
    });

});


// ====================================================
// 3. SUBMIT AD
// ====================================================

postBtn.addEventListener("click", async () => {

    let title = document.getElementById("title").value;
    let price = document.getElementById("price").value;
    let phone = document.getElementById("phone").value;
    let desc = document.getElementById("description").value;
    let category = catSelect.value;
    let subcategory = subSelect.value;

    if (!title || !price || !phone || !desc || !category || !subcategory) {
        alert("Please fill all fields");
        return;
    }

    await addDoc(collection(db, "products"), {
        title,
        price,
        phone,
        desc,
        category,
        subcategory,
        createdAt: Date.now()
    });

    alert("Product posted successfully!");
    window.location.href = "home.html";
});
