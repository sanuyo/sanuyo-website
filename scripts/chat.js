// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, doc, setDoc, getDoc, onSnapshot, updateDoc, 
    collection, addDoc, serverTimestamp, query, orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
// GET USER CHAT DATA
// -----------------------------
const params = new URLSearchParams(window.location.search);
const chatId = params.get("chatId");
const myId = params.get("me");
const otherId = params.get("user");

const chatRef = doc(db, "messages", chatId);
const messageListRef = collection(db, "messages", chatId, "chat");

// TIME FORMATTING
function formatTime(ts) {
    if (!ts) return "";

    const date = ts.toDate();
    const now = new Date();

    const diff = now - date;
    const one_day = 86400000;

    let time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (date.toDateString() === now.toDateString()) return "Today • " + time;
    if (now - date < one_day * 2) return "Yesterday • " + time;

    return date.toLocaleDateString() + " • " + time;
}

// -----------------------------
// LOAD RECEIVER INFO
// -----------------------------
async function loadUser() {
    const docSnap = await getDoc(doc(db, "users", otherId));
    if (!docSnap.exists()) return;

    const data = docSnap.data();
    document.getElementById("chatUserName").innerText = data.name;
    document.getElementById("chatUserImage").src = data.photo;

    // online status listener
    onSnapshot(doc(db, "users", otherId), (snap) => {
        const info = snap.data();
        if (info.online) {
            document.getElementById("chatUserStatus").innerText = "Online";
        } else {
            document.getElementById("chatUserStatus").innerText = "Last seen: " + info.lastSeen;
        }
    });
}

loadUser();

// -----------------------------
// TYPING INDICATOR LISTENER
// -----------------------------
onSnapshot(chatRef, (snap) => {
    const data = snap.data();
    const typingDiv = document.getElementById("typingIndicator");

    typingDiv.style.display = data.typing === otherId ? "block" : "none";
});

// -----------------------------
// LOAD MESSAGES + SEEN SYSTEM
// -----------------------------
onSnapshot(query(messageListRef, orderBy("timestamp", "asc")), (snapshot) => {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";

    snapshot.forEach((docSnap) => {
        const msg = docSnap.data();

        const div = document.createElement("div");
        div.classList.add("message", msg.sender === myId ? "sent" : "received");

        let ticks = "";
        if (msg.sender === myId) {
            if (msg.seen) {
                ticks = `<span class="seen">✓✓</span>`;
            } else {
                ticks = `<span class="delivered">✓</span>`;
            }
        }

        div.innerHTML = `
            ${msg.text}
            <div class="time">${formatTime(msg.timestamp)} ${ticks}</div>
        `;

        chatBox.appendChild(div);

        // AUTO-MARK AS SEEN
        if (msg.receiver === myId && !msg.seen) {
            updateDoc(doc(db, "messages", chatId, "chat", docSnap.id), {
                seen: true
            });
        }
    });

    chatBox.scrollTop = chatBox.scrollHeight;
});

// -----------------------------
// SEND MESSAGE
// -----------------------------
document.getElementById("sendBtn").addEventListener("click", sendMessage);

async function sendMessage() {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();
    if (!text) return;

    await addDoc(messageListRef, {
        text,
        sender: myId,
        receiver: otherId,
        timestamp: serverTimestamp(),
        seen: false
    });

    await updateDoc(chatRef, { typing: "" });

    input.value = "";
}

// -----------------------------
// TYPING DETECTION
// -----------------------------
let typingTimeout;

document.getElementById("messageInput").addEventListener("input", async () => {
    await updateDoc(chatRef, { typing: myId });

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        updateDoc(chatRef, { typing: "" });
    }, 1200);
});
