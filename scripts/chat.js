const params = new URLSearchParams(window.location.search);
const chatId = params.get("id");

// Dummy chat data (future: Firebase integration)
let chatUsers = {
    1: "Michael",
    2: "Blessing"
};

let messages = {
    1: [
        { from: "them", text: "Is the phone still available?" },
        { from: "you", text: "Yes, it's available." }
    ],
    2: [
        { from: "them", text: "How much last price?" },
        { from: "you", text: "50k final" }
    ]
};

// Set the current chat user
document.getElementById("chatUser").innerText = chatUsers[chatId];

const chatWindow = document.getElementById("chatWindow");

// Load messages
messages[chatId].forEach(msg => {
    chatWindow.innerHTML += `
        <div class="message ${msg.from}">
            ${msg.text}
        </div>
    `;
});

// Send new message
document.getElementById("sendBtn").addEventListener("click", () => {
    let input = document.getElementById("messageInput");
    if (input.value.trim() === "") return;

    // Add message
    chatWindow.innerHTML += `
        <div class="message you">${input.value}</div>
    `;

    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;

    input.value = "";
});
