// Make sure page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  loadCategories();
  document.getElementById("categorySelect").addEventListener("change", loadSubcategories);
});

// Load categories
function loadCategories() {
  const catSelect = document.getElementById("categorySelect");
  catSelect.innerHTML = `<option value="">Select Category</option>`;

  db.collection("categories").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const c = doc.data();
        const option = document.createElement("option");
        option.value = doc.id;
        option.textContent = c.name;
        catSelect.appendChild(option);
      });
    })
    .catch(err => {
      alert("Category load error");
      console.error(err);
    });
}

// Load subcategories
function loadSubcategories() {
  const catId = document.getElementById("categorySelect").value;
  const subSelect = document.getElementById("subcategorySelect");

  subSelect.innerHTML = `<option value="">Select Subcategory</option>`;
  if (!catId) return;

  db.collection("subcategories")
    .where("categoryId", "==", catId)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const s = doc.data();
        const option = document.createElement("option");
        option.value = s.name;
        option.textContent = s.name;
        subSelect.appendChild(option);
      });
    })
    .catch(err => {
      alert("Subcategory load error");
      console.error(err);
    });
}

// Post product
function postAd() {
  const catSelect = document.getElementById("categorySelect");

  const product = {
    category: catSelect.options[catSelect.selectedIndex].text,
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
    alert("Fill all required fields");
    return;
  }

  db.collection("products").add(product).then(() => {
    alert("Ad posted successfully");
    window.location.href = "home.html";
  });
           }
