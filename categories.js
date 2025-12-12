db.collection("categories").get().then(snapshot => {
    let html = "";

    snapshot.forEach(doc => {
        let data = doc.data();

        html += `
        <div class="category-box" onclick="openSub('${doc.id}')">
            <img src="${data.icon}">
            <p>${data.name}</p>
        </div>
        `;
    });

    document.getElementById("categoryList").innerHTML = html;
});

function openSub(catId) {
    window.location.href = "subcategories.html?cat=" + catId;
}
