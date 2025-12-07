// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDocs, query, where 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website",
  storageBucket: "sanuyo-website.firebasestorage.app",
  messagingSenderId: "765213630366",
  appId: "1:765213630366:web:03279e61a58289b088808f"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM
const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");

// 1. LOAD CATEGORIES
async function loadCategories() {
    const snap = await getDocs(collection(db, "categories"));
    categorySelect.innerHTML = `<option value="">Select category</option>`;

    snap.forEach(doc => {
        const cat = doc.data();
        categorySelect.innerHTML += `
            <option value="${cat.id}">${cat.name}</option>
        `;
    });
}

// 2. LOAD SUBCATEGORIES WHEN CATEGORY SELECTED
async function loadSubCategories(categoryId) {
    subcategorySelect.innerHTML = `<option>Loading…</option>`;

    const q = query(
        collection(db, "subcategories"),
        where("categoryId", "==", categoryId)
    );

    const snap = await getDocs(q);

    subcategorySelect.innerHTML = `<option value="">Select subcategory</option>`;

    snap.forEach(doc => {
        const sub = doc.data();
        subcategorySelect.innerHTML += `
            <option value="${sub.id}">${sub.name}</option>
        `;
    });
}

// Event: When category changes
categorySelect.addEventListener("change", (e) => {
    const selected = e.target.value;
    if (selected) loadSubCategories(selected);
});

// 3. SUBMIT PRODUCT FORM
document.getElementById("sellForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        category: categorySelect.value,
        subcategory: subcategorySelect.value,
        description: document.getElementById("description").value,
        phone: document.getElementById("phone").value,
        createdAt: new Date().toISOString()
    };

    await addDoc(collection(db, "products"), product);

    alert("Product uploaded successfully!");
    window.location.href = "home.html";
});

// Load categories on start
loadCategories();
