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



let allMeals = [];
getrecipes()
async function getrecipes() {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    if (response.ok) {
        let data = await response.json()
        allMeals = data.meals
        displayData()
    }
}
function displayData() {
    let cartona = ""
    for (let i = 0; i < allMeals.length; i++) {

        if (!allMeals[i].strDescription) {
            continue;
        }

        let desc = allMeals[i].strDescription.split(" ", 20).join(" ");

        cartona += `
        <div class="col-md-3">
            <div class="image position-relative text-center" onclick="openIngredient('${allMeals[i].strIngredient}')">
                 <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                 <h3>${allMeals[i].strIngredient}</h3>
                 <p>${desc}</p>
            </div>
        </div>
        `
    }
    document.getElementById("myRow").innerHTML = cartona
}

function openIngredient(name) {
    window.location.href = `ingredientMeals.html?ingredient=${name}`;
}
