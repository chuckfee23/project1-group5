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
        console.log(data);
        // Create array to store nutrient data
        var nutriArray = [
            `Quanity: ${data.totalWeight} grams`,
            `Calories: ${data.calories} cal`,
            `Fat: ${data.totalNutrients.FAT.quantity} grams`,
            `Protein: ${data.totalNutrients.PROCNT.quantity} grams`,
            `Carbs: ${data.totalNutrients.CHOCDF.quantity} grams`,
            `Sugar: ${data.totalNutrients.SUGAR.quantity} grams`,
        ];
        
        // Loop through li elements and put in values from api call
        for (var i =0; i<nutriArray.length;i++){
            nutriData.eq(i).text(nutriArray[i]);
        }

        // Add ingredient name to dom 
        ingrName.text(ingredient.toUpperCase())
      })
    //   catch any errors from api call, just console.log for now
      .catch(function (e) {
        console.log(e);
      });
  }
//   Only for testing purposes 
  searchIngredient("almonds");






/////////////////////////////       Event handlers      ///////////////////////////

//////////////////////////     Execute at lauch functions        ///////////////////////////////
