const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");
const sellForm = document.getElementById("sellForm");

let categoryMap = {};

// 🔥 LOAD CATEGORIES
db.collection("categories").get().then(snapshot => {
  console.log("TOTAL CATEGORIES:", snapshot.size);

  categorySelect.innerHTML = '<option value="">Select Category</option>';

  snapshot.forEach(doc => {
    const data = doc.data();
    console.log("CATEGORY FOUND:", doc.id, data.name);

    categoryMap[doc.id] = data.subcategories || [];

    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = data.name;
    categorySelect.appendChild(option);
  });
}).catch(err => {
  console.error("Error loading categories:", err);
});

// 🔥 LOAD SUBCATEGORIES
categorySelect.addEventListener("change", function () {
  const selectedCategory = this.value;
  subcategorySelect.innerHTML = '<option value="">Select Subcategory</option>';

  if (categoryMap[selectedCategory]) {
    categoryMap[selectedCategory].forEach(sub => {
      const opt = document.createElement("option");
      opt.value = sub;
      opt.textContent = sub;
      subcategorySelect.appendChild(opt);
    });
  }
});

// 🔥 SUBMIT PRODUCT
sellForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const product = {
    categoryId: categorySelect.value,
    categoryName: categorySelect.options[categorySelect.selectedIndex].text,
    subcategory: subcategorySelect.value,
    title: document.getElementById("title").value,
    price: Number(document.getElementById("price").value),
    phone: document.getElementById("phone").value,
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
    images: [document.getElementById("image").value],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    status: "active"
  };

  db.collection("products").add(product).then(() => {
    alert("Ad posted successfully!");
    sellForm.reset();
    subcategorySelect.innerHTML = '<option value="">Select category first</option>';
  }).catch(err => {
    alert("Error posting ad");
    console.error(err);
  });
});
