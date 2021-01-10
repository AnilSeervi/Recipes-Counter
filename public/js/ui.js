const recipes = document.querySelector(".recipes");
document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelector(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // add recipe form
  const forms = document.querySelector(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
  //update recipe form
  const update = document.querySelector(".update-form");
  M.Sidenav.init(update, { edge: "right" });
});
//render recipe data
const renderRecipe = (data, id) => {
  const html = `<div class="card-panel recipe white row" data-id="${id}">
  <img src="/img/dish.png" alt="recipe thumbnail" />
  <div class="recipe-details">
    <div class="recipe-title">${data.title}</div>
    <div class="recipe-ingredients">${data.ingredients}</div>
  </div>
    <div class="recipe-delete">
    <i class="material-icons waves-effect edit-recipe sidenav-trigger" data-target="update-form" data-id="${id}">edit</i>
    <i class="material-icons waves-effect delete-recipe" data-id="${id}">delete_outline</i>
  </div>
</div>`;
  recipes.innerHTML += html;
};
//remove recipe from doc
const removeRecipe = (id) => {
  const recipe = document.querySelector(`div[data-id=${id}]`);
  recipe.remove();
};
