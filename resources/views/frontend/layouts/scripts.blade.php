<!-- jQuery, Bootstrap JS. -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->


<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
{{-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"> --}}
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
{{-- <script src="js/jquery-3.2.1.min.js"></script> --}}

{{-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script> --}}
{{-- <script src="js/popper.min.js"></script> --}}
{{-- <script src="js/bootstrap.min.js"></script> --}}



@if (!isset($menuIsSticky) || (isset($menuIsSticky) && $menuIsSticky != true))
  <script type="text/javascript" src="/js/menuSticky.js"></script>
@endif

<script type="text/javascript" src="/js/googleMaps.js"></script>
<script async defer type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key={{ Config::get('constants.options.googleMapsAPIKey') }}&callback=initializeMap&libraries=places,geometry"></script>
