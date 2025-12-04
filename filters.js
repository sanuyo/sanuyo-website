// ---------------------------
// FULL CATEGORIES + SUB CATEGORIES
// ---------------------------
const categories = {
    "phones": ["Smartphones", "Tablets", "Accessories"],
    "electronics": ["TVs", "Home Theatre", "Cameras"],
    "fashion": ["Men", "Women", "Shoes"],
    "home": ["Furniture", "Kitchen", "Decoration"],
    "computers": ["Laptops", "Desktops", "PC Accessories"],
    "vehicles": ["Cars", "Motorcycles", "Trucks"],
    "property": ["For Rent", "For Sale", "Short Let"],
    "services": ["Repair", "Printing", "Freelance"],
    "jobs": ["Full-time", "Part-time", "Remote"],
    "others": ["Miscellaneous"]
};

// ---------------------------
// STATES + CITIES (Nigeria)
// ---------------------------
const locations = {
    "Lagos": ["Ikeja", "Surulere", "Lekki", "Yaba"],
    "Abuja": ["Gwagwalada", "Kubwa", "Asokoro"],
    "Oyo": ["Ibadan North", "Ogbomoso", "Egbeda"],
    "Rivers": ["Port Harcourt", "Obio-Akpor"],
    "Kano": ["Gwale", "Nassarawa"],
};

// ---------------------------
// Fill category dropdown
// ---------------------------
const catSelect = document.getElementById("categorySelect");
const subSelect = document.getElementById("subCategorySelect");

catSelect.innerHTML = `<option value="">Any</option>`;
Object.keys(categories).forEach(cat => {
    catSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
});

// Load sub categories on change
catSelect.addEventListener("change", () => {
    const sel = catSelect.value;
    subSelect.innerHTML = `<option value="">Any</option>`;

    if (categories[sel]) {
        categories[sel].forEach(sub => {
            subSelect.innerHTML += `<option value="${sub}">${sub}</option>`;
        });
    }
});

// ---------------------------
// Fill State dropdown
// ---------------------------
const stateSelect = document.getElementById("stateSelect");
const citySelect = document.getElementById("citySelect");

stateSelect.innerHTML = `<option value="">Any</option>`;
Object.keys(locations).forEach(state => {
    stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
});

// Load cities
stateSelect.addEventListener("change", () => {
    const st = stateSelect.value;
    citySelect.innerHTML = `<option value="">Any</option>`;

    if (locations[st]) {
        locations[st].forEach(city => {
            citySelect.innerHTML += `<option value="${city}">${city}</option>`;
        });
    }
});

// ---------------------------
// APPLY FILTERS
// ---------------------------
function applyFilters() {
    const params = new URLSearchParams();

    const min = document.getElementById("minPrice").value;
    const max = document.getElementById("maxPrice").value;
    const cond = document.getElementById("conditionSelect").value;
    const cat = catSelect.value;
    const sub = subSelect.value;
    const state = stateSelect.value;
    const city = citySelect.value;
    const brand = document.getElementById("brandInput").value;
    const year = document.getElementById("yearInput").value;

    if (min) params.set("min", min);
    if (max) params.set("max", max);
    if (cond) params.set("condition", cond);
    if (cat) params.set("cat", cat);
    if (sub) params.set("sub", sub);
    if (state) params.set("location", state);
    if (city) params.set("city", city);
    if (brand) params.set("brand", brand);
    if (year) params.set("year", year);

    window.location.href = `search.html?${params.toString()}`;
}
