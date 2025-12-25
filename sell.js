// 🔥 Firebase imports (MODULAR v9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔧 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website",
  storageBucket: "sanuyo-website.firebasestorage.app",
  messagingSenderId: "765213630366",
  appId: "1:765213630366:web:03279e61a58289b088808f"
};

// 🚀 Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔖 Popular auto-tag keywords
const autoTagWords = [
  "iphone", "android", "samsung", "tecno", "infinix",
  "used", "brand new", "clean",
  "urgent", "negotiable",
  "lagos", "abuja", "ibadan", "ogun"
];

// 🔁 Convert text → array
function parseTags(tagString) {
  return tagString
    .split(",")
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 0);
}

// 🤖 Auto-generate tags from title
function generateTagsFromTitle(title) {
  const lower = title.toLowerCase();
  return autoTagWords.filter(word => lower.includes(word));
}

// 🎯 Auto-fill tags while typing title
document.getElementById("title").addEventListener("input", () => {
  const titleVal = document.getElementById("title").value;
  const tags = generateTagsFromTitle(titleVal);
  document.getElementById("tags").value = tags.join(", ");
});

// 📤 Post Ad
document.getElementById("postBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const price = document.getElementById("price").value;
  const priceType = document.getElementById("priceType").value;
  const urgency = document.getElementById("urgency").value;
  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();
  const description = document.getElementById("description").value.trim();
  const tagsInput = document.getElementById("tags").value;

  if (!title || !price || !phone || !location || !description) {
    alert("Please fill all required fields");
    return;
  }

  const tagsArray = parseTags(tagsInput);

  try {
    await addDoc(collection(db, "products"), {
      title,
      price: Number(price),
      priceType,
      urgency,
      phone,
      location: location.toLowerCase(),
      description,
      tags: tagsArray,
      createdAt: serverTimestamp()
    });

    alert("✅ Ad posted successfully");

    document.querySelector(".sell-form").reset();

  } catch (err) {
    console.error(err);
    alert("❌ Failed to post ad");
  }
});
