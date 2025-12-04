// ================================
//  SELL PAGE SCRIPT
// ================================

// Firebase initialization (make sure firebase is already loaded in HTML)
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


// ================================
//  HANDLE PRODUCT IMAGE UPLOAD
// ================================
let selectedImages = [];

document.getElementById("images").addEventListener("change", (e) => {
    selectedImages = Array.from(e.target.files);
    previewImages();
});

function previewImages() {
    const preview = document.getElementById("preview");
    preview.innerHTML = "";

    selectedImages.forEach(file => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.classList.add("preview-img");
        preview.appendChild(img);
    });
}



// ================================
//  HANDLE CATEGORY → SUBCATEGORY
// ================================
const subcategoryData = {
    electronics: ["Mobile Phones", "Tablets", "Computers", "TVs", "Accessories"],
    vehicles: ["Cars", "Motorcycles", "Trucks", "Buses"],
    fashion: ["Men's Fashion", "Women's Fashion", "Kids Fashion", "Shoes"],
    real_estate: ["Land", "Houses & Apartments for Rent", "Houses & Apartments for Sale"],
    services: ["Home Services", "Business Services", "Repairs", "Health & Beauty"],
    jobs: ["Part-Time Jobs", "Full-Time Jobs", "Internships"],
    animals: ["Dogs", "Cats", "Birds", "Livestock"],
    sports: ["Gym Equipment", "Sports Equipment", "Bicycles"],
    babies: ["Baby Clothing", "Baby Toys", "Baby Furniture"]
};

document.getElementById("category").addEventListener("change", function () {
    const category = this.value;
    const subcatSelect = document.getElementById("subcategory");

    subcatSelect.innerHTML = "<option value=''>Select Subcategory</option>";

    if (subcategoryData[category]) {
        subcategoryData[category].forEach(sub => {
            const option = document.createElement("option");
            option.value = sub.toLowerCase().replace(/ /g, "_");
            option.textContent = sub;
            subcatSelect.appendChild(option);
        });
    }
});



// ================================
//  SUBMIT PRODUCT
// ================================
document.getElementById("sellForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const price = document.getElementById("price").value;
    const phone = document.getElementById("phone").value.trim();
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;
    const subcategory = document.getElementById("subcategory").value;

    const user = auth.currentUser;
    if (!user) {
        alert("You must be logged in to post a product!");
        return;
    }

    if (selectedImages.length === 0) {
        alert("Please select at least 1 image");
        return;
    }

    document.getElementById("submitBtn").textContent = "Uploading...";
    

    // ================================
    //  UPLOAD IMAGES TO STORAGE
    // ================================
    const imageUrls = [];

    for (let i = 0; i < selectedImages.length; i++) {
        const file = selectedImages[i];
        const fileRef = storage.ref(`products/${user.uid}/${Date.now()}_${file.name}`);

        const uploadTask = await fileRef.put(file);
        const url = await uploadTask.ref.getDownloadURL();
        imageUrls.push(url);
    }


    // ================================
    //  SAVE PRODUCT TO FIRESTORE
    // ================================
    const productData = {
        title,
        price,
        phone,
        description,
        category,
        subcategory,
        images: imageUrls,
        userId: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: "active"
    };

    try {
        await db.collection("products").add(productData);

        alert("Product posted successfully!");
        window.location.href = "home.html";

    } catch (err) {
        console.error(err);
        alert("Error posting product.");
    }
});
