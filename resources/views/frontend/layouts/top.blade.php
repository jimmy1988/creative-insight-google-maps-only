<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Page Title -->
    <title>@if (isset($pageTitle) && !empty($pageTitle)) {{$pageTitle . " - "}} @endif @if (env('APP_NAME')) {{env('APP_NAME')}} @else {{"Creative Insight Developer Test" }} @endif
    </title>

    @include('frontend.includes.top.meta-tags')

    @include('frontend.includes.top.fonts')

    @include('frontend.includes.top.styles')

    @include('frontend.includes.top.other-components')

</head>

<body>
