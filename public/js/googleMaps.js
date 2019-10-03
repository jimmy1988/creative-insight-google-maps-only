var map;
var infoWindow;
var request;
var service;
var markers = [];
var currentloc = {};
// return ["52.477564", "-2.0037156"];
var defaultLat = 52.4786758;
var defaultLong = -1.9001709;
var zoomlevel = 16;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position){
      if(position == null){
        currentloc.lat = defaultLat;
        currentloc.long = defaultLong;
        initializeMap();
      }else{
        currentloc.lat = position.coords.latitude;
        currentloc.long = position.coords.longitude;
        initializeMap();
      }
    }, function(){alert("Geolocation is not enabed in the browser");}, {maximumAge:10000, timeout:5000,enableHighAccuracy: true})
  } else {
    currentloc.lat = defaultLat;
    currentloc.long = defaultLong;
    initializeMap();
  }
}


function initializeMap(){
  // var inputSearch = document.getElementById("search-box");
  // var autocomplete = new google.maps.places.Autocomplete(inputSearch);

  // var center = new google.maps.LatLng(defaultLat, defaultLong);
  var center = new google.maps.LatLng(currentloc.lat, currentloc.long);
  map = new google.maps.Map(document.getElementById('map'),{
    center:center,
    zoom:zoomlevel
  });

  otherOptions = {};
  otherOptions.icon =  {
     url: "https://image.flaticon.com/icons/svg/60/60834.svg", // url
     scaledSize: new google.maps.Size(30, 30)
   };

  currentloc.name = "Your Location";

  createmarker(currentloc, otherOptions);

  // request = {
  //   location:center,
  //   radius:80047,
  //   name: ['nandos'],
  //   types:['nandos']
  // };
  //
  // infowindow = new google.maps.InfoWindow();
  //
  // service = new google.maps.places.PlacesService(map);
  //
  // service.nearbySearch(request, callback);
}


function callback(results, status){
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

  if(place.name != undefined && place.name != null){
    google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

}

// $(document).ready(function(){
//   getLocation();
// });
