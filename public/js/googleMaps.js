var defaultLat = 52.4786758;
var defaultLong = -1.9001709;
var zoomlevel = 16;
var map;
var infoWindow;
var marker;
var center;
var markers = [];
var currentloc = {};
var currentlocDetails = {};
var request;
var service;
var distanceMatrix;
var places = [];
var distanceMiles;
var distanceMeters;


function checkAdult(age) {
  return age >= 18;
}

function myFunction() {
  document.getElementById("demo").innerHTML = ages.findIndex(checkAdult);
}

//Removes the markers from the map, but keeps them in the array.
function clearAllMarkers(removeFromMap = true, removeFromArray = false, removeFromMapExceptions = [], removeFromArrayExceptions = []) {
  if(markers.length > 1){
    for (var i = 0; i < markers.length; i++) {
      if(removeFromMap == true){
        if(removeFromMapExceptions.indexOf(i) == -1){
          markers[i].setMap(null);
        }
      }

      if(removeFromArray == true){
        if(removeFromArrayExceptions.indexOf(i) == -1){
          markers.splice(i, 1);
          places.splice(i, 1);
        }
      }
    }
  }
}

function createListItem(place = null, distance = 0, markersArrayIndex = 0, placesArrayIndex = 0){
  var html = "";
  if(place != null && place != undefined && place != ""){

    html = html + "<div class=\"map-entry\">";
    html = html + "<div class=\"row\">";
    html = html + "<div class=\"col-md-12\">";
    html = html + "<h6 class=\"map-entry-title text-center\">" + place.name + "</h6>";
    html = html + "<p class=\"map-entry-address\">" + place.vicinity + "</p>";
    html = html + "<p class=\"map-entry-miles\"><span>" + distance + "</span><span> Miles Away</span></p>";
    html = html + "</div>";
    html = html + "</div>";
    html = html + "<div class=\"row\">";
    html = html + "<div class=\"col-md-12\">";
    html = html + "<p class=\"rating\">Rating:&nbsp;";
    html = html + "<span class=\"rating-stars\">";

    var rating = parseFloat(place.rating);
    var ratingFloor = Math.floor(place.rating);
    var roundedRating = Math.round(place.rating * 2)/2;
    roundedRating = parseFloat(roundedRating.toFixed(1));

    if(rating > 0.5 && rating < 1){
      html = html + "<i class=\"fas fa-star-half-alt\"></i>";
    }else if(rating >= 1){
      for(var i = 0; i < ratingFloor; i++){
        html = html + "<i class=\"fas fa-star\"></i>";
      }

      var halfRating = parseFloat(rating) - parseFloat(i);
      if(halfRating >= 0.5){
        html = html + "<i class=\"fas fa-star-half-alt\"></i>";
      }
    }


    html = html + "</span>";
    html = html + "&nbsp;";
    html = html + "<span>" + place.rating + "</span>";
    html = html + "</p>";
    html = html + "</div>";
    html = html + "<div class=\"col-md-12 text-right\">";
    html = html + "<a href=\"#\" onclick=\"getDirections(event, this," + markersArrayIndex + ", " + placesArrayIndex + ")\" class=\"btn btn-info get-directions-button\">Get Directions</a>";
    html = html + "</div>";
    html = html + "</div>";
    html = html + "</div>";
  }

  return html;
}

function createInfoWindow(place = null, infowindowOptions = null){
  if(place != undefined && place != null && place.name != undefined && place.name != null){
    var infowindow = new google.maps.InfoWindow({
      content: place.name
    });
    marker.addListener('click', function(){
      infowindow.open(map, this);
    });
  }else if (infowindowOptions != undefined && infowindowOptions != null && infowindowOptions.name != undefined && infowindowOptions.name != null) {
    var infowindow = new google.maps.InfoWindow({
      content: infowindowOptions.name
    });
    marker.addListener('click', function(){
      infowindow.open(map, this);
    });
  }
}

function createmarker(place = null, markerOptions = null){

  var marker = new google.maps.Marker;
  marker.setMap(map);

  if(
    place.geometry != undefined && place.geometry != null &&
    place.geometry.location != undefined && place.geometry.location != null
  ){
    marker.setPosition(place.geometry.location);
  }else{
    marker.setPosition({lat: parseFloat(place.lat), lng: parseFloat(place.lng)});
  }

  return marker;
}

function getDirections(event, elem, markersArrayIndex = -1, placesArrayIndex = -1){
  event.preventDefault();
  if(placesArrayIndex != undefined && placesArrayIndex != null && placesArrayIndex >= 0){
    clearAllMarkers(true, false);

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var thisPlace = places[placesArrayIndex];

    // var home = new google.maps.LatLng(center);
    var home = center;
    var destination = thisPlace.geometry.location;

    directionsRenderer.setMap(map);

    var request = {
      origin: home,
      destination: destination,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
        console.log(result);
      }
    });


  }else{
    alert("No location found");
  }
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

      var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(currentloc.lat, currentloc.lng), results[i].geometry.location);
      distance = parseFloat(distance) / parseFloat("1609.344");
      distance = parseFloat(distance.toFixed(1));

      var totalDistance = parseInt(distanceMiles) + 5;

      if(distance <= totalDistance){
        places.push(results[i]);
        var thisMarker = createmarker(results[i]);
        markers.push(thisMarker);
        var thisInfoWindow = createInfoWindow(results[i], thisMarker);
        $("#rightPaneContent").append(createListItem(results[i], distance, i, i));
      }else{
        break;
      }
    }

    zoomlevel = 10;
    map.setZoom(zoomlevel);
  }
}

function initializeMap() {
  $("#curtain-outer").show();

  center = new google.maps.LatLng(defaultLat, defaultLong);

  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: zoomlevel
  });

  infoWindow = new google.maps.InfoWindow;
  marker = new google.maps.Marker;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentloc.lat = parseFloat(position.coords.latitude.toFixed(7));
      currentloc.lng = parseFloat(position.coords.longitude.toFixed(7));

      center = new google.maps.LatLng(currentloc.lat, currentloc.lng);

      var icon = {
        url: "https://image.flaticon.com/icons/svg/60/60834.svg",
        scaledSize: new google.maps.Size(30, 30)
      };

      marker.setPosition(center);
      marker.setMap(map);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      marker.setIcon(icon);
      marker.setVisible(true);

      var infowindow = new google.maps.InfoWindow({
        content: "Your Location"
      });
      marker.addListener('click', function(){
        infowindow.open(map, this);
      });

      map.setCenter(currentloc);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    }, {maximumAge:50, timeout:5000, enableHighAccuracy: true});
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  $("#curtain-outer").fadeOut(500);
}

function searchMap(){
  event.preventDefault();
  $("#curtain-outer").fadeIn(500, function(){
    clearAllMarkers(true, true);
    $("#rightPaneContent").html("");
    zoomlevel = 16;
    map.setZoom(zoomlevel);
    var searchTerm = document.getElementById("search-box").value;
    distanceMiles = document.getElementById("distance-box").value;
    distanceMeters = Math.ceil((parseFloat(distanceMiles) + parseFloat(5)) * parseFloat("1609.344"));

    request = {
      location:center,
      rankBy:google.maps.places.RankBy.DISTANCE,
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
