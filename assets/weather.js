let weatherAPIKey = "&appid=6ba589b21bbb52f13e281c56852c059d";
let date = new Date();
let city;
let coordinates=["0","0"];

function getCoordinates() { 
    var options = { 
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 0 
    }; 

    
  
    function success(pos) { 
        var crd = pos.coords; 
        var lat = crd.latitude.toString(); 
        var lng = crd.longitude.toString(); 
        coordinates = [lat, lng]; 
        getCity(coordinates); 
        return; 
  
    } 
  
    function error(err) { 
        console.warn(`ERROR(${err.code}): ${err.message}`);
        // Default to Portsmouth, NH if location not available;
        coordinates = ["43.0718","-70.7626"];
        city = "Portsmouth";
        $("#currentCity").text(city);
        callWeatherAPI();
    } 
  
    navigator.geolocation.getCurrentPosition(success, error, options); 
} 
  
// Step 2: Get city name 
function getCity(coordinates) { 
  var xhr = new XMLHttpRequest(); 
  var lat = coordinates[0]; 
  var lng = coordinates[1]; 

  
    
  // LocationIQ token 
  xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.ebd508c55452e90db277f28948e222bb&lat=" + lat + "&lon=" + lng + "&format=json", true); 
  xhr.send(); 
  xhr.onreadystatechange = processRequest; 
  xhr.addEventListener("readystatechange", processRequest, false); 
  callWeatherAPI();

  function processRequest(e) { 
    if (xhr.readyState == 4 && xhr.status == 200) { 
      var response = JSON.parse(xhr.responseText); 
      city = response.address.city;
      $("#currentCity").text(city);
      
                      
    } 
  } 
} 

     
getCoordinates(); 



function callWeatherAPI () {

 
  const queryUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + coordinates[0] + "&lon=" + coordinates[1]+ weatherAPIKey;
  // Get current city data via API    

  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function (response){

    displayCurrentWeather(response);
    displayForecast(response);
      
  })
}

 
function displayCurrentWeather(response) {

    // Get temperature and convert to Farenheit
    let tempF = tempToFarenheit(response.main.temp);

    // Add HTML to city's weather results
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString("en-US"));
    const weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    
    const lat = response.coord.lat;
    const lon = response.coord.lon;

    //displayUVindex (lat, lon);

    //Add to page
    $("#weatherDate").append(cityDate, weatherIcon);
    $("#currentConditions").append(temperature, humidity, wind);

  
}

function tempToFarenheit (temp) {
    let tempF = ((temp - 273.15) * 1.80 + 32);
    tempF = Math.floor(tempF);
    return tempF;
}

function displayForecast () {
  
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + coordinates[0] + "&lon=" + coordinates[1] + weatherAPIKey,
    method: "GET"
  }).then(function (response){

    $('#forecast').empty();

    let results = response.list;
    
  
    for (let i = 0; i < results.length; i++) {

      // Results are given in 3 hr increments; using the 3pm result for the day
      if(results[i].dt_txt.indexOf("15:00:00") !== -1){

        // get the temperature and convert to fahrenheit 
        let tempF = tempToFarenheit(results[i].main.temp);

        const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
        const cardBody = $("<div>").addClass("card-body p-3 forecastBody");
        const cityDate = $("<h4>").addClass("card-title").text(new Date(results[i].dt_txt).toLocaleDateString('en-US'));
        const temperature = $("<p>").addClass("card-text forecastTemp").text("T: " + tempF + " °F");
        const humidity = $("<p>").addClass("card-text forecastHumidity").text("H: " + results[i].main.humidity + "%");

        const weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

        cardBody.append(cityDate, weatherIcon, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);

      }
    }
  });

}
