@extends('frontend.templates.frontend')

@section('content')

<div class="container">
  <form method="post" action="" id="searchForm">
    <div class="row" id="search-container">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-1 col-xl-1">
        &nbsp;
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
          <div class="form-group">
            <div class="row">
              <div id="search-box-container" class="col-md-10 col-lg-10 col-xl-10">
                <input type="text" id="search-box" class="form-control" placeholder="Search e.g.Nandos or Restaurants Near Me"/>
              </div>
              <div id="search-button-container" class="col-md-2 col-lg-2 col-xl-2">
                <button type="submit" id="search-button" class="btn btn-secondary">Search</button>
              </div>
            </div>
          </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-1 col-xl-1">
        &nbsp;
      </div>
    </div>
  </form>
  <div class="row" id="google-map-container">
    <div class="col-12">
      <div id="map">
        
      </div>
    </div>
  </div>
</div>

@endsection
