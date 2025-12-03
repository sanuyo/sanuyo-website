// Load previous values into form
document.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("userName") || "";
    const phone = localStorage.getItem("userPhone") || "";
    const pic = localStorage.getItem("userPic") || 
        "https://cdn-icons-png.flaticon.com/512/1077/1077012.png";

    document.getElementById("editName").value = name;
    document.getElementById("editPhone").value = phone;
    document.getElementById("editProfilePic").src = pic;
});

function choosePic() {
    document.getElementById("profilePicInput").click();
}

document.getElementById("profilePicInput").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("editProfilePic").src = e.target.result;

        // Save temporary preview
        localStorage.setItem("userPic", e.target.result);
    };
    reader.readAsDataURL(file);
});

function saveProfile() {
    const name = document.getElementById("editName").value.trim();
    const phone = document.getElementById("editPhone").value.trim();

    if (name === "" || phone === "") {
        alert("All fields are required.");
        return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userPhone", phone);

    alert("Profile updated!");
    window.location.href = "profile.html";
}
