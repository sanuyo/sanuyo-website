import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebase-config.js";

const db = getFirestore(app);
const storage = getStorage(app);

const sellForm = document.getElementById("sellForm");
const imagesInput = document.getElementById("images");
const imagePreview = document.getElementById("imagePreview");

// Image preview
imagesInput.addEventListener("change", () => {
    imagePreview.innerHTML = "";
    const files = imagesInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

sellForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const phone = document.getElementById("phone").value;
    const tags = document.getElementById("tags").value.split(",").map(t => t.trim());
    const urgent = document.getElementById("urgent").checked;
    const negotiable = document.getElementById("negotiable").checked;

    const imageFiles = imagesInput.files;
    const imageUrls = [];

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
    imagePreview.innerHTML = "";
});
