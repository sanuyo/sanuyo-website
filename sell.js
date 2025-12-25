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
const storage = firebase.storage();
const firestore = firebase.firestore();

const sellForm = document.getElementById('sellForm');
const successMessage = document.getElementById('successMessage');

sellForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const phone = document.getElementById('phone').value;
    const urgent = document.getElementById('urgent').checked;
    const negotiable = document.getElementById('negotiable').checked;
    const images = document.getElementById('images').files;

    if (images.length === 0) {
        alert("Please select at least one image");
        return;
    }

    // Upload all images
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const storageRef = storage.ref().child(`ads/${Date.now()}_${file.name}`);
        const snapshot = await storageRef.put(file);
        const url = await snapshot.ref.getDownloadURL();
        imageUrls.push(url);
    }

    // Save ad to Firestore
    firestore.collection('products').add({
        title,
        description,
        price: parseFloat(price),
        location,
        phone,
        urgent,
        negotiable,
        images: imageUrls,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        successMessage.style.display = 'block';
        sellForm.reset();
        setTimeout(() => successMessage.style.display = 'none', 5000);
    }).catch((err) => {
        console.error("Error posting ad:", err);
        alert("Failed to post ad, please try again.");
    });
});
