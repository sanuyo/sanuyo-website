import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app);

// Form elements
const postAdBtn = document.getElementById("postAdBtn");
const imageInput = document.getElementById("images");
const imagePreview = document.getElementById("imagePreview");

// Preview images
imageInput.addEventListener("change", () => {
    imagePreview.innerHTML = "";
    const files = imageInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        imagePreview.appendChild(img);
    }
});

// Post ad
postAdBtn.addEventListener("click", async () => {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = document.getElementById("price").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const urgent = document.getElementById("urgent").value;
    const negotiable = document.getElementById("negotiable").value;
    const tags = document.getElementById("tags").value.split(",").map(t => t.trim());
    const images = imageInput.files;

    if (!title || !description || !price || !phone || images.length === 0) {
        alert("Please fill all fields and upload at least one image.");
        return;
    }

    try {
        const imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            const file = images[i];
            const imageRef = ref(storage, `product_images/${Date.now()}_${file.name}`);
            await uploadBytes(imageRef, file);
            const url = await getDownloadURL(imageRef);
            imageUrls.push(url);
        }

        await addDoc(collection(db, "products"), {
            title,
            description,
            price: Number(price),
            phone,
            urgent,
            negotiable,
            tags,
            images: imageUrls,
            createdAt: serverTimestamp(),
            userId: auth.currentUser ? auth.currentUser.uid : "anonymous"
        });

        alert("Ad posted successfully!");
        document.querySelector(".sell-form").reset();
        imagePreview.innerHTML = "";
    } catch (error) {
        console.error("Error posting ad:", error);
        alert("Failed to post ad. Check console for details.");
    }
});
