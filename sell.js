// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website",
  storageBucket: "sanuyo-website.appspot.com",
  messagingSenderId: "765213630366",
  appId: "1:765213630366:web:03279e61a58289b088808f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// DOM Elements
const postAdForm = document.getElementById("postAdForm");
const successMessage = document.getElementById("successMessage");

// Submit form
postAdForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const phone = document.getElementById("phone").value;
    const tags = document.getElementById("tags").value.split(",").map(tag => tag.trim());
    const urgent = document.getElementById("urgent").value;
    const negotiable = document.getElementById("negotiable").value;
    const images = document.getElementById("images").files;

    if (images.length === 0) {
        alert("Please select at least one image.");
        return;
    }

    // Upload images to Firebase Storage
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
        const imageFile = images[i];
        const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
    }

    // Save ad to Firestore
    try {
        await addDoc(collection(db, "products"), {
            title,
            description,
            price,
            phone,
            tags,
            urgent,
            negotiable,
            images: imageUrls,
            timestamp: Date.now()
        });
        successMessage.innerHTML = "Ad posted successfully!";
        postAdForm.reset();
    } catch (error) {
        console.error("Error posting ad:", error);
        successMessage.innerHTML = "Error posting ad, try again.";
    }
});
