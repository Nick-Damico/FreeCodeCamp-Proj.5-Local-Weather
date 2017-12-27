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

      tempInC = Math.round( response['main']['temp'] );
      tempInF = tempToF( tempInC );

      temp = response['main']['temp'];
      tempLow = response['main']['temp_min'];
      tempHigh = response['main']['temp_max'];
      city = response.name;

      $location.fadeOut(600, function() { $(this).html( city ) }).fadeIn(600);
      $temp.fadeOut(600, function() { $(this).html( Math.round( temp ) ) }).fadeIn(600);
      $dailyLow.fadeOut(600, function() { $(this).html( Math.round( tempLow ) ) }).fadeIn(600);
      $dailyHigh.fadeOut(600, function() { $(this).html( Math.round( tempHigh ) ) }).fadeIn(600);
      $description.html( response["weather"][0]["description"] ).fadeIn(600);
      $imgDiv.html(`<img src="${response["weather"][0]["icon"]}" alt="${response["weather"][0]["description"]} weather icon" />`).fadeIn(600);

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
      $temp.fadeOut(600, function () { $(this).html( tempToF( temp ) ) })
           .fadeIn(600);
      $dailyLow.fadeOut(600, function () { $(this).html( tempToF( tempLow ) ) })
               .fadeIn(600);
      $dailyHigh.fadeOut(600, function () { $(this).html( tempToF( tempHigh ) ) })
                .fadeIn(600);
    } else {
        $temp.fadeOut(600, function() { $(this).html( Math.round( temp ) ) })
             .fadeIn(600);
        $dailyLow.fadeOut(600, function() { $(this).html( Math.round( tempLow ) ) })
                 .fadeIn(600);
        $dailyHigh.fadeOut(600, function() { $(this).html( Math.round( tempHigh ) ) })
                  .fadeIn(600);
    }
  });

}); // END of document.ready()
