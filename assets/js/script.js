///////////////////////////////      Variable Declarations      ////////////////////////
// Get elements with jQuery
// search Button
var searchBtn = $("#button");
// text area input for search
var searchInput = $(".form-control");
// Nutritional information
var nutriData = $("li");
// Get element for name of ingredient
var ingrName = $("#search-name");
//Get element for image display
var imgCard = $(".card-img");
//gets element for invalid search
var head = $("header");
//makes element for invalid search
var invalidText = $("<div>");
//Get searches UL list to append li
var ul = $("#searches");

////////////////////////////////      Functions        ///////////////////////////////
function searchIngredient(ingredient) {
  var API_KEY = "f821a94c134c496c176e82b63b0ade69";
  // This a required parameter need to pass into the function, from search input -ingredient
  var searchresults = ingredient;
  var nutritionUrl =
    "https://api.edamam.com/api/nutrition-data?app_id=ddbb3418&app_key=" +
    API_KEY +
    "&nutrition-type=logging&ingr=" +
    searchresults;
  fetch(nutritionUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // get data for api and put into DOM

      // Create array to store nutrient data
      var nutriArray = [
        `Quantity: ${data.totalWeight.toFixed(0)} grams`,
        `Calories: ${data.calories.toFixed(0)} cal`,
        `Fat: ${data.totalNutrients.FAT.quantity.toFixed(0)} grams`,
        `Protein: ${data.totalNutrients.PROCNT.quantity.toFixed(0)} grams`,
        `Carbs: ${data.totalNutrients.CHOCDF.quantity.toFixed(0)} grams`,
        `Sugar: ${data.totalNutrients.SUGAR.quantity.toFixed(0)} grams`,
      ];

      // Loop through li elements and put in values from api call
      for (var i = 0; i < nutriArray.length; i++) {
        nutriData.eq(i).text(nutriArray[i]);
      }

      // Add ingredient name to dom
      ingrName.text(ingredient.toUpperCase());
    })
    //   catch any errors from api call, just console.log for now
    .catch(function (e) {
      console.log(e);
    });
}

function getPhoto(input) {
  var api_key = "563492ad6f917000010000010e9c974a628f412faac80ae718c8039d";
  const query = input;

  const settings = {
    url: "https://api.pexels.com/v1/search?query=" + query + "&per_page=1",
    method: "GET",
    headers: {
      AUTHORIZATION: api_key,
    },
  };

  $.ajax(settings).then(function (response) {
    var obj = response.photos[0].src.original;
    imgCard.attr("src", obj);
  });
}

function bothAPI(ingredient) {
  var API_KEY = "f821a94c134c496c176e82b63b0ade69";
  // This a required parameter need to pass into the function, from search input -ingredient
  var searchresults = ingredient;
  var nutritionUrl =
    "https://api.edamam.com/api/nutrition-data?app_id=ddbb3418&app_key=" +
    API_KEY +
    "&nutrition-type=logging&ingr=" +
    searchresults;
  //gets api and checks search input if search result is valid
  fetch(nutritionUrl).then(function (response) {
    return response.json().then(function (response) {
      if (response.totalWeight === 0) {
        console.log(head);
        invalidText.attr("style", "color: red;");
        invalidText.attr("class", "card-body card");
        invalidText.text("Invalid Search Try Again");
        head.append(invalidText);
        searchInput.val("");
      } else {
        invalidText.attr("style", "display: none");
        searchIngredient(ingredient);
        getPhoto(ingredient);
      }
    });
  });
}

function saveSearch(input) {
  var ingredientStorage = localStorage.getItem("ingredientStorage");
  if (ingredientStorage === null) ingredientStorage = [];
  else {
    ingredientStorage = JSON.parse(ingredientStorage);
  }
  ingredientStorage.unshift(input);
  var newIngredientAdded = JSON.stringify(ingredientStorage);
  localStorage.setItem("ingredientStorage", newIngredientAdded);
}

function displaySearch() {
  var ingredientStorage = localStorage.getItem("ingredientStorage");
  ingredientStorage = JSON.parse(ingredientStorage);

  if (ingredientStorage != null) {
    for (var i = 0; i < ingredientStorage.length; i++) {
      var createLi = document.createElement("li");
      createLi.textContent = ingredientStorage[i];
      ul.appendChild(createLi);
    }
  }
}
/////////////////////////////       Event handlers      ///////////////////////////
// Calls function searchIngredient when searchInput is entered into form
// searchInput.on("submit", searchIngredient);
// Calls Function searchIngredient and getPhotot when search.Btn is clicked
searchBtn.on("click", () => {
  var input = searchInput.val().trim();
  // console.log(input);
  bothAPI(input);
  searchInput.val("");
  saveSearch(input);
  displaySearch();
});
