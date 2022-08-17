///////////////////////////////      Variable Declarations      ////////////////////////
// Get elements with jQuery
// search Button
var searchBtn = $("#button");
// text area input for search
var searchInput = $(".form-control");
var imgCard = $(".card-img");

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
    })
    .catch(function (e) {
      console.log(e);
    });
}
searchIngredient("/,.,//2324234");


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

getPhoto("broccoli");
/////////////////////////////       Event handlers      ///////////////////////////

//////////////////////////     Execute at lauch functions        ///////////////////////////////
