// TEMP SAMPLE CHAT DATA
let chats = [
    {
        id: 1,
        user: "Michael",
        lastMessage: "Is this still available?",
        avatar: "https://cdn-icons-png.flaticon.com/128/1077/1077012.png"
    },
    {
        id: 2,
        user: "Blessing",
        lastMessage: "How much last price?",
        avatar: "https://cdn-icons-png.flaticon.com/128/1946/1946429.png"
    }
];

// LOAD CHAT LIST
const chatList = document.getElementById("chatList");

chats.forEach(chat => {
    chatList.innerHTML += `
        <div class="chat-item" onclick="openChat(${chat.id})">
            <img src="${chat.avatar}">
            <div class="chat-info">
                <h4>${chat.user}</h4>
                <p>${chat.lastMessage}</p>
            </div>
        </div>
    `;
});

function openChat(id) {
    window.location.href = `chat.html?id=${id}`;
}
