
$( document ).ready(function() {
  const $location = $( '#location' );
  const $temp = $( '#currentTemp' );
  const $dailyLow = $( '#tempDailyLow' );
  const $dailyHigh = $( '#tempDailyHigh' );


// END of document.ready()

// ====================================================
//    FUNCTIONS & GLOBAL VARIABLES
// ====================================================

function tempToF ( temp ) {
  return Math.round( temp * 9 / 5 + 32 );
}

function tempToC ( temp ) {
  return Math.round( ( temp - 32 ) * 5 / 9 );
}

const geoOptions = {
  enableHighAccuracy: true,
  maximumAge        : 30000,
  timeout           : 27000
};

function geoSuccess(position) {
  let response = position;
  return response;
}

function geoError() {
  alert('Sorry, no position available.');
}


// ====================================================
//    CONSTRUCTORS & PROTOTYPES
// ====================================================

function WeatherModule (url) {
  this.url = url;
}

WeatherModule.prototype.getLocation = function() {
    if ("geolocation" in navigator) {
    // geolocation is available
    // Use geolocation Web API to get Users current position
    this.locationData = navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions );
  } else {
    // geolocation IS NOT available
    // Append to the DOM later
    alert('Sorry, Geolocation is not available in your browser.')
  }
}

WeatherModule.prototype.getWeather = function() {
  debugger;
  $.ajax({
    method: 'GET',
    url:    this.url,
    data:   {
              lon: this.locationData["coords"]["longitude"],
              lat: this.locationData["coords"]["latitude"]
            }
  }).done( function( response ) {
      debugger;
      this.temp = response['main']['temp'];
      this.tempLow = response['main']['temp_min'];
      this.tempHigh = response['main']['temp_max'];
      this.city = response.name;

      $location.html( this.name );
      $temp.html( Math.round( this.temp ) );
      $dailyLow.html( Math.round( this.tempLow ) );
      $dailyHigh.html( Math.round( this.tempHigh ) );

  }).fail( function( jqXHR, textStatus ) {

      alert( "Request failed: " + textStatus );
  }).always( function() {

      console.log('request complete');
  });
}


const weather = new WeatherModule('https://fcc-weather-api.glitch.me/api/current');
weather.getLocation();

if (weather.locationData) {
  weather.getWeather();
} else {
  alert('Sorry, we are unable to retrieve your weather data at this moment.')
}


});
