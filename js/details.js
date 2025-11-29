let sideNav = document.getElementById("sideNav");
let menuBtn = document.getElementById("menuBtn"); 
let toggleIcon = document.getElementById("toggleIcon");
let mainContent = document.getElementById("mainContent");
let whiteStrip = document.querySelector(".white-strip");

const mealDetailsDiv = document.getElementById("mealDetails");

const params = new URLSearchParams(window.location.search);
const mealId = params.get("id");



menuBtn.onclick = function () {
    sideNav.classList.toggle("open");
    whiteStrip.classList.toggle("move");
    mainContent.classList.toggle("shift");

    if (sideNav.classList.contains("open")) {
        toggleIcon.classList.replace("fa-bars", "fa-xmark");
    } else {
        toggleIcon.classList.replace("fa-xmark", "fa-bars");
    }
};

async function getMealDetails(id) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = await res.json();
    displayMeal(data.meals[0]);
}

getMealDetails(mealId);
function getIngredients(meal) {
    let ingredientsHTML = "";

    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredientsHTML += `
                <span class="badge  text-dark fs-6 m-2 p-2">
                    ${measure} ${ingredient}
                </span>
            `;
        }
    }

    return ingredientsHTML;
}


function displayMeal(meal) {
    mealDetailsDiv.innerHTML = `
        <div class="row">
        
            <div class="col-md-4">
                <img src="${meal.strMealThumb}" class="img-fluid rounded mb-3" alt="${meal.strMeal}">
                <h3 class="text-white">${meal.strMeal}</h3>
            </div>

            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>

                <h2>Area: ${meal.strArea}</h2>
                <h2>Category: ${meal.strCategory}</h2>
                <h2>Recipes:</h2>
                 <div class="d-flex flex-wrap">
                    ${getIngredients(meal)}
                 </div>
                <h2>Tags:</h2>
        <div>
            <button class="btn btn-success">Source</button>
            <button class="btn btn-danger">Youtube</button>
        </div>

                
               
            </div>

        </div>
    `;
}


 
