import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {
  if (!productId) {
    alert("No product selected");
    return;
  }

  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    alert("Product not found");
    return;
  }

  const data = productSnap.data();

  // Increase views
  await updateDoc(productRef, {
    views: increment(1)
  });

  // Fill UI
  document.getElementById("productImage").src =
    data.image || "https://via.placeholder.com/400";

  document.getElementById("productTitle").innerText = data.title;
  document.getElementById("productPrice").innerText = "₦" + data.price;
  document.getElementById("productLocation").innerText = "📍 " + data.location;
  document.getElementById("productDescription").innerText = data.description;

  document.getElementById("sellerName").innerText = "Name: " + data.sellerName;
  document.getElementById("sellerPhone").innerText = "Phone: " + data.phone;

  document.getElementById("callBtn").href = "tel:" + data.phone;

  document.getElementById("whatsappBtn").href =
    "https://wa.me/234" + data.phone.substring(1) +
    "?text=Hello, I'm interested in your product on Sanuyo";

  // Tags
  const tagsDiv = document.getElementById("productTags");
  tagsDiv.innerHTML = "";
  if (data.tags && data.tags.length > 0) {
    data.tags.forEach(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      tagsDiv.appendChild(span);
    });
  }

  // Go to seller profile
  document.getElementById("sellerName").addEventListener("click", () => {
    window.location.href = `profile.html?seller=${data.sellerId}`;
  });
}

loadProduct();
