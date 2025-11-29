let sideNav = document.getElementById("sideNav");
let menuBtn = document.getElementById("menuBtn"); 
let toggleIcon = document.getElementById("toggleIcon");
let mainContent = document.getElementById("mainContent");
let whiteStrip = document.querySelector(".white-strip");


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


const params = new URLSearchParams(window.location.search);
const areaName = params.get("area");


async function getMealsByArea(area) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data = await res.json();
    displayMeals(data.meals);
}


function displayMeals(meals) {
    let cartona = "";

    for (let i = 0; i < meals.length; i++) {
        cartona += `
        <div class="col-md-3" onclick="openDetails(${meals[i].idMeal})">
            <div class="image position-relative">
                <img src="${meals[i].strMealThumb}" class="img-fluid rounded">
                <div class="overlayer2 position-absolute d-flex align-items-center justify-content-center">
                    <h5>${meals[i].strMeal}</h5>
                </div>
            </div>
        </div>`;
    }

    document.getElementById("areaMealsRow").innerHTML = cartona;
}


function openDetails(id) {
    window.location.href = `details.html?id=${id}`;
}


getMealsByArea(areaName);
