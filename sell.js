import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.getElementById("postAdBtn").onclick = async () => {
  const status = document.getElementById("status");
  status.textContent = "Posting...";

  try {
    const files = document.getElementById("images").files;
    const imageUrls = [];

    for (let file of files) {
      const imgRef = ref(storage, `products/${Date.now()}-${file.name}`);
      await uploadBytes(imgRef, file);
      imageUrls.push(await getDownloadURL(imgRef));
    }

    await addDoc(collection(db, "products"), {
      title: title.value,
      description: description.value,
      price: Number(price.value),
      priceType: priceType.value,
      urgency: urgency.value,
      location: location.value,
      phone: phone.value,
      tags: tags.value.split(",").map(t => t.trim()),
      images: imageUrls,
      userId: "guest",
      status: "active",
      createdAt: serverTimestamp()
    });

    status.textContent = "Ad posted successfully!";
    document.querySelector("form")?.reset();

  } catch (e) {
    status.textContent = "Error posting ad";
    console.error(e);
  }
};
