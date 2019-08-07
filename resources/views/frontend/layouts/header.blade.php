<!--============================= HEADER =============================-->
<div class="nav-menu">
    <div class="bg transition">
        <div class="container-fluid fixed @if (!isset($menuIsSticky) || (isset($menuIsSticky) && $menuIsSticky == true)) {{ "is-sticky" }}  @endif">
            <div class="row">
                <div class="col-md-12">
                    <nav class="navbar navbar-expand-lg navbar-light">
                        <a id="main-nav-logo-link" class="navbar-brand" href="/"><img alt="Project Logo" src="/images/logo.png" id="main-nav-logo"/></a>
                        {{-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="icon-menu"></span>
                        </button> --}}
                        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                            <ul class="navbar-nav">

                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- @include('frontend.includes.header.slider') --}}
<!--//END HEADER -->
