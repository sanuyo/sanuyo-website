// ======================
// SANUYO CATEGORY SYSTEM
// ======================

// FULL SUBCATEGORY DATA (Jiji Style)
const subcategoryData = {
    electronics: [
        "Mobile Phones",
        "Accessories",
        "Laptops",
        "TVs",
        "Audio Systems",
        "Video Games",
        "Smart Watches",
        "Cameras"
    ],

    vehicles: [
        "Cars",
        "Motorcycles",
        "Trucks & Trailers",
        "Vehicle Parts",
        "Marine"
    ],

    property: [
        "Houses for Rent",
        "Houses for Sale",
        "Land & Plots",
        "Commercial Property",
        "Short Let"
    ],

    home: [
        "Furniture",
        "Kitchen Appliances",
        "Home Appliances",
        "Garden",
        "Decor Items"
    ],

    fashion: [
        "Men's Fashion",
        "Women's Fashion",
        "Shoes",
        "Bags",
        "Jewelry"
    ],

    beauty: [
        "Skincare",
        "Hair Products",
        "Makeup",
        "Fragrances"
    ],

    sports: [
        "Gym Equipment",
        "Sports Gear",
        "Bicycles"
    ],

    pets: [
        "Dogs",
        "Cats",
        "Birds",
        "Fish",
        "Pet Accessories"
    ],

    services: [
        "Repair Services",
        "Cleaning Services",
        "Home Tutors",
        "Event Services",
        "Catering",
        "Health & Wellness"
    ],

    jobs: [
        "Full-time Jobs",
        "Part-time Jobs",
        "Teaching Jobs",
        "IT Jobs",
        "Sales Jobs",
        "Hotel Jobs"
    ],

    kids: [
        "Baby Gear",
        "Toys",
        "Kids Fashion",
        "School Items"
    ],

    agriculture: [
        "Livestock",
        "Feeds & Supplements",
        "Farm Machinery",
        "Seeds",
        "Fertilizers"
    ]
};


// ======================
// SUBCATEGORY HANDLING
// ======================

const categoryItems = document.querySelectorAll(".category-item");
const subPanel = document.getElementById("subcategories-panel");
const subList = document.getElementById("subcategories-list");

let activeCategory = null;

categoryItems.forEach(item => {
    item.addEventListener("click", () => {
        const category = item.getAttribute("data-category");

        // If same category clicked → toggle panel hide
        if (activeCategory === category) {
            subPanel.classList.toggle("show");
            return;
        }

        activeCategory = category;

        // Load subcategories
        loadSubcategories(category);

        // Show panel with slide animation
        subPanel.classList.add("show");

        // Scroll down smoothly to subcategories
        subPanel.scrollIntoView({ behavior: "smooth" });
    });
});


// ======================
// LOAD SUBCATEGORIES
// ======================
function loadSubcategories(category) {
    const list = subcategoryData[category] || [];

    subList.innerHTML = ""; // clear old list

    list.forEach(sub => {
        const div = document.createElement("div");
        div.classList.add("sub-item");
        div.textContent = sub;

        // When clicked redirect to category listing page
        div.onclick = () => {
            window.location.href = `products.html?cat=${category}&sub=${sub}`;
        };

        subList.appendChild(div);
    });
}
