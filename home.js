// Load Categories
db.collection("categories").get().then(snapshot => {
    let html = "";
    snapshot.forEach(doc => {
        let data = doc.data();

        html += `
        <div class="category-box" onclick="openCategory('${doc.id}')">
            <img src="${data.icon}">
            <p>${data.name}</p>
        </div>
        `;
    });

    document.getElementById("categoryList").innerHTML = html;
});

function openCategory(id) {
    window.location.href = "subcategories.html?cat=" + id;
}



// Load Latest Products
db.collection("products").orderBy("date", "desc").limit(20).get().then(snapshot => {
    let html = "";

    snapshot.forEach(doc => {
        let p = doc.data();

        html += `
        <div class="product-card" onclick="openProduct('${doc.id}')">
            <img src="${p.images[0]}">
            <h4>${p.title}</h4>
            <p>₦${p.price}</p>
        </div>
        `;
    });

    document.getElementById("productGrid").innerHTML = html;
});

function openProduct(id) {
    window.location.href = "product.html?id=" + id;
}
