// --- Firebase Setup ---
const firebaseConfig = {
    apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
    authDomain: "sanuyo-website.firebaseapp.com",
    projectId: "sanuyo-website",
    storageBucket: "sanuyo-website.firebasestorage.app",
    messagingSenderId: "765213630366",
    appId: "1:765213630366:web:03279e61a58289b088808f"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- Read category & subcategory from URL ---
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("cat");
const subcategory = urlParams.get("sub");

document.getElementById("catTitle").innerText = category.toUpperCase();


// --- Subcategory data ---
const subcategories = {
    phones: ["Smartphones", "iPhone", "Samsung", "Tecno", "Infinix", "Accessories"],
    electronics: ["TV", "Speakers", "Cameras", "Power Banks"],
    vehicles: ["Cars", "Motorcycles", "Trucks", "Parts"],
    fashion: ["Men", "Women", "Shoes", "Bags"],
    realestate: ["Houses", "Apartments", "Land"],
    home: ["Furniture", "Kitchen", "Decoration"],
    pets: ["Dogs", "Cats", "Birds"],
    sports: ["Gym", "Bicycles", "Sportswear"]
};

// --- Load Subcategories ---
const subcatStrip = document.getElementById("subcatStrip");
subcatStrip.innerHTML = subcategories[category]
    .map(s => `<div class="${s === subcategory ? 'active' : ''}" onclick="filterSub('${s}')">${s}</div>`)
    .join("");

// --- Subcategory Click ---
function filterSub(sub) {
    window.location.href = `category.html?cat=${category}&sub=${sub}`;
}


// --- Load Products ---
const productGrid = document.getElementById("catProducts");

function loadProducts() {
    let query = db.collection("products").where("category", "==", category);

    if (subcategory) {
        query = query.where("subcategory", "==", subcategory);
    }

    query.get().then(snapshot => {
        if (snapshot.empty) {
            productGrid.innerHTML = "<p style='padding:15px;'>No products found.</p>";
            return;
        }

        productGrid.innerHTML = snapshot.docs.map(doc => {
            const p = doc.data();

            return `
                <div class="product-card" onclick="openProduct('${doc.id}')">
                    <img src="${p.images[0]}" alt="">
                    <div class="product-title">${p.title}</div>
                    <div class="product-price">₦${p.price}</div>
                    <div class="product-location">${p.location}</div>
                </div>
            `;
        }).join("");
    });
}

loadProducts();


// --- Open product page ---
function openProduct(id) {
    window.location.href = `product.html?id=${id}`;
}
