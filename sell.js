const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");

document.addEventListener("DOMContentLoaded", loadCategories);

function loadCategories() {
  db.collection("categories").get()
    .then(snapshot => {
      categorySelect.innerHTML = '<option value="">Select category</option>';

      snapshot.forEach(doc => {
        const data = doc.data();
        const option = document.createElement("option");
        option.value = doc.id;
        option.textContent = `${data.icon || ""} ${data.name}`;
        categorySelect.appendChild(option);
      });
    })
    .catch(err => {
      console.error("Category error:", err);
      categorySelect.innerHTML = '<option>Error loading categories</option>';
    });
}

categorySelect.addEventListener("change", () => {
  const categoryId = categorySelect.value;

  if (!categoryId) {
    subcategorySelect.innerHTML = '<option>Select category first</option>';
    subcategorySelect.disabled = true;
    return;
  }

  subcategorySelect.disabled = true;
  subcategorySelect.innerHTML = '<option>Loading subcategories...</option>';

  db.collection("subcategories")
    .where("categoryId", "==", categoryId)
    .get()
    .then(snapshot => {
      subcategorySelect.innerHTML = '<option value="">Select subcategory</option>';

      snapshot.forEach(doc => {
        const option = document.createElement("option");
        option.value = doc.id;
        option.textContent = doc.data().name;
        subcategorySelect.appendChild(option);
      });

      subcategorySelect.disabled = false;
    })
    .catch(err => {
      console.error("Subcategory error:", err);
      subcategorySelect.innerHTML = '<option>Error loading subcategories</option>';
    });
});
