// --- Subcategory data ---
const subcategories = {
    phones: ["Smartphones", "iPhone", "Samsung", "Tecno", "Infinix", "Accessories"],
    electronics: ["TV", "Home Theatre", "Speakers", "Cameras", "Power Banks"],
    vehicles: ["Cars", "Motorcycles", "Trucks", "Buses", "Vehicle Parts"],
    fashion: ["Men", "Women", "Shoes", "Bags", "Jewelry"],
    realestate: ["Houses", "Apartments", "Lands", "Commercial Property"],
    home: ["Furniture", "Kitchen", "Decoration", "Garden"],
    pets: ["Dogs", "Cats", "Birds", "Fish"],
    sports: ["Gym", "Bicycles", "Sportswear"]
};

// --- Show dropdown ---
function toggleSub(cat) {
    const box = document.getElementById("subcategories");
    const title = document.getElementById("subcat-title");
    const list = document.getElementById("subcat-list");

    title.innerText = cat.toUpperCase();

    list.innerHTML = subcategories[cat]
        .map(item => `<div onclick="openSubcategory('${cat}','${item}')">${item}</div>`)
        .join("");

    box.classList.remove("hidden");
}

// --- Open category page ---
function openCategory(cat) {
    window.location.href = `category.html?cat=${cat}`;
}

// --- Open subcategory page ---
function openSubcategory(cat, sub) {
    window.location.href = `category.html?cat=${cat}&sub=${sub}`;
}
