///////////////////////////////      Variable Declarations      ////////////////////////
// Get elements with jQuery
// search Button 
var searchBtn = $("#button");
// text area input for search
var searchInput = $(".form-control");
// Nutritional information
var nutriData = $("li")


////////////////////////////////      Functions        ///////////////////////////////
function searchIngredient(data) {
    var API_KEY = "f821a94c134c496c176e82b63b0ade69";
    var searchresults = data; //data
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
        console.log(data.totalWeight); //grams
        console.log(data.calories); //cal
        console.log(data.totalNutrients.FAT.quantity); //grams
        console.log(data.totalNutrients.PROCNT.quantity); //grams
        console.log(data.totalNutrients.CHOCDF.quantity); //grams
        console.log(data.totalNutrients.SUGAR.quantity); //grams
        console.log(data);
        // get data for api and put into DOM
        console.log(nutriData);
        // create array to store nutrient data
        var nutriArray = [
            `Quanity: ${data.totalWeight} grams`,
            `Calories `
        ]
      })
      .catch(function (e) {
        console.log(e);
      });
  }
  searchIngredient("almonds");






/////////////////////////////       Event handlers      ///////////////////////////







//////////////////////////     Execute at lauch functions        ///////////////////////////////