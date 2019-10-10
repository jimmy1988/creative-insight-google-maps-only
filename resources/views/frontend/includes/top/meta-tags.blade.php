<!-- Required meta tags -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- Tell the browser to be responsive to screen width -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no">
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">

<meta name="author" content="James McHugh">

@include('frontend.includes.top.html-cache-control')

@if (isset($customMetaTags) && !empty($customMetaTags) && is_array($customMetaTags))
  @for ($i=0; $i < count($customMetaTags); $i++)
    <meta
    @foreach ($customMetaTags[$i] as $attribute => $value)
      {{ $attribute }} = "{{$value}}"
    @endforeach
    />
  @endfor
@endif
