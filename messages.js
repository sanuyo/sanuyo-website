// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, collection, addDoc, serverTimestamp, orderBy, query, onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// YOUR FIREBASE DETAILS
const firebaseConfig = {
  apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
  authDomain: "sanuyo-website.firebaseapp.com",
  projectId: "sanuyo-website",
  storageBucket: "sanuyo-website.firebasestorage.app",
  messagingSenderId: "765213630366",
  appId: "1:765213630366:web:03279e61a58289b088808f"
};

// INIT FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM
const messageInput = document.getElementById("messageInput");
const messagesBox = document.getElementById("messagesBox");

// DEFAULT USER (You can make dynamic later)
const currentUser = "User123"; 

// SEND MESSAGE
async function sendMessage() {
  let text = messageInput.value.trim();
  if (text === "") return;

  await addDoc(collection(db, "messages"), {
    text: text,
    sender: currentUser,
    createdAt: serverTimestamp()
  });

  messageInput.value = "";
}

// LISTEN TO MESSAGES REAL-TIME
const q = query(collection(db, "messages"), orderBy("createdAt"));

onSnapshot(q, (snapshot) => {
  messagesBox.innerHTML = "";

  snapshot.forEach((doc) => {
    const msg = doc.data();

    let div = document.createElement("div");
    div.classList.add("message");

    if (msg.sender === currentUser) {
      div.classList.add("sent");
    }

    div.textContent = msg.text;
    messagesBox.appendChild(div);
  });

  // AUTO SCROLL
  messagesBox.scrollTop = messagesBox.scrollHeight;
});

// GLOBAL ACCESS
window.sendMessage = sendMessage;
