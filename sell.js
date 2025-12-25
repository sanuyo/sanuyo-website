// sell.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 🔒 Protect page
let currentUser = null;
onAuthStateChanged(auth, user => {
  if (!user) {
    alert("Please login to post an ad");
    window.location.href = "login.html";
  } else {
    currentUser = user;
  }
});

// 🟢 POST PRODUCT
document.getElementById("postAdBtn").onclick = async () => {
  const title = document.getElementById("title").value.trim();
  const price = document.getElementById("price").value;
  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();
  const description = document.getElementById("description").value.trim();
  const tags = document.getElementById("tags").value
    .split(",")
    .map(t => t.trim().toLowerCase());

  if (!title || !price || !phone || !location) {
    alert("Please fill all required fields");
    return;
  }

  try {
    await addDoc(collection(db, "products"), {
      title,
      price: Number(price),
      phone,
      location,
      description,
      tags,
      sellerId: currentUser.uid,
      createdAt: serverTimestamp(),
      views: 0,
      saved: 0
    });

    alert("Ad posted successfully!");
    window.location.href = "home.html";

  } catch (err) {
    alert("Error posting ad");
    console.error(err);
  }
};
