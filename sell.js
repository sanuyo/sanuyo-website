// Firebase imports
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { app } from "./firebase.js";

const db = getFirestore(app);
const storage = getStorage(app);

const sellForm = document.getElementById("sellForm");
const successMessage = document.getElementById("successMessage");

sellForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = parseFloat(document.getElementById("price").value);
    const phone = document.getElementById("phone").value;
    const location = document.getElementById("location").value;
    const urgent = document.getElementById("urgent").checked;
    const negotiable = document.getElementById("negotiable").checked;
    const images = document.getElementById("images").files;

    let imageUrls = [];

    if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            const fileRef = ref(storage, `productImages/${images[i].name}_${Date.now()}`);
            await uploadBytes(fileRef, images[i]);
            const url = await getDownloadURL(fileRef);
            imageUrls.push(url);
        }
    }

    try {
        await addDoc(collection(db, "products"), {
            title,
            description,
            price,
            phone,
            location,
            urgent,
            negotiable,
            images: imageUrls,
            createdAt: Timestamp.now()
        });

        successMessage.style.display = "block";
        sellForm.reset();
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);

    } catch (err) {
        console.error("Error posting ad: ", err);
        alert("Failed to post ad, try again.");
    }
});
