// Load Categories
db.collection("categories").get().then(snap => {
    snap.forEach(doc => {
        let data = doc.data();
        document.getElementById("categorySelect").innerHTML += `
            <option value="${doc.id}">${data.name}</option>
        `;
    });
});


// Load Subcategories
function loadSubcategories() {
    let catId = document.getElementById("categorySelect").value;

    db.collection("categories").doc(catId).collection("subcategories").get().then(snap => {
        let html = `<option value="">Select Subcategory</option>`;

        snap.forEach(doc => {
            html += `<option value="${doc.id}">${doc.data().name}</option>`;
        });

        document.getElementById("subcategorySelect").innerHTML = html;
    });
}



// Upload Product
function uploadProduct() {

    let data = {
        category: document.getElementById("categorySelect").value,
        subcategory: document.getElementById("subcategorySelect").value,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        phone: document.getElementById("phone").value,
        price: Number(document.getElementById("price").value),
        location: document.getElementById("location").value,
        images: [document.getElementById("img1").value],
        date: new Date()
    };

    db.collection("products").add(data).then(() => {
        alert("Product Uploaded Successfully!");
        window.location.href = "home.html";
    });
}
