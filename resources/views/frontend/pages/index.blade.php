@extends('frontend.templates.frontend')

@section('content')

<div class="container-fluid no-gutters" id="map-container">
  <form method="post" action="" id="searchForm">
    <div class="row" id="search-container">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="form-group">
            <div class="row">
              <div id="search-box-container" class="col-md-8">
                <div class="form-group">
                  <input type="text" id="search-box" class="form-control" placeholder="Search For Businesses e.g.Nandos"/>
                </div>
              </div>
              <div id="distance-container" class="col-md-2">
                <div class="form-group">
                  <select class="form-control" id="distance-box">
                    @for ($i=0; $i <= 25; $i)
                      <option value="{{$i}}">{{$i}} Miles +</option>
                      <?php $i = $i + 5; ?>
                    @endfor
                  </select>
                </div>
              </div>
              <div id="search-button-container" class="col-md-2">
                <button type="submit" id="search-button" class="btn btn-secondary"><i class="fas fa-crosshairs"></i></button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </form>
  <div class="row" id="google-map-container">
    <div class="col-md-9">
      <div id="map">

      </div>
    </div>
    <div class="col-md-3">

    </div>
  </div>
</div>

<div class="container-fluid no-gutters" id="curtain-outer">
  <div class="row text-center" id="curtain-inner">
    <div class="col-xs-12">
      <p>
        <i class="fas fa-crosshairs fa-spin"></i>
      </p>
      <p>
        Loading...
      </p>
    </div>
  </div>
</div>

@endsection
