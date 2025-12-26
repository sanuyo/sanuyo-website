// Firebase config
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

const postAdBtn = document.getElementById("postAdBtn");

postAdBtn.addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = document.getElementById("price").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const urgent = document.getElementById("urgent").value;
  const negotiable = document.getElementById("negotiable").value;
  const tags = document.getElementById("tags").value.split(",").map(tag => tag.trim());
  const images = document.getElementById("images").files;

  if (!title || !description || !price || !phone) {
    alert("Please fill all required fields!");
    return;
  }

  const uploadedImages = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const storageRef = ref(storage, `ads/${Date.now()}_${img.name}`);
    await uploadBytes(storageRef, img);
    const url = await getDownloadURL(storageRef);
    uploadedImages.push(url);
  }

  try {
    await addDoc(collection(db, "products"), {
      title,
      description,
      price: Number(price),
      phone,
      urgent,
      negotiable,
      tags,
      images: uploadedImages,
      timestamp: serverTimestamp()
    });
    alert("Ad posted successfully!");
    document.getElementById("sellForm").reset();
  } catch (err) {
    console.error(err);
    alert("Error posting ad, try again.");
  }
});
