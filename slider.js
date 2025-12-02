let currentIndex = 0;
let slideInterval;

const slides = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides");
const dotsContainer = document.getElementById("sliderDots");

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.onclick = () => goToSlide(index);
    if (index === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
});

function updateSlider() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    document.querySelectorAll("#sliderDots span").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

// Auto-slide every 4 seconds
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Start slider
startAutoSlide();

// Pause on hover
document.querySelector(".hero-slider").addEventListener("mouseover", stopAutoSlide);
document.querySelector(".hero-slider").addEventListener("mouseout", startAutoSlide);
