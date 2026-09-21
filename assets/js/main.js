/* Progressive enhancement only. The page is fully readable without this file. */
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready() {
    root.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

  // Scroll cue fades once the visitor starts scrolling.
  var cue = document.querySelector("[data-scroll-cue]");
  if (cue) {
    var onScroll = function () {
      cue.classList.toggle("is-hidden", window.scrollY > 32);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Scroll reveal for later sections. The class is only added here (never under
  // reduced motion), so content stays visible if this script does not run.
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && !reduceMotion && "IntersectionObserver" in window) {
    root.classList.add("rv-on");
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          // Also reveal anything already scrolled past (e.g. after an anchor jump).
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add("is-in");
            revealer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      revealer.observe(el);
    });
  }

  // Principles lightly emphasise the related parts of the systems map.
  // Nothing depends on this: the map and principles are complete without it.
  var map = document.querySelector("[data-map]");
  var principles = document.querySelectorAll("[data-principle]");
  if (map && principles.length) {
    var parts = map.querySelectorAll("[data-p]");
    var light = function (n) {
      parts.forEach(function (el) {
        var on = n !== null && el.getAttribute("data-p").split(" ").indexOf(n) > -1;
        el.classList.toggle("is-lit", on);
        el.classList.toggle("is-dim", n !== null && !on);
      });
    };
    principles.forEach(function (li) {
      var n = li.getAttribute("data-principle");
      li.setAttribute("tabindex", "0");
      li.addEventListener("mouseenter", function () { light(n); });
      li.addEventListener("mouseleave", function () { light(null); });
      li.addEventListener("focus", function () { light(n); });
      li.addEventListener("blur", function () { light(null); });
    });
  }

  // The hero line continues into the Problems section as its opening guide.
  var guide = document.querySelector("[data-guide]");
  if (guide) {
    var connect = function () {
      guide.classList.add("is-connected");
    };
    if (reduceMotion || !("IntersectionObserver" in window)) {
      connect();
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          if (entries.some(function (e) { return e.isIntersecting; })) {
            connect();
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -15% 0px" }
      );
      observer.observe(guide.closest("section") || guide);
    }
  }
})();
