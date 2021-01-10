//offline data with indexedDB
db.enablePersistence().catch((err) => {
  if (err.code == "failed-precondition") {
    //multiple tabs open at once
    console.log("persistence failed!");
  } else if (err.code == "unimplemented") {
    //lack of browser support
    console.log("persistence is not available.");
  }
});

//real-time listener
db.collection("recipes").onSnapshot((snapshot) => {
  //   console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      //add the document data to the page
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      //remove the document data from the web page
      removeRecipe(change.doc.id);
    }
  });
});

//add new recipe
const form = document.querySelector(".add-recipe");
const updateForm = document.querySelector("update-form");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };
  db.collection("recipes")
    .add(recipe)
    .catch((err) => console.log(err));
  form.title.value = "";
  form.ingredients.value = "";
});

//delete a recipe
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("delete-recipe")) {
    const id = evt.target.getAttribute("data-id");
    db.collection("recipes").doc(id).delete();
  } else if (evt.target.classList.contains("edit-recipe")) {
    console.log(evt.target.getAttribute("data-id"));
    const updateBtn = document.querySelector(".update-btn");
    const dataId = evt.target.getAttribute("data-id");
    updateBtn.id = dataId;
  }
});
