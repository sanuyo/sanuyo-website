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

const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website",
  storageBucket: "sanuyo-website.appspot.com",
  messagingSenderId: "765213630366",
  appId: "1:765213630366:web:03279e61a58289b088808f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const form = document.getElementById("sellForm");
const imageInput = document.getElementById("images");
const preview = document.getElementById("imagePreview");
const message = document.getElementById("message");

imageInput.addEventListener("change", () => {
  preview.innerHTML = "";
  [...imageInput.files].forEach(file => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.textContent = "Posting ad...";
  message.className = "";

  try {
    const product = {
      title: title.value.trim(),
      description: description.value.trim(),
      price: Number(price.value),
      location: location.value.trim(),
      phone: phone.value.trim(),
      negotiable: document.getElementById("negotiable").checked,
      urgent: document.getElementById("urgent").checked,
      tags: tags.value
        ? tags.value.split(",").map(t => t.trim().toLowerCase())
        : [],
      images: [],
      createdAt: new Date()
    };

    for (const file of imageInput.files) {
      const imageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      await uploadBytes(imageRef, file);
      product.images.push(await getDownloadURL(imageRef));
    }

    await addDoc(collection(db, "products"), product);

    message.textContent = "Ad posted successfully!";
    message.className = "success-msg";
    form.reset();
    preview.innerHTML = "";

  } catch (err) {
    console.error(err);
    message.textContent = "Error posting ad.";
    message.className = "error-msg";
  }
});
