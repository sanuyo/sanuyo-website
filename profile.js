// Load user data (later connected to Firebase)
document.getElementById("profileName").innerText =
    localStorage.getItem("sanuUserName") || "Guest User";

document.getElementById("profilePhone").innerText =
    localStorage.getItem("sanuUserPhone") || "+234 --- --- ----";

function goTo(page) {
    window.location.href = page;
}

function topUp() {
    alert("Top Up Wallet coming soon!");
}

function openPremium() {
    window.location.href = "premium.html";
}

function logout() {
    localStorage.clear();
    alert("Logged out!");
    window.location.href = "home.html";
}
