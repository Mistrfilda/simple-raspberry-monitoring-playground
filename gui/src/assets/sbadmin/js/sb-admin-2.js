import $ from "jquery";

const sbAdmin = $(document).ready(function() {
  "use strict"; // Start of use strict

  function toggleNavbar() {
    if ($(window).width() < 768) {
      $(".sidebar").addClass("toggled");
      $(".sidebar .collapse").collapse("show");
    } else {
      $(".sidebar").removeClass("toggled");
    }

    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $(".sidebar .collapse").collapse("show");
    }
  }

  toggleNavbar();

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on("click", function() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $(".sidebar .collapse").collapse("show");
    }
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    toggleNavbar();
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function(
    e
  ) {
    if ($(window).width() > 768) {
      const e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on("scroll", function() {
    const scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on("click", "a.scroll-to-top", function(e) {
    const $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top
        },
        1000,
        "easeInOutExpo"
      );
    e.preventDefault();
  });
}); // End of use strict

export default sbAdmin;
