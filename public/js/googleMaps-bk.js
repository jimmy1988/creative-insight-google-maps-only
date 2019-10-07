var map;
var center;
var markers = [];
var infoWindow;
var request;
var service;
var currentloc = {};
var defaultLat = 52.4786758;
var defaultLong = -1.9001709;
var zoomlevel = 16;

function getLocation() {
  // if (navigator.geolocation) {
  //   navigator.geolocation.watchPosition(function(position){
  //     if(position == null){
  //       currentloc.lat = defaultLat;
  //       currentloc.long = defaultLong;
  //       initializeMap();
  //     }else{
  //       currentloc.lat = position.coords.latitude;
  //       currentloc.long = position.coords.longitude;
  //       initializeMap();
  //     }
  //   }, function(){alert("Geolocation is not enabed in the browser");}, {maximumAge:10000, timeout:5000,enableHighAccuracy: true})
  // } else {
  //   currentloc.lat = defaultLat;
  //   currentloc.long = defaultLong;
  //   initializeMap();
  // }

  // infowindow = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      // infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

  //Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    if(markers.length > 1){
      for (var i = 1; i < markers.length; i++) {
            markers[i].setMap(null);
            markers.splice(i, 1);
      }
    }

  }

function searchMap(){
  event.preventDefault();
  $("#curtain-outer").fadeIn(500, function(){
    clearMarkers();
    var searchTerm = document.getElementById("search-box").value;
    var distanceMiles = document.getElementById("distance-box").value;
    var distanceMeters = Math.ceil((parseFloat(distanceMiles) * parseFloat("1609.344")) + parseFloat(distanceMiles));

    request = {
      location:center,
      radius:distanceMeters,
      name: [searchTerm],
      types:[searchTerm]
    };

    infowindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, plotMarkers);

    $("#curtain-outer").fadeOut(500);
  });

}

function initializeMap(){

  center = new google.maps.LatLng(defaultLat, defaultLong);

  map = new google.maps.Map(document.getElementById('map'),{
    center:center,
    zoom:zoomlevel
  });

  infowindow = new google.maps.InfoWindow();

  getLocation();

  // otherOptions = {};
  // otherOptions.icon =  {
  //    url: "https://image.flaticon.com/icons/svg/60/60834.svg", // url
  //    scaledSize: new google.maps.Size(30, 30)
  //  };
  //
  // currentloc.name = "Your Location";
  //
  // createmarker(currentloc, otherOptions);

  $("#curtain-outer").fadeOut(500);
}


function plotMarkers(results, status){
  if(status == google.maps.places.PlacesServiceStatus.OK){
    for(var i = 0; i < results.length; i++){
      createmarker(results[i]);
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
    mapOptions.position = {lat: place.lat, lng: place.long};
  }


  if(otherMapOptions != null){
    mapOptions = Object.assign(mapOptions, otherMapOptions);
  }

  var marker = new google.maps.Marker(mapOptions);
  markers.push(marker);

  if(place.name != undefined && place.name != null){
    google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

}

$(document).ready(function(){
  $("#searchForm").on("submit", searchMap);
});
