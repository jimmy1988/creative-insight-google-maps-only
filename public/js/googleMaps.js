var defaultLat = 52.4786758;
var defaultLong = -1.9001709;
var zoomlevel = 16;
var map;
var infoWindow;
var center;
var markers = [];
var currentloc = {};
var currentlocDetails = {};
var request;
var service;


function initializeMap() {
  $("#curtain-outer").show();

  center = {lat: defaultLat, lng: defaultLong};

  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: zoomlevel
  });

  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentloc.lat = parseFloat(position.coords.latitude);
      currentloc.lng = parseFloat(position.coords.longitude);

      var otherOptions = {};
      otherOptions.icon =  {
         url: "https://image.flaticon.com/icons/svg/60/60834.svg", // url
         scaledSize: new google.maps.Size(30, 30)
       };

      otherOptions.name = "Your Location";
      otherOptions.context = "Home";
      otherOptions.animation = google.maps.Animation.BOUNCE;

      createmarker(currentloc, otherOptions);

      map.setCenter(currentloc);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    }, {maximumAge:100, timeout:5000, enableHighAccuracy: true});
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  $("#curtain-outer").fadeOut(500);
}

//Removes the markers from the map, but keeps them in the array.
function clearAllMarkers() {
  if(markers.length > 1){
    for (var i = 1; i < markers.length; i++) {
          markers[i].setMap(null);
          markers.splice(i, 1);
    }
  }
}

function createmarker(place, otherMapOptions = null){

  var mapOptions = {};
  mapOptions.map = map;
  if(
    place.geometry != undefined && place.geometry != null &&
    place.geometry.location != undefined && place.geometry.location != null
  ){
    mapOptions.position = place.geometry.location;
  }else{
    mapOptions.position = {lat: parseFloat(place.lat), lng: parseFloat(place.lng)};
  }


  if(otherMapOptions != null){
    mapOptions = Object.assign(mapOptions, otherMapOptions);
  }

  var marker = new google.maps.Marker(mapOptions);
  if(
    (otherMapOptions != undefined && otherMapOptions != null) &&
    (otherMapOptions.context != undefined && otherMapOptions.context != null && otherMapOptions.context == "Home")
  ){
    currentlocDetails.marker = marker;
  }else{
    markers.push(marker);
  }
  map.setCenter(currentloc);

  if(place != undefined && place != null && place.name != undefined && place.name != null){
    var infowindow = new google.maps.InfoWindow({
      content: place.name
    });
    marker.addListener('click', function(){
      infowindow.open(map, this);
    });
  }else if (otherMapOptions != undefined && otherMapOptions != null && otherMapOptions.name != undefined && otherMapOptions.name != null) {
    var infowindow = new google.maps.InfoWindow({
      content: otherMapOptions.name
    });
    marker.addListener('click', function(){
      infowindow.open(map, this);
    });
  }
  map.setCenter(currentloc);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function plotMarkers(results, status){
  if(status == google.maps.places.PlacesServiceStatus.OK){
    for(var i = 0; i < results.length; i++){
      createmarker(results[i]);
    }
  }
}

function searchMap(){
  event.preventDefault();
  $("#curtain-outer").fadeIn(500, function(){
    clearAllMarkers();
    var searchTerm = document.getElementById("search-box").value;
    var distanceMiles = document.getElementById("distance-box").value;
    var distanceMeters = Math.ceil((parseFloat(distanceMiles) * parseFloat("1609.344")) + parseFloat(distanceMiles));

    request = {
      location:center,
      radius:distanceMeters,
      name: [searchTerm],
      types:[searchTerm]
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, plotMarkers);

    map.setCenter(currentloc);
    $("#curtain-outer").fadeOut(500);
  });


}

$(document).ready(function(){
  $("#searchForm").on("submit", searchMap);
});
