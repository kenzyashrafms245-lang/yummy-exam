
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
getrecipes();

async function getrecipes() {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    if (response.ok) {
        let data = await response.json();
        allMeals = data.categories;
        displayData();
    } else {
        console.error("Failed to fetch categories");
    }
}

function displayData() {
    let cartona = "";
    for (let i = 0; i < allMeals.length; i++) {
        cartona += `
        <div class="col-md-3 category-card" data-category="${allMeals[i].strCategory}">
            <div class="image position-relative">
                <img src="${allMeals[i].strCategoryThumb}" alt="${allMeals[i].strCategory}" class="img-fluid">
                <div class="overlayer2 position-absolute d-flex flex-column justify-content-center align-items-center p-2 text-center">
                    <h5>${allMeals[i].strCategory}</h5>
                    <p>${allMeals[i].strCategoryDescription.split(" ", 20).join(" ")}...</p>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("myRow").innerHTML = cartona;

    document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", () => {
            openCategory(card.getAttribute("data-category"));
        });
    });
}

function openCategory(catName) {
    window.location.href = `categoryMeals.html?cat=${encodeURIComponent(catName)}`;
}

