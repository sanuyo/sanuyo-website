// Firebase Imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase Configuration
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

// Post Ad Button
document.getElementById('postAdBtn').addEventListener('click', async () => {
    const title = document.getElementById('title').value.trim();
    const price = document.getElementById('price').value.trim();
    const description = document.getElementById('description').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const urgent = document.getElementById('urgent').value;
    const negotiable = document.getElementById('negotiable').value;
    const tags = document.getElementById('tags').value.split(',').map(t => t.trim());
    const images = document.getElementById('images').files;

    if (!title || !price || !description || !phone || images.length === 0) {
        alert('Please fill all fields and upload at least one image.');
        return;
    }

    try {
        // Upload images
        const imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            const file = images[i];
            const fileRef = ref(storage, `products/${Date.now()}_${file.name}`);
            await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileRef);
            imageUrls.push(url);
        }

        // Save product
        await addDoc(collection(db, 'products'), {
            title,
            price: Number(price),
            description,
            phone,
            urgent,
            negotiable,
            tags,
            images: imageUrls,
            createdAt: serverTimestamp()
        });

        alert('Your ad has been posted successfully!');
        document.getElementById('sellForm').reset();

    } catch (error) {
        console.error("Error posting ad:", error);
        alert('Failed to post ad. Check console for details.');
    }
});
