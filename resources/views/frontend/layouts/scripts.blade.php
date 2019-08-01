<!-- jQuery, Bootstrap JS. -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>

@if (!isset($menuIsSticky) || (isset($menuIsSticky) && $menuIsSticky != true))
  <script>
      $(window).scroll(function() {
          // 100 = The point you would like to fade the nav in.

          if ($(window).scrollTop() > 100) {
              $('.fixed').addClass('is-sticky');
          } else {
              $('.fixed').removeClass('is-sticky');
          };
      });
  </script>
@endif
