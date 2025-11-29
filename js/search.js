let sideNav = document.getElementById("sideNav");
let menuBtn = document.getElementById("menuBtn"); 
let toggleIcon = document.getElementById("toggleIcon");
let mainContent = document.getElementById("mainContent");
let whiteStrip = document.querySelector(".white-strip");
let searchByNameInput = document.getElementById("searchByName");
let searchByFirstLetter = document.getElementById("searchByFirstLetter")


let allMeals = [];



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









searchByNameInput.addEventListener("input", function () {
    getRecipesByName(searchByNameInput.value)
})
searchByFirstLetter.addEventListener("input", function () {
    getRecipesByFirstLetter(searchByFirstLetter.value)
})



async function getRecipesByName(meal) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    if (response.ok) {
        let data = await response.json()
        allMeals = data.meals
        displayData()
    }
}
async function getRecipesByFirstLetter(meal) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${meal}`)
    if (response.ok) {
        let data = await response.json()
        allMeals = data.meals
        displayData()
    }
}

function displayData() {
    let cartona = ""
    for (let i = 0; i < allMeals.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div class="image position-relative">
                <img src="${allMeals[i].strMealThumb}" alt="" class="img-fluid">
                <div class="overlayer position-absolute d-flex align-items-center">
                    ${allMeals[i].strMeal}

                </div>
            </div>
        </div>
        
        `
    }
    document.getElementById("myRow").innerHTML = cartona
}



