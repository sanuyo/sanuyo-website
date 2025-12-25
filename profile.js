import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const sellerId = params.get("seller");

async function loadSeller() {
  if (!sellerId) return;

  const userRef = doc(db, "users", sellerId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return;

  const user = userSnap.data();

  document.getElementById("sellerName").innerText = user.name;
  document.getElementById("sellerPhone").innerText = "📞 " + user.phone;
  document.getElementById("sellerRating").innerText =
    `⭐ ${user.rating || 0} (${user.totalRatings || 0} reviews)`;

  // Load seller products
  const q = query(
    collection(db, "products"),
    where("sellerId", "==", sellerId)
  );

  const snapshot = await getDocs(q);
  const grid = document.getElementById("sellerProducts");

  snapshot.forEach(docSnap => {
    const p = docSnap.data();
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.image || 'https://via.placeholder.com/300'}">
      <div class="product-info">
        <h4>₦${p.price}</h4>
        <p>${p.title}</p>
      </div>
    `;

    card.onclick = () => {
      window.location.href = `product.html?id=${docSnap.id}`;
    };

    grid.appendChild(card);
  });
}

loadSeller();
