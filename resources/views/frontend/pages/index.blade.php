@extends('frontend.templates.frontend')

@section('content')

      @include('frontend.page-includes.index.find-places')

      @include('frontend.page-includes.index.featured-places')

      @include('frontend.page-includes.index.categories')

      @include('frontend.page-includes.index.add-listing')

@endsection
