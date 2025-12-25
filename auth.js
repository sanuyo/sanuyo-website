import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// REGISTER
const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    try {
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      if (!name || !phone || !email || !password) {
        alert("Fill all fields");
        return;
      }

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        phone,
        email,
        joinedAt: serverTimestamp()
      });

      alert("Registration successful!");
      window.location.href = "home.html";

    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  });
                       }
