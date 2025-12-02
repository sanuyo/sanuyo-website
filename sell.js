// --------------------------------------
// SANUYO MARKETPLACE — SELL PAGE SCRIPT
// Upload images → Save ad to Firestore
// --------------------------------------

const imageInput = document.getElementById("images");
const previewBox = document.getElementById("uploadPreview");

let selectedFiles = [];

// --------------------------------------
// IMAGE PREVIEW
// --------------------------------------
imageInput.addEventListener("change", (e) => {
    previewBox.innerHTML = "";
    selectedFiles = Array.from(e.target.files).slice(0, 5);

    selectedFiles.forEach((file) => {
        const imgURL = URL.createObjectURL(file);
        const img = document.createElement("img");
        img.src = imgURL;
        previewBox.appendChild(img);
    });
});

// --------------------------------------
// POST AD
// --------------------------------------
async function postAd() {
    const title = document.getElementById("title").value.trim();
    const price = document.getElementById("price").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const location = document.getElementById("location").value.trim();
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value.trim();

    // Validation
    if (!title || !price || !phone || !location || !category || !description) {
        alert("Please fill ALL fields.");
        return;
    }

    if (selectedFiles.length === 0) {
        alert("Please upload at least one image.");
        return;
    }

    // Show progress
    alert("Uploading... Please wait.");

    // --------------------------------------
    // STEP 1: UPLOAD IMAGES TO STORAGE
    // --------------------------------------
    const imageUrls = [];

    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const filename = `ads/${Date.now()}_${file.name}`;

        const ref = storage.ref().child(filename);
        await ref.put(file);

        const url = await ref.getDownloadURL();
        imageUrls.push(url);
    }

    // --------------------------------------
    // STEP 2: SAVE AD INFO TO FIRESTORE
    // --------------------------------------
    const adData = {
        title,
        price: Number(price),
        phone,
        location,
        category,
        description,
        images: imageUrls,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        premium: false // default non-premium
    };

    await db.collection("ads").add(adData);

    alert("Ad posted successfully!");

    // Redirect to home
    window.location.href = "home.html";
}
