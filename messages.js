// FIREBASE IMPORTS
import { 
    doc, setDoc, getDoc, onSnapshot, addDoc, updateDoc, collection, query, where 
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage, auth } from "./firebase.js";


// VARIABLES
const userId = localStorage.getItem("userId");
const otherUserId = localStorage.getItem("chatUserId");
const chatId = [userId, otherUserId].sort().join("_");

const chatWindow = document.getElementById("chatWindow");
const messageInput = document.getElementById("messageInput");
const typingIndicator = document.getElementById("typingIndicator");
const onlineStatus = document.getElementById("onlineStatus");
const searchInput = document.getElementById("searchInput");


// --------------------------
// 1. ONLINE STATUS + LAST SEEN
// --------------------------
onSnapshot(doc(db, "users", otherUserId), (snap) => {
    if (!snap.exists()) return;

    const data = snap.data();

    if (data.online === true) {
        onlineStatus.textContent = "Online";
        onlineStatus.style.color = "green";
    } else {
        const last = new Date(data.lastSeen).toLocaleTimeString();
        onlineStatus.textContent = "Last seen: " + last;
        onlineStatus.style.color = "gray";
    }
});


// --------------------------
// 2. TYPING INDICATOR
// --------------------------
const typingRef = doc(db, "chats", chatId, "typing", userId);

messageInput.addEventListener("input", async () => {
    await setDoc(typingRef, {
        typing: messageInput.value.length > 0,
        timestamp: Date.now()
    });
});

onSnapshot(doc(db, "chats", chatId, "typing", otherUserId), (snap) => {
    if (snap.exists() && snap.data().typing) {
        typingIndicator.style.display = "block";
    } else {
        typingIndicator.style.display = "none";
    }
});


// --------------------------
// 3. SEND MESSAGE
// --------------------------
document.getElementById("sendBtn").addEventListener("click", sendTextMessage);

async function sendTextMessage() {
    if (messageInput.value.trim() === "") return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
        senderId: userId,
        receiverId: otherUserId,
        text: messageInput.value,
        timestamp: Date.now(),
        seen: false,
        deleted: false
    });

    messageInput.value = "";
}


// --------------------------
// 4. IMAGE UPLOAD
// --------------------------
document.getElementById("imageUpload").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `chatImages/${chatId}/${Date.now()}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    await addDoc(collection(db, "chats", chatId, "messages"), {
        senderId: userId,
        receiverId: otherUserId,
        image: imageUrl,
        timestamp: Date.now(),
        seen: false,
        deleted: false
    });
});


// --------------------------
// 5. READ RECEIPTS
// --------------------------
onSnapshot(collection(db, "chats", chatId, "messages"), (snap) => {
    snap.forEach(async (msg) => {
        if (msg.data().receiverId === userId && !msg.data().seen) {
            await updateDoc(msg.ref, { seen: true });
        }
    });
});


// --------------------------
// 6. LOAD MESSAGES
// --------------------------
onSnapshot(collection(db, "chats", chatId, "messages"), (snap) => {
    chatWindow.innerHTML = "";

    snap.docs
        .sort((a, b) => a.data().timestamp - b.data().timestamp)
        .forEach((doc) => {
            const msg = doc.data();
            const div = document.createElement("div");

            div.className = msg.senderId === userId ?
                "my-message" : "their-message";

            // deleted message
            if (msg.deleted) {
                div.innerHTML = "<i>Message deleted</i>";
            }

            // image
            else if (msg.image) {
                div.innerHTML = `<img src='${msg.image}' class='chat-img'>`;
            }

            // text message
            else {
                div.textContent = msg.text;
            }

            // reaction
            if (msg.reaction) {
                div.innerHTML += `<span class='reaction'>${msg.reaction}</span>`;
            }

            // read receipt
            if (msg.senderId === userId) {
                div.innerHTML += msg.seen ?
                    " <span class='seen'>✔✔</span>" :
                    " <span class='delivered'>✔</span>";
            }

            // long press menu
            div.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                showMessageMenu(doc.id, msg.senderId);
            });

            chatWindow.appendChild(div);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        });
});


// --------------------------
// 7. MESSAGE MENU: DELETE + REACT
// --------------------------
function showMessageMenu(id, sender) {
    let menu = confirm("Delete (OK) or React (Cancel)?");

    if (menu) deleteMessage(id);
    else reactToMessage(id);
}

async function deleteMessage(id) {
    await updateDoc(doc(db, "chats", chatId, "messages", id), {
        deleted: true
    });
}

async function reactToMessage(id) {
    const r = prompt("React with emoji (👍❤️😂😡)");
    if (!r) return;

    await updateDoc(doc(db, "chats", chatId, "messages", id), {
        reaction: r
    });
}


// --------------------------
// 8. SEARCH MESSAGES
// --------------------------
searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const msgs = chatWindow.querySelectorAll("div");

    msgs.forEach(div => {
        div.style.display = div.textContent.toLowerCase().includes(keyword)
            ? "block" : "none";
    });
});


// --------------------------
// 9. BLOCK SYSTEM
// --------------------------
async function blockUser() {
    await setDoc(doc(db, "blocked", userId, "list", otherUserId), {
        blockedAt: Date.now()
    });
    alert("User blocked!");
}

async function checkIfBlocked() {
    const snap = await getDoc(doc(db, "blocked", otherUserId, "list", userId));
    if (snap.exists()) {
        alert("This person has blocked you.");
        messageInput.disabled = true;
    }
}

checkIfBlocked();
