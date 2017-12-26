// Global Variables to store temps after weather API request
  // Storing temps global will allow them to be accessiable later for 'click' event
let tempInC;
let tempInF;

function tempToF ( temp ) {
  return Math.round( temp * 9 / 5 + 32 );
}

function tempToC ( temp ) {
  return Math.round( ( temp - 32 ) * 5 / 9 );
}

$( document ).ready(function() {

  // DOM Elements for appending | inserting data
  $location = $( '#location' );
  $temp = $( '#temp' );
  // Check if users browser has geolocation available
  if ("geolocation" in navigator) {
  // geolocation is available

  // User position successful retrieved by GeoLocationAPI
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
      $location.html( response.name );
      $temp.html( tempInC );

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

  // Use geolocation Web API to get Users current position
  navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions );


} else {
  // geolocation IS NOT available
  // Append to the DOM later
  console.log('Sorry, Geolocation is not available in your browser.')
}


}); // END of document.ready()
