import categories from "./categories.js";

// Load categories on page
const categorySelect = document.getElementById("category");
const subCategorySelect = document.getElementById("subCategory");

categorySelect.innerHTML = `<option value="">Any</option>`;
categories.forEach(cat => {
  categorySelect.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
});

// Load subcategories when category changes
categorySelect.addEventListener("change", () => {
  const selected = categories.find(c => c.id === categorySelect.value);

  subCategorySelect.innerHTML = `<option value="">Any</option>`;

  if (selected) {
    selected.sub.forEach(s => {
      subCategorySelect.innerHTML += `<option value="${s}">${s}</option>`;
    });
  }
});

// Apply Filters
document.getElementById("applyFilters").addEventListener("click", () => {
  const query = new URLSearchParams({
    min: document.getElementById("minPrice").value,
    max: document.getElementById("maxPrice").value,
    condition: document.getElementById("condition").value,
    location: document.getElementById("location").value,
    cat: categorySelect.value,
    sub: subCategorySelect.value,
    sort: document.getElementById("sortBy").value
  });

  window.location.href = "search.html?" + query.toString();
});
