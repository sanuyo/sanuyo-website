// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, updateDoc, collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// FIREBASE SETUP
const firebaseConfig = {
    apiKey: "AIzaSyDcSCU5TIout3oQm1ADYISmuf3M1--1JLY",
    authDomain: "sanuyo-website.firebaseapp.com",
    projectId: "sanuyo-website",
    storageBucket: "sanuyo-website.firebasestorage.app",
    messagingSenderId: "765213630366",
    appId: "1:765213630366:web:03279e61a58289b088808f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -----------------------------
// GET CHAT DATA
// -----------------------------
const params = new URLSearchParams(window.location.search);
const chatId = params.get("chatId");
const myId = params.get("me");  
const otherId = params.get("user");

document.getElementById("typingIndicator").style.display = "none";

const chatRef = doc(db, "messages", chatId);
const messageListRef = collection(db, "messages", chatId, "chat");

// -----------------------------
// LOAD USER INFO
// -----------------------------
async function loadUserInfo() {
    const userDoc = await getDoc(doc(db, "users", otherId));
    if (userDoc.exists()) {
        document.getElementById("chatUserName").innerText = userDoc.data().name;
        document.getElementById("chatUserImage").src = userDoc.data().photo;
    }
}

loadUserInfo();

// -----------------------------
// LISTEN FOR ONLINE STATUS
// -----------------------------
onSnapshot(doc(db, "users", otherId), (snap) => {
    if (!snap.exists()) return;

    const data = snap.data();
    document.getElementById("chatUserStatus").innerText =
        data.online ? "Online" : "Last seen: " + data.lastSeen;
});

// -----------------------------
// LISTEN FOR TYPING
// -----------------------------
onSnapshot(chatRef, (snap) => {
    if (!snap.exists()) return;

    const data = snap.data();

    if (data.typing === otherId) {
        document.getElementById("typingIndicator").style.display = "block";
    } else {
        document.getElementById("typingIndicator").style.display = "none";
    }
});

// -----------------------------
// LOAD MESSAGES LIVE
// -----------------------------
onSnapshot(messageListRef, (snapshot) => {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";

    snapshot.forEach(doc => {
        const msg = doc.data();

        const bubble = document.createElement("div");
        bubble.classList.add("message");
        bubble.classList.add(msg.sender === myId ? "sent" : "received");

        bubble.innerHTML = `
            ${msg.text}
            <div class="time">${msg.time}</div>
        `;

        chatBox.appendChild(bubble);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
});

// -----------------------------
// SEND MESSAGE
// -----------------------------
document.getElementById("sendBtn").onclick = sendMessage;

async function sendMessage() {
    const text = document.getElementById("messageInput").value.trim();
    if (text === "") return;

    await addDoc(messageListRef, {
        sender: myId,
        receiver: otherId,
        text,
        time: new Date().toLocaleTimeString(),
        seen: false
    });

    document.getElementById("messageInput").value = "";

    await updateDoc(chatRef, { typing: "" });
}

// -----------------------------
// TYPING INDICATOR LOGIC
// -----------------------------
let typingTimeout;

document.getElementById("messageInput").addEventListener("input", async () => {
    await updateDoc(chatRef, { typing: myId });

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(async () => {
        await updateDoc(chatRef, { typing: "" });
    }, 1200);
});
