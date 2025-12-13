// LOAD CATEGORIES
db.collection("categories").get().then(snapshot => {
    let html = "";

    snapshot.forEach(doc => {
        let c = doc.data();

        html += `
        <div class="cat-box" onclick="openSub('${doc.id}', '${c.name}')">
            <img src="${c.icon}">
            <p>${c.name}</p>
        </div>`;
    });

    document.getElementById("categoryGrid").innerHTML = html;
});

// OPEN SUBCATEGORY POPUP
function openSub(catId, catName) {
    document.getElementById("subTitle").innerText = catName;
    document.getElementById("subPopup").classList.remove("hidden");

    db.collection("subcategories")
      .where("categoryId", "==", catId)
      .get()
      .then(snapshot => {
        let html = "";

        snapshot.forEach(doc => {
            let s = doc.data();
            html += `
                <div class="sub-item" onclick="goProducts('${catName}', '${s.name}')">
                    ${s.name}
                </div>
            `;
        });

        document.getElementById("subList").innerHTML = html;
      });
}

function closeSub() {
    document.getElementById("subPopup").classList.add("hidden");
}

// GO TO PRODUCTS PAGE
function goProducts(cat, sub) {
    window.location.href = `products.html?cat=${cat}&sub=${sub}`;
}

// LATEST PRODUCTS
db.collection("products").limit(10).get().then(snapshot => {
    let html = "";

    snapshot.forEach(doc => {
        let p = doc.data();

        html += `
        <div class="product-card" onclick="openProd('${doc.id}')">
            <img src="${p.images[0]}">
            <h4>${p.title}</h4>
            <p class="price">₦${p.price}</p>
        </div>`;
    });

    document.getElementById("latestProducts").innerHTML = html;
});

function openProd(id) {
    window.location.href = "product.html?id=" + id;
}
