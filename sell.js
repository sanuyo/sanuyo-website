// sell.js

import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore();
const storage = getStorage();

const postAdForm = document.getElementById("postAdForm");
const imageInput = document.getElementById("imagesInput");

postAdForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = postAdForm.title.value;
    const description = postAdForm.description.value;
    const price = postAdForm.price.value;
    const phone = postAdForm.phone.value;
    const urgent = postAdForm.urgent.checked;
    const negotiable = postAdForm.negotiable.checked;

    // Upload images to Firebase Storage
    const files = imageInput.files;
    const imageUrls = [];

    for (let i = 0; i < files.length; i++) {
        const storageRef = ref(storage, `ads_images/${Date.now()}_${files[i].name}`);
        await uploadBytes(storageRef, files[i]);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
    }

    try {
        await addDoc(collection(db, "products"), {
            title,
            description,
            price,
            phone,
            urgent,
            negotiable,
            images: imageUrls,
            createdAt: Timestamp.now()
        });

        // Show confirmation instead of clearing form
        alert("Your ad has been posted successfully! ✅");

        // Optional: keep data in the form for review
        // postAdForm.reset(); // <- REMOVE this line to keep data

    } catch (error) {
        console.error("Error posting ad:", error);
        alert("There was an error posting your ad. Try again.");
    }
});
