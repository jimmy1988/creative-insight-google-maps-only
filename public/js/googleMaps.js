var map;
var infoWindow;
var request;
var service;
var markers = [];

var currentloc = [];

function returnCurrentPosition(position = 0){
  if(position == null){
    return ["52.477564", "-2.0037156"];
  }else{
    return [position.coords.latitude, position.coords.longitude];
  }

}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(returnCurrentPosition);
  } else {
    returnCurrentPosition();
  }
}


function initialize(){

  currentloc = new Array();
  getLocation();

  console.log(currentloc);

  var center = new google.maps.LatLng(37.422,-122.084058);
  map = new google.maps.Map(document.getElementById('map'),{
    center:center,
    zoom:13
  });

  request = {
    location:center,
    radius:80047,
    types:['coffee shops']
  };

  infowindow = new google.maps.InfoWindow();

  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);
}


function callback(results, status){
  if(status == google.maps.places.PlacesServiceStatus.OK){
    for(var i = 0; i < results.length; i++){
      createmarker(results[i]);
    }
  }
}

function createmarker(place){
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map:map,
    position:place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function(){
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
