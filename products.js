import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
    if (!productId) return;

    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
        alert("Product not found");
        return;
    }

    const data = productSnap.data();

    document.getElementById("productImage").src = data.image || "https://via.placeholder.com/400";
    document.getElementById("productTitle").innerText = data.title;
    document.getElementById("productPrice").innerText = "₦" + data.price;
    document.getElementById("productLocation").innerText = "📍 " + data.location;
    document.getElementById("productDescription").innerText = data.description;

    document.getElementById("sellerName").innerText = "Name: " + data.sellerName;
    document.getElementById("sellerPhone").innerText = "Phone: " + data.phone;

    document.getElementById("callBtn").href = "tel:" + data.phone;
    document.getElementById("whatsappBtn").href =
        "https://wa.me/234" + data.phone.substring(1) + "?text=I'm interested in your product";

    // Tags
    const tagsDiv = document.getElementById("productTags");
    if (data.tags && data.tags.length > 0) {
        data.tags.forEach(tag => {
            const span = document.createElement("span");
            span.innerText = tag;
            tagsDiv.appendChild(span);
        });
    }
}

loadProduct();
