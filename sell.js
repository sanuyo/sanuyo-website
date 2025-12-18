const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");

db.collection("categories").get().then(snapshot => {

  alert("Documents found: " + snapshot.size);

  categorySelect.innerHTML = `<option value="">Select Category</option>`;

  snapshot.forEach(doc => {
    const data = doc.data();

    console.log("DOC ID:", doc.id);
    console.log("DOC DATA:", data);

    const opt = document.createElement("option");
    opt.value = doc.id;
    opt.textContent = data.name || "NO NAME FIELD";
    categorySelect.appendChild(opt);
  });

}).catch(err => {
  alert("Firestore error");
  console.error(err);
});
