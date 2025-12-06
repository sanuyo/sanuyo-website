import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// Sample categories
const categories = [
  { id: "electronics", name: "Electronics", icon: "💻" },
  { id: "vehicles", name: "Vehicles", icon: "🚗" },
  { id: "property", name: "Property", icon: "🏠" },
  { id: "mobile-phones", name: "Mobile Phones", icon: "📱" },
  { id: "fashion", name: "Fashion", icon: "👗" },
  { id: "home-office", name: "Home & Office", icon: "🛋️" },
  { id: "health-beauty", name: "Health & Beauty", icon: "💅" },
  { id: "sports", name: "Sports & Outdoors", icon: "🏀" },
  { id: "babies-kids", name: "Babies & Kids", icon: "🍼" },
  { id: "services", name: "Services", icon: "🛠️" }
];

// Sample subcategories
const subcategories = [
  { id: "phones", name: "Phones", categoryId: "electronics" },
  { id: "computers", name: "Computers & Laptops", categoryId: "electronics" },
  { id: "cars", name: "Cars", categoryId: "vehicles" },
  { id: "motorcycles", name: "Motorcycles", categoryId: "vehicles" },
  { id: "houses", name: "Houses", categoryId: "property" },
  { id: "land-plots", name: "Land & Plots", categoryId: "property" },
  { id: "mens-fashion", name: "Men's Fashion", categoryId: "fashion" },
  { id: "womens-fashion", name: "Women's Fashion", categoryId: "fashion" },
  { id: "furniture", name: "Furniture", categoryId: "home-office" },
  { id: "cleaning-services", name: "Cleaning Services", categoryId: "services" }
];

async function uploadData() {
  console.log("Uploading categories...");

  for (const cat of categories) {
    await db.collection("categories").doc(cat.id).set({
      ...cat,
      createdAt: new Date()
    });
  }

  console.log("Uploading subcategories...");

  for (const sub of subcategories) {
    await db.collection("subcategories").doc(sub.id).set({
      ...sub,
      createdAt: new Date()
    });
  }

  console.log("Done!");
  process.exit();
}

uploadData();
