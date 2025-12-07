// --- Subcategory data ---
const subcategories = {
    phones: ["Smartphones", "iPhone", "Samsung", "Tecno", "Infinix", "Accessories"],
    electronics: ["TV", "Home Theatre", "Speakers", "Cameras", "Power Banks"],
    vehicles: ["Cars", "Motorcycles", "Trucks", "Buses", "Vehicle Parts"],
    fashion: ["Men", "Women", "Shoes", "Bags", "Jewelry"],
    realestate: ["Houses", "Apartments", "Lands", "Commercial Property"],
    home: ["Furniture", "Kitchen", "Decoration", "Garden"],
    pets: ["Dogs", "Cats", "Birds", "Fish"],
    sports: ["Gym", "Bicycles", "Sportswear"]
};

// --- Show dropdown ---
function toggleSub(cat) {
    const box = document.getElementById("subcategories");
    const title = document.getElementById("subcat-title");
    const list = document.getElementById("subcat-list");

    title.innerText = cat.toUpperCase();

    list.innerHTML = subcategories[cat]
        .map(item => `<div onclick="openSubcategory('${cat}','${item}')">${item}</div>`)
        .join("");

    box.classList.remove("hidden");
}

// --- Open category page ---
function openCategory(cat) {
    window.location.href = `category.html?cat=${cat}`;
}

// --- Open subcategory page ---
function openSubcategory(cat, sub) {
    window.location.href = `category.html?cat=${cat}&sub=${sub}`;
}
document.getElementById("searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const q = e.target.value;
    window.location.href = `search.html?search=${q}`;
  }
});

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { 
    getFirestore, getDocs, collection, query, where 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website",
  storageBucket: "sanuyo-website.firebasestorage.app",
  messagingSenderId: "765213630366",
  appId: "1:765213630366:web:03279e61a58289b088808f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM
const categoryGrid = document.getElementById("categoryGrid");
const subcategoryPanel = document.getElementById("subCategoryPanel");

// LOAD CATEGORIES
async function loadCategories() {
    const snap = await getDocs(collection(db, "categories"));
    snap.forEach(doc => {
        const cat = doc.data();

        categoryGrid.innerHTML += `
            <div class="cat-box" onclick="openSubcategories('${cat.id}', '${cat.name}')">
                <div class="cat-icon">${cat.icon}</div>
                <p>${cat.name}</p>
            </div>
        `;
    });
}

// OPEN SUBCATEGORIES LIKE JIJI
window.openSubcategories = async function(catId, catName) {
    subcategoryPanel.innerHTML = `
        <h3>${catName}</h3>
        <div class="sub-grid" id="subGrid">Loading...</div>
    `;

    const subGrid = document.getElementById("subGrid");

    const q = query(
        collection(db, "subcategories"),
        where("categoryId", "==", catId)
    );

    const snap = await getDocs(q);

    subGrid.innerHTML = "";

    snap.forEach(doc => {
        const sub = doc.data();
        subGrid.innerHTML += `
            <div class="sub-box" onclick="filterBySub('${sub.id}')">
                ${sub.name}
            </div>
        `;
    });
};

// FILTER PRODUCTS BY SUBCATEGORY
window.filterBySub = function(subId) {
    window.location.href = `products.html?sub=${subId}`;
};

loadCategories();
