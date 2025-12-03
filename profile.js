// Load profile info from localStorage or Firebase
document.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("userName") || "Guest User";
    const phone = localStorage.getItem("userPhone") || "Not set";

    document.getElementById("profileName").innerText = name;
    document.getElementById("profilePhone").innerText = phone;
});

function editProfile() {
    window.location.href = "edit-profile.html";
}

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    alert("You have logged out.");
    window.location.href = "home.html";
}
