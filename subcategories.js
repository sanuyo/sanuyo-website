const urlParams = new URLSearchParams(window.location.search);
const catId = urlParams.get("cat");

db.collection("categories").doc(catId).collection("subcategories").get().then(snapshot => {
    let html = "";

    snapshot.forEach(doc => {
        let data = doc.data();

        html += `
        <div class="category-box" onclick="openProducts('${catId}', '${doc.id}')">
            <img src="${data.icon}">
            <p>${data.name}</p>
        </div>
        `;
    });

    document.getElementById("subList").innerHTML = html;
});

function openProducts(cat, sub) {
    window.location.href = "products.html?cat=" + cat + "&sub=" + sub;
}
