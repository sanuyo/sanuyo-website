// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
    authDomain: "sanuyo-website.firebaseapp.com",
    projectId: "sanuyo-website",
    storageBucket: "sanuyo-website.appspot.com",
    messagingSenderId: "765213630366",
    appId: "1:765213630366:web:03279e61a58289b088808f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Form & elements
const sellForm = document.getElementById('sellForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const phoneInput = document.getElementById('phone');
const urgentCheckbox = document.getElementById('urgent');
const negotiableCheckbox = document.getElementById('negotiable');
const tagsInput = document.getElementById('tags');
const imagesInput = document.getElementById('images');
const successMessage = document.getElementById('successMessage');

sellForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Upload images to Firebase Storage
    const imageFiles = imagesInput.files;
    const imageUrls = [];

    for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const storageRef = storage.ref(`products/${Date.now()}_${file.name}`);
        await storageRef.put(file);
        const url = await storageRef.getDownloadURL();
        imageUrls.push(url);
    }

    // Tags array
    const tagsArray = tagsInput.value.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

    // Add product to Firestore
    db.collection("products").add({
        title: titleInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        phone: phoneInput.value,
        urgent: urgentCheckbox.checked,
        negotiable: negotiableCheckbox.checked,
        tags: tagsArray,
        images: imageUrls,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        successMessage.style.display = "block";
        sellForm.reset();
        setTimeout(() => successMessage.style.display = "none", 5000);
    })
    .catch(error => {
        alert("Error posting ad: " + error.message);
    });
});
