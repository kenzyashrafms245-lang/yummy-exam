let sideNav = document.getElementById("sideNav");
let menuBtn = document.getElementById("menuBtn"); 
let toggleIcon = document.getElementById("toggleIcon");
let mainContent = document.getElementById("mainContent");
let whiteStrip = document.querySelector(".white-strip");

const params = new URLSearchParams(window.location.search);
const categoryName = params.get("cat");


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



if (categoryName) {
    getMealsByCategory(categoryName);
} else {
    console.error("No category found in URL");
}

async function getMealsByCategory(cat) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(cat)}`);
        if (!res.ok) throw new Error("Failed to fetch meals");
        let data = await res.json();
        displayMeals(data.meals);
    } catch (err) {
        console.error(err);
        document.getElementById("mealsRow").innerHTML = "<p class='text-danger'>Failed to load meals.</p>";
    }
}

function displayMeals(meals) {
    if (!meals || meals.length === 0) {
        document.getElementById("mealsRow").innerHTML = "<p>No meals found for this category.</p>";
        return;
    }

    let cartona = "";
    for (let i = 0; i < meals.length; i++) {
        cartona += `
        <div class="col-md-3 meal-card" data-id="${meals[i].idMeal}">
            <div class="image position-relative">
                <img src="${meals[i].strMealThumb}" alt="${meals[i].strMeal}" class="img-fluid">
                <div class="overlayer2 position-absolute d-flex flex-column justify-content-center align-items-center p-2 text-center">
                    <h5>${meals[i].strMeal}</h5>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("mealsRow").innerHTML = cartona;

    document.querySelectorAll(".meal-card").forEach(card => {
        card.addEventListener("click", () => {
            openDetails(card.getAttribute("data-id"));
        });
    });
}

function openDetails(id) {
    window.location.href = `details.html?id=${id}`;
}
