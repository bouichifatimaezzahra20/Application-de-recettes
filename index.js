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
let html = "";
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
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
                            <button type="button" class="btn btn-primary" onclick="getmodaldetails(${meal.idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Launch demo modal
                          </button>
                                                  </div>
                    </div>
                    </div>
                `;
                mealList.innerHTML = html;
              }
              
              ;
    // //modal
    function getmodal(e) {
      // get data
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)
      .then(response => response.json())
      .then((data) => modaldetails(data.meals[0]))
      console.log(e);
    }
    function modaldetails(data)
    {
      // creat modal
      html= `
      <img src="${meals.strMealThumb}" alt="" width="100%" height="200px">
      <h4 class="modal-title" id="exampleModalLabel">${data.strMeal}</h4>
      <div class="d-flex justify-content-center gap-5">
      <h6>Category: "${data.strCategory}"</h6>
      <h6>Area: "${data.strArea}" </h6>
      </div>
      <p>ingredient</p>
      <h6>${data.strInstructions}</h6>
     <a href="${data.strYoutube}"  target="_blank">video </a>
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
// let pagesize = 6;
// let currentpage =1;
// pagination
// function prevpage() {
//   if (currentpage > 1)
//   currentpage--;
//   getMealList()
// }
// function nextpage() {
//   if ((currentpage * pagesize)< data.lenght)
//   currentpage++;
//   getMealList()
// }
// document.querySelector('#prevbutton').addEventListener('click', prevpage, false)
// document.querySelector('#nextbutton').addEventListener('click', nextpage, false)