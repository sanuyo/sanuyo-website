import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

const sellForm = document.getElementById("sellForm");
const sellSuccess = document.getElementById("sellSuccess");

sellForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const user = auth.currentUser;
    if(!user) return alert("You must be logged in to post an ad.");

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = Number(document.getElementById("price").value);
    const location = document.getElementById("location").value;
    const phone = document.getElementById("phone").value;
    const tags = document.getElementById("tags").value.split(",").map(t => t.trim());
    const images = document.getElementById("images").value.split(",").map(i => i.trim());

    try {
        await addDoc(collection(db, "products"), {
            userId: user.uid,
            title,
            description,
            price,
            location,
            phone,
            tags,
            images,
            createdAt: serverTimestamp()
        });
        sellSuccess.style.display = "block";
        sellForm.reset();
        setTimeout(() => sellSuccess.style.display = "none", 4000);
    } catch (err) {
        console.error("Error posting ad:", err);
        alert("Error posting ad. Try again.");
    }
});
