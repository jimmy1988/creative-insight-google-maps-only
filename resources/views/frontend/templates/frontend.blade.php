@include('frontend.includes.top.php-cache-control')
@include('frontend.layouts.top')
@include('frontend.layouts.header')


@yield('content')


@include('frontend.layouts.footer')
@include('frontend.layouts.scripts')
@include('frontend.layouts.bottom')
