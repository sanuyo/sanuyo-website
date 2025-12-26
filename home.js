// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

// Load Products
const productGrid = document.getElementById('productGrid');

async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  productGrid.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${data.images[0]}" alt="${data.title}">
      <div class="product-info">
        <h4>${data.title}</h4>
        <p>₦${data.price}</p>
        <p>${data.tags ? data.tags.join(", ") : ""}</p>
      </div>
      <div class="product-actions">
        <button onclick="messageSeller('${data.ownerPhone}')">Message</button>
        <button onclick="callSeller('${data.ownerPhone}')">Call</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function messageSeller(phone) {
  window.location.href = `sms:${phone}`;
}
function callSeller(phone) {
  window.location.href = `tel:${phone}`;
}

loadProducts();
