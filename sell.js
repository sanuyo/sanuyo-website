// ===============================
// FIREBASE IMPORTS
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// ===============================
// FIREBASE CONFIG
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website",
  storageBucket: "sanuyo-website.appspot.com",
  messagingSenderId: "765213630366",
  appId: "1:765213630366:web:03279e61a58289b088808f"
};

// ===============================
// INITIALIZE
// ===============================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ===============================
// ELEMENTS
// ===============================
const form = document.getElementById("sellForm");
const imageInput = document.getElementById("images");
const preview = document.getElementById("imagePreview");
const message = document.getElementById("message");

// ===============================
// IMAGE PREVIEW
// ===============================
imageInput.addEventListener("change", () => {
  preview.innerHTML = "";
  [...imageInput.files].forEach(file => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });
});

// ===============================
// SUBMIT FORM
// ===============================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.innerHTML = "Posting ad...";
  message.className = "";

  try {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = Number(document.getElementById("price").value);
    const location = document.getElementById("location").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const tagsInput = document.getElementById("tags").value;

    const tags = tagsInput
      ? tagsInput.split(",").map(t => t.trim().toLowerCase())
      : [];

    const files = imageInput.files;
    const imageUrls = [];

    // ===============================
    // UPLOAD IMAGES
    // ===============================
    for (const file of files) {
      const imageRef = ref(
        storage,
        `products/${Date.now()}_${file.name}`
      );
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }

    // ===============================
    // SAVE PRODUCT
    // ===============================
    await addDoc(collection(db, "products"), {
      title,
      description,
      price,
      location,
      phone,
      tags,
      images: imageUrls,
      createdAt: new Date()
    });

    message.innerHTML = "Ad posted successfully!";
    message.className = "success-msg";

    form.reset();
    preview.innerHTML = "";

  } catch (error) {
    console.error(error);
    message.innerHTML = "Failed to post ad. Try again.";
    message.className = "error-msg";
  }
});
