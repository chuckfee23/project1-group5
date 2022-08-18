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

var imgCard = $(".card-img");


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
            `Quantity: ${data.totalWeight} grams`,
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

  function getPhoto(input)
  {
      var api_key = "563492ad6f917000010000010e9c974a628f412faac80ae718c8039d";
      const query = input;
  
      const settings = {
          url:"https://api.pexels.com/v1/search?query=" + query + "&per_page=1",
          method:"GET",
          headers:
          {
              "AUTHORIZATION":api_key
          }
      }
  
      $.ajax(settings).then(function(response)
      {
          var obj = response.photos[0].src.original;
          imgCard.attr("src", obj);
          console.log(obj);
          console.log(response)
      })
      
  }
  
  //only for testing purposes
  getPhoto("almonds");




/////////////////////////////       Event handlers      ///////////////////////////
// Calls function searchIngredient when searchInput is entered into form
searchInput.on("submit", searchIngredient);
// Calls Function searchIngredient and getPhotot when search.Btn is clicked
searchBtn.on("click", ()=> {
  searchIngredient();
  getPhoto();
});




//////////////////////////     Execute at lauch functions        ///////////////////////////////
