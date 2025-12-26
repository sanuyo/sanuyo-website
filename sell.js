import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebase-config.js";

const db = getFirestore(app);
const storage = getStorage(app);

const postBtn = document.getElementById("postAdBtn");
const statusMsg = document.getElementById("statusMsg");

postBtn.addEventListener("click", async () => {
    statusMsg.textContent = "Posting...";
    try {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const price = Number(document.getElementById("price").value);
        const phone = document.getElementById("phone").value;
        const tags = document.getElementById("tags").value.split(",").map(t => t.trim());
        const urgent = document.getElementById("urgent").checked;
        const negotiable = document.getElementById("negotiable").checked;
        const imagesFiles = document.getElementById("images").files;

        // Upload images to Storage
        let imagesUrls = [];
        for (let file of imagesFiles) {
            const storageRef = ref(storage, `ads-images/${Date.now()}-${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            imagesUrls.push(url);
        }

        // Add ad to Firestore
        await addDoc(collection(db, "products"), {
            title, description, price, phone, tags, urgent, negotiable,
            images: imagesUrls,
            createdAt: serverTimestamp()
        });

        statusMsg.textContent = "Ad posted successfully!";
        document.querySelector("form")?.reset();
    } catch (err) {
        console.error(err);
        statusMsg.textContent = "Error posting ad.";
    }
});
