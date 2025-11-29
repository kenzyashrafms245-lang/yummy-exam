let sideNav = document.getElementById("sideNav");
let menuBtn = document.getElementById("menuBtn"); // fixed
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

let allAreas = [];
getAreas();

async function getAreas() {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let data = await response.json();
    allAreas = data.meals;
    displayAreas();
}

function displayAreas() {
    let cartona = "";

    for (let i = 0; i < allAreas.length; i++) {
        let areaName = allAreas[i].strArea;

        cartona += `
        <div class="col-md-3 text-center">
            <div class="image position-relative" onclick="openArea('${areaName}')">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${areaName}</h3>
            </div>
        </div>`;
    }

    document.getElementById("myRow").innerHTML = cartona;
}

function openArea(areaName) {
    window.location.href = `areaMeals.html?area=${areaName}`;
}
