const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");

let categoryMap = {};

db.collection("categories").get().then(snapshot => {
  categorySelect.innerHTML = '<option value="">Select Category</option>';

  snapshot.forEach(doc => {
    const data = doc.data();
    categoryMap[doc.id] = data.subcategories || [];

    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = data.name;
    categorySelect.appendChild(option);
  });
});

categorySelect.addEventListener("change", () => {
  const selected = categorySelect.value;
  subcategorySelect.innerHTML = '<option value="">Select Subcategory</option>';

  if (categoryMap[selected]) {
    categoryMap[selected].forEach(sub => {
      const opt = document.createElement("option");
      opt.value = sub;
      opt.textContent = sub;
      subcategorySelect.appendChild(opt);
    });
  }
});
