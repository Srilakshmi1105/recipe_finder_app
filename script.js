function searchRecipe() {
  const query = document.getElementById("searchInput").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const recipeContainer = document.getElementById("recipeDetails");
      recipeContainer.innerHTML = ""; // Clear previous result

      if (!data.meals) {
        recipeContainer.innerHTML = `<p>No recipe found. Try another dish!</p>`;
        return;
      }

      const meal = data.meals[0];
      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredients.push(`${ingredient} - ${measure}`);
        }
      }

      recipeContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300" />
        <h3>Ingredients:</h3>
        <ul>${ingredients.map(item => `<li>${item}</li>`).join("")}</ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
      `;
    })
    .catch(error => {
      console.error("Error fetching recipe:", error);
    });
}
