const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('meail-details-content')
const recipeClostBtn = document.getElementById('recipe-close-btn');

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe)

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    console.log(searchInputTxt);   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach( meal => {
                html += `
                <div class = "meal-item" data-id ="${meal.idMeal}">
                <div class = "meal-img">
                <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                <h3>${meal.strMeal}</h3>
                <a href = "#" class = "recipe-btn">Get Recipe</a>
                </div>
              </div>`
            });
            mealList.classList.remove('notFound');
        }else{
            html = "Sorry, we didn't find any meals!";
            mealList.classList.add('notFound')
        }
        mealList.innerHTML = html;
    })
}

function getMealRecipe(event){
    event.preventDefault();
    if(event.target.classList.contains('recipe-btn')){
        let mealItem = event.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }
}