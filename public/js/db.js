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
    if (change.type === "modified") {
      //update the document data
      updateRecipe(change.doc.data(), change.doc.id);
    }
  });
});

//add new recipe
const form = document.querySelector(".add-recipe");
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
  const id = evt.target.getAttribute("data-id");
  if (evt.target.classList.contains("delete-recipe")) {
    db.collection("recipes").doc(id).delete();
  } else if (evt.target.classList.contains("edit-recipe")) {
    // console.log(evt.target.getAttribute("data-id"));
    document.querySelector(".update-form").setAttribute("data-id", id);
    // const updateBtn = document.querySelector(".update-btn");
    const title = document.querySelector(`div[data-id="${id}"] .recipe-title`)
      .textContent;
    const ingredients = document.querySelector(
      `div[data-id="${id}"] .recipe-ingredients`
    ).textContent;
    document.querySelector(".update-title").value = title;
    document.querySelector(".update-ingredients").value = ingredients;
  }
});

// update recipe
const updateForm = document.querySelector(".update-recipe");
updateForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const dataId = document.querySelector(".update-form").getAttribute("data-id");
  const recipe = {
    title: updateForm.title.value,
    ingredients: updateForm.ingredients.value,
  };
  db.collection("recipes")
    .doc(dataId)
    .update(recipe)
    .catch((err) => console.log(err));
});
