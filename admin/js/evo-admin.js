(function ($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $(".sidebar .collapse").collapse("hide");
    }
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $(".sidebar .collapse").collapse("hide");
    }

    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $(".sidebar .collapse").collapse("hide");
    }
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $("body.fixed-nav .sidebar").on(
    "mousewheel DOMMouseScroll wheel",
    function (e) {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    }
  );

  // Scroll to top button appear
  $(document).on("scroll", function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on("click", "a.scroll-to-top", function (e) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1000,
        "easeInOutExpo"
      );
    e.preventDefault();
  });

  $("#btn_login").on("click", function (e) {
    const user = $("#inputUsername").val();
    const pass = $("#inputPassword").val();
    if (user === "evoadmin" && pass === "evoadmin123") {
      $("#error_login").removeClass("d-flex").addClass("d-none");
      window.location.href = "/admin/index.html";
      sessionStorage.setItem("evo_il", "true");
    } else {
      const msg = "Username atau Password Tidak Ditemukan";
      console.error(msg);
      $("#error_login").removeClass("d-flex").addClass("d-none");
      setTimeout(() => {
        $("#error_login").removeClass("d-none").addClass("d-flex");
      }, 1000);
    }
  });

  $("#btn_logout").on("click", function (e) {
    const loginURL = "/admin/login.html";
    sessionStorage.removeItem("evo_il");
    window.location.href = loginURL;
  });

  $.get("/admin/pages/content.html", function (data) {
    $("#content").html(data);
  });
})(jQuery); // End of use strict

$(window).on("load", function () {
  const loginURL = "/admin/login.html";
  try {
    const isLogin = sessionStorage.getItem("evo_il");
    if (isLogin) {
      if (window.location.pathname === loginURL) {
        window.location.href = "/admin/index.html";
      }
    } else {
      if (window.location.pathname !== loginURL) {
        window.location.href = loginURL;
      }
    }
  } catch (x) {
    console.warn("onload", x);
    if (window.location.pathname !== loginURL) {
      window.location.href = loginURL;
    }
  }
});

function goTo(state) {
  if (state === "INCOME") {
    $.get("/admin/pages/income/daily.html", function (data) {
      $("#content").html(data);
    });
  } else if (state === "INCOME_MONTHLY") {
    $.get("/admin/pages/income/monthly.html", function (data) {
      $("#content").html(data);
    });
  } else if (state === "INCOME_YEARLY") {
    $.get("/admin/pages/income/yearly.html", function (data) {
      $("#content").html(data);
    });
  } else {
    setPage("/admin/pages/content.html")
  }
}

function setPage(url) {
  $.get(url, function (data) {
    $("#content").html(data);
  });
}
