// Global Variables to store temps after weather API request

function tempToF ( temp ) {
  return Math.round( temp * 9 / 5 + 32 );
}

function tempToC ( temp ) {
  return Math.round( ( temp - 32 ) * 5 / 9 );
}

$( document ).ready(function() {

  //==============================================
  //    jQuery DOM Elements
  //==============================================

  const $location = $( '#location' );
  const $temp = $( '#currentTemp' );
  const $dailyLow = $( '#tempDailyLow' );
  const $dailyHigh = $( '#tempDailyHigh' );
  const $description = $( '#description' );
  const $imgDiv = $( '#iconContainer' );

  //==============================================
  //    Document.ready() scoped variables
  //==============================================

  let temp = '',
      tempLow = '',
      tempHigh = '',
      city = '';

  //==============================================
  //   geoLocationAPI Functions & variables
  //==============================================


  function fadeOutAndIn(obj, callback) {
    obj.fadeOut(600,callback).fadeIn(600);
  }

  function geoSuccess( position ) {
    const userCoords = position.coords;
    const userLat = userCoords.latitude;
    const userLong = userCoords.longitude;

    // Use stored geolocation info for AJAX request to Freecodecamp Weather api
    $.ajax({
      method: 'GET',
      url:    'https://fcc-weather-api.glitch.me/api/current',
      data:   {lon: userLong, lat: userLat}
    }).done( function( response ) {
      console.log(response);
      tempInC = Math.round( response['main']['temp'] );
      tempInF = tempToF( tempInC );

      temp = Math.round( response['main']['temp'] );
      humidity = response['main']['humidity'];
      tempHigh = Math.round( response['main']['temp_max'] );
      description = response["weather"][0]["description"];
      icon = response["weather"][0]["icon"];
      city = response.name;

      fadeOutAndIn($location, function() {$location.html(city)});
      fadeOutAndIn($temp, function() {$temp.html( temp )});
      fadeOutAndIn($dailyLow, function() {$dailyLow.html( humidity )});
      fadeOutAndIn($dailyHigh, function() {$dailyHigh.html( tempHigh)});
      fadeOutAndIn($description, function() {$description.html( description )})

      $description.html( description ).fadeIn(600);
      $imgDiv.html(`<img src="${icon}" alt="${description} weather icon" />`).fadeIn(600);

    }).fail( function( jqXHR, textStatus ) {

        alert( "Request failed: " + textStatus );
    }).always( function() {

        console.log('request complete');
    });
  }


  function geoError() {
    alert('Sorry, no position available.');
  }

  const geoOptions = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
  };


  //==============================================
  //   Execution Code for Weather APP
  //==============================================

  // Check if users browser has geolocation available
  if ("geolocation" in navigator) {
    // geolocation is available
    // Use geolocation Web API to get Users current position
    navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions );
  } else {
    // geolocation IS NOT available
    // Append to the DOM later
    console.log('Sorry, Geolocation is not available in your browser.')
  }

  //==============================================
  //   Event Handlers
  //==============================================

  $('#toggle1').on('click', function(e) {
    if ( $( this ).is( ':checked' ) ) {
      fadeOutAndIn($temp, function () { $(this).html( tempToF(temp))});
      fadeOutAndIn($dailyLow, function () { $(this).html( humidity ) });
      fadeOutAndIn($dailyHigh, function () { $(this).html( tempToF( tempHigh ) ) });

    } else {
      fadeOutAndIn($temp, function() { $(this).html( temp ) });
      fadeOutAndIn($dailyLow, function() { $(this).html( humidity ) });
      fadeOutAndIn($dailyHigh, function() { $(this).html( tempHigh ) });
    }
  });

}); // END of document.ready()
