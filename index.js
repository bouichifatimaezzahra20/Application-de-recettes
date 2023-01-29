let html = "";
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');

// show 6  cards by default
window.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < 6; i++) {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => {
        return response.json();
      })
      .then((json) => getMealList(json.meals[0]));
  }
});
// creat card
function getMealList(meal){
                html += `
                <div class="card" style="width: 25rem;">
                    <div class = "meal-item card" data-id = "${meal.idMeal}">
                            <img  class="card-img" src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button type="button" class="btn btn-primary" onclick="getmodal(${meal.idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Launch demo modal
                          </button>
                           </div>
                    </div>
                    </div> `;
                mealList.innerHTML = html;
              };
    // //modal
    mealList.addEventListener("click", getmodal)
    function getmodal(e) {
      // get data
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)
      .then(response => response.json())
      .then((data) => modaldetails(data.meals[0]))
    }
    function modaldetails(data)
    {
      // creat modal
      html= `
      <img src="${data.strMealThumb}" alt="" width="100%" height="200px">
      <h4 class="modal-title" id="exampleModalLabel">${data.strMeal}</h4>
      <div class="d-flex justify-content-center gap-5">
      <h5>Category:</h5>
      <p>${data.strCategory}</p>
      <h5>Area:</h5>
      <p>${data.strArea}</p>
      </div>
      <h5>Instructions</h5>
      <p>${data.strInstructions}</p>
     <a href="${data.strYoutube}"  target="_blank" class="d-flex justify-content-center">video </a>
     </div>
     <h5>Ingredients :</h5>`
    //  measure
    let i=1;
  do {
    html +=`<li>${data["strIngredient" + i]}  : ${data["strMeasure" + i]} </li>`;
    i++

  } while ( data["strIngredient" + i] !== null &&
  data["strIngredient" + i] !== "" );
  document.getElementById("modal").innerHTML = html;

}
// pagination
// get max number recette 
const maxrecette = 6;
function getnumber(arayvalues) {
  const getnumber = Math.ceil(arayvalues.length / maxrecette);
  return getnumber;
}

function sliceelement(arayvalues) {
  const sliceelement = [];
  for (let i = 0; i < getnumber(arayvalues); i++) {
    sliceelement.push(arayvalues.slice(i * maxrecette, (i + 1) * maxrecette));
  }
  return sliceelement;
}
// button search
const search = document.getElementById("search-btn");
search.addEventListener("click", function (e) {
  e.preventDefault();
  mealList.innerHTML="";
  html="";
  const input = document.getElementById("search-input").value;
  const searchURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;

  fetch(searchURL)
    .then((response) => response.json())
    .then((data) => searchbutton(data.meals));
});
// button pagination
function btnpagination(arayvalues) {
  let pagenumb = document.getElementById("pagi-num");
  pagenumb.innerHTML = "";
  for (let i = 0; i < getnumber(arayvalues); i++) {
    const li = document.createElement("li");
    li.setAttribute("class", "page-item");
    const a = document.createElement("a");
    a.setAttribute("class", "page-link");
    a.innerHTML = i + 1;
    li.appendChild(a);
    a.addEventListener("click", () => {
      html="";
      let activremov = document.querySelectorAll("li");
      activremov.forEach((e) => {
        e.classList.remove("active");
      });
      li.setAttribute("class", "active");
      // Display the appropriate page when the button is clicked
      disppage(i, arayvalues);
    });
    pagenumb.appendChild(li);
  }
}
function disppage(getnumber, arayvalues) {
  mealList.innerHTML = "";
  const page = sliceelement(arayvalues)[getnumber];
  for (const meal of page) {
    getMealList(meal);
  }
}

function searchbutton(meal) {
  mealList.innerHTML = "";
  if (meal == null) {
    mealList.innerHTML = "";
    mealList.innerHTML = `<p class="text-danger display-5 text-center" >
	 try Again
	 </p>`;
  } else {
    sliceelement(meal);
    btnpagination(meal);
    disppage(0, meal);
  }
}