import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebase-config.js";

const db = getFirestore(app);
const storage = getStorage(app);

const sellForm = document.getElementById("sellForm");

sellForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const phone = document.getElementById("phone").value;
    const tags = document.getElementById("tags").value.split(",");
    const urgent = document.getElementById("urgent").checked;
    const negotiable = document.getElementById("negotiable").checked;

    const imagesInput = document.getElementById("images");
    const imageFiles = imagesInput.files;
    let imageUrls = [];

    for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
    }

    await addDoc(collection(db, "products"), {
        title,
        description,
        price,
        phone,
        tags,
        urgent,
        negotiable,
        images: imageUrls,
        createdAt: Date.now()
    });

    alert("Ad posted successfully!");
    sellForm.reset();
});
