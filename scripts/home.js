// ------------------------------
// SANUYO MARKETPLACE - HOME PAGE
// Fetch items from Firestore
// ------------------------------

const featuredList = document.getElementById("featured-list");
const recentList = document.getElementById("recent-list");

// Load Featured Ads (premium ads)
db.collection("ads")
  .where("premium", "==", true)
  .limit(6)
  .onSnapshot((snapshot) => {
    featuredList.innerHTML = "";
    snapshot.forEach((doc) => {
      const ad = doc.data();
      featuredList.innerHTML += adCard(ad, doc.id);
    });
  });

// Load Recent Ads
db.collection("ads")
  .orderBy("created_at", "desc")
  .limit(10)
  .onSnapshot((snapshot) => {
    recentList.innerHTML = "";
    snapshot.forEach((doc) => {
      const ad = doc.data();
      recentList.innerHTML += adCard(ad, doc.id);
    });
  });

// ------------------------------
// AD CARD TEMPLATE
// ------------------------------
function adCard(ad, id) {
  const image = ad.images && ad.images.length > 0
    ? ad.images[0]
    : "assets/no-image.png";

  return `
    <a href="product.html?id=${id}" class="item-card">
        <img src="${image}" alt="${ad.title}">
        <div class="item-info">
            <h4>${ad.title}</h4>
            <p>${ad.location}</p>
            <p class="price">₦${formatPrice(ad.price)}</p>
        </div>
    </a>
  `;
}

// Format prices like: 50,000
function formatPrice(num) {
  return Number(num).toLocaleString();
}
