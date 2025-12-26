import { db, storage } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const form = document.getElementById("sellForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = Number(document.getElementById("price").value);
  const location = document.getElementById("location").value;
  const phone = document.getElementById("phone").value;
  const tags = document.getElementById("tags").value.split(",").map(t => t.trim());
  const images = document.getElementById("images").files;

  if (images.length === 0) {
    alert("Please select at least one image");
    return;
  }

  const imageUrls = [];
  for (let i = 0; i < images.length; i++) {
    const storageRef = ref(storage, `products/${Date.now()}_${images[i].name}`);
    await uploadBytes(storageRef, images[i]);
    const url = await getDownloadURL(storageRef);
    imageUrls.push(url);
  }

  await addDoc(collection(db, "products"), {
    title,
    description,
    price,
    location,
    phone,
    tags,
    images: imageUrls,
    timestamp: serverTimestamp()
  });

  alert("Ad posted successfully!");
  form.reset();
});
