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
      currentloc.lat = position.coords.latitude;
      currentloc.lng = position.coords.longitude;

      var otherOptions = {};
      otherOptions.icon =  {
         url: "https://image.flaticon.com/icons/svg/60/60834.svg", // url
         scaledSize: new google.maps.Size(30, 30)
       };

      otherOptions.name = "Your Location";
      otherOptions.context = "Home";

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

function createmarker(place, otherMapOptions = null){

  var mapOptions = {};
  mapOptions.map = map;
  if(
    place.geometry != undefined && place.geometry != null &&
    place.geometry.location != undefined && place.geometry.location != null
  ){
    mapOptions.position = {lat:place.geometry.location};
  }else{
    mapOptions.position = {lat: place.lat, lng: place.lng};
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


  if((place != undefined && place != null) && place.name != undefined && place.name != null){
    infoWindow = new google.maps.InfoWindow;
    google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }else if ((otherMapOptions != undefined && otherMapOptions != null) && otherMapOptions.name != undefined && otherMapOptions.name != null) {
    infoWindow = new google.maps.InfoWindow;
    google.maps.event.addListener(marker, 'click', function(){
      // infowindow.setContent(otherMapOptions.name);
      infowindow.setContent("Hello");
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

// $(document).ready(function(){
//   $("#searchForm").on("submit", searchMap);
// });
