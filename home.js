import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const grid = document.getElementById("productGrid");

const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
const snap = await getDocs(q);

snap.forEach(doc => {
  const p = doc.data();
  grid.innerHTML += `
    <div class="card">
      <img src="${p.images[0]}">
      <h3>${p.title}</h3>
      <p class="price">₦${p.price}</p>
      <p class="tags">${p.tags.join(", ")}</p>
    </div>
  `;
});
