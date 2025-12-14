// LOAD CATEGORIES
db.collection("categories").get().then(snapshot => {
    let select = document.getElementById("categorySelect");

    snapshot.forEach(doc => {
        let c = doc.data();
        let option = document.createElement("option");
        option.value = doc.id;
        option.textContent = c.name;
        select.appendChild(option);
    });
});

// LOAD SUBCATEGORIES
function loadSubcategories() {
    let catId = document.getElementById("categorySelect").value;
    let subSelect = document.getElementById("subcategorySelect");

    subSelect.innerHTML = `<option value="">Select Subcategory</option>`;

    if (!catId) return;

    db.collection("subcategories")
      .where("categoryId", "==", catId)
      .get()
      .then(snapshot => {
          snapshot.forEach(doc => {
              let s = doc.data();
              let option = document.createElement("option");
              option.value = s.name;
              option.textContent = s.name;
              subSelect.appendChild(option);
          });
      });
}

// POST AD
function postAd() {
    let catSelect = document.getElementById("categorySelect");
    let categoryName = catSelect.options[catSelect.selectedIndex].text;

    let product = {
        category: categoryName,
        subcategory: document.getElementById("subcategorySelect").value,
        title: document.getElementById("title").value,
        price: Number(document.getElementById("price").value),
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value,
        images: [document.getElementById("imageUrl").value],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (!product.category || !product.subcategory || !product.title) {
        alert("Please fill all required fields");
        return;
    }

    db.collection("products").add(product).then(() => {
        alert("Ad posted successfully!");
        window.location.href = "home.html";
    });
        }
