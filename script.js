const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-detials-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listners

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);

//get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json()).then(data => {
            // console.log(response);
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class="meal-item" data-id ="${meal.idMeal}">
                        <div class="meal-img">
                          <img src="${meal.strMealThumb}" alt ="food">
                    </div>
                   <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a> 
                   </div> 
                </div>
                    `;
                });
                mealList.classList.remove('notFound');

            } else {
                html = "Sorry, we didn't find any meal!"
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;


        });

}



//get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    //console.log(e.target);
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        //console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json()).then(data => mealRecipeModal(data.meals));
        //console.log(data);

    }

}

// create a modal
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `<h2 class = "recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruct">
                <h3>Instructions:</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, labore odit hic accusamus atque voluptatum nam placeat nulla excepturi natus earum eligendi! Magni nam voluptatem quasi perspiciatis saepe excepturi dolore.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ab harum architecto dicta quaerat nemo tempore natus recusandae consequatur minima?</p>
            </div>
            <div class = "recipe-meal-img">
                <img src="food.jpg" alt="">
            </div>
            <div class="recipe-link">
                <a href="#" target="_blank">Watch Video</a>
            </div>
    
    `;

}



//35:10