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

  // Systems map as scroll steps (two-column layout only). The map stays pinned
  // while the principles scroll past; the one crossing the middle of the viewport
  // lights its parts. Nothing depends on this: without it the map simply shows
  // all six parts.
  var map = document.querySelector("[data-map]");
  var principles = document.querySelectorAll("[data-principle]");
  if (map && principles.length) {
    var parts = map.querySelectorAll("[data-p]");
    var wide = window.matchMedia("(min-width: 900px)");
    var current = null;

    var light = function (n) {
      if (n === current) return;
      current = n;
      parts.forEach(function (el) {
        var on = n !== null && el.getAttribute("data-p").split(" ").indexOf(n) > -1;
        el.classList.toggle("is-lit", on);
        el.classList.toggle("is-dim", n !== null && !on);
      });
      principles.forEach(function (li) {
        li.classList.toggle("is-active", li.getAttribute("data-principle") === n);
      });
      map.classList.toggle("is-stepping", n !== null);
    };

    // The principle whose box spans the viewport's midline, if any.
    var pick = function () {
      if (!wide.matches) { light(null); return; }
      var mid = window.innerHeight / 2;
      var hit = null;
      principles.forEach(function (li) {
        var r = li.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) hit = li.getAttribute("data-principle");
      });
      light(hit);
    };

    // Centre the pinned map vertically using its real height.
    var size = function () {
      map.style.setProperty("--map-h", map.offsetHeight + "px");
      pick();
    };

    document.documentElement.classList.add("map-steps");
    // Step animations take over only once the entrance animation (which starts
    // when the map is revealed) has finished; without scroll reveal, at once.
    var settle = function () {
      window.setTimeout(function () { map.classList.add("is-settled"); }, 900);
    };
    if (!root.classList.contains("rv-on") || map.classList.contains("is-in")) {
      settle();
    } else if ("MutationObserver" in window) {
      var watch = new MutationObserver(function () {
        if (map.classList.contains("is-in")) { watch.disconnect(); settle(); }
      });
      watch.observe(map, { attributes: true, attributeFilter: ["class"] });
    }
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", size);
    // Fonts and layout can change the map's height after load.
    if ("ResizeObserver" in window) new ResizeObserver(size).observe(map);
    size();
  }

  // Bigeen Approach: as the reader moves down the sequence, the connecting line fills
  // and the current stage is emphasised.
  // Purely visual: all seven stages are complete without this, and it is skipped
  // under reduced motion.
  var flow = document.querySelector("[data-flow]");
  if (flow && !reduceMotion && "IntersectionObserver" in window) {
    var stages = [].slice.call(flow.querySelectorAll(".stage"));
    var ticking = false;
    var mark = function (el, i, active) {
      el.classList.toggle("is-active", i === active);
      el.classList.toggle("is-passed", i < active);
    };
    var update = function () {
      ticking = false;
      var line = window.innerHeight * 0.5;
      var active = -1;
      stages.forEach(function (s, i) {
        if (s.getBoundingClientRect().top < line) active = i;
      });
      stages.forEach(function (s, i) { mark(s, i, active); });
    };
    var onFlowScroll = function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          window.addEventListener("scroll", onFlowScroll, { passive: true });
          onFlowScroll();
        } else {
          window.removeEventListener("scroll", onFlowScroll);
          onFlowScroll();
        }
      },
      { rootMargin: "0px 0px 0px 0px" }
    ).observe(flow.parentElement);
  }

  // Selected Experience: previous/next buttons for the swipeable row of cases.
  // They are shown only while the row actually scrolls (phones and tablets);
  // on desktop the cards sit side by side. Without JS the row still swipes.
  var cases = document.querySelector("[data-cases]");
  if (cases) {
    var track = cases.querySelector(".cases__track");
    var nav = cases.querySelector(".cases__nav");
    var cards = track.children;
    var prev = cases.querySelector("[data-cases-prev]");
    var next = cases.querySelector("[data-cases-next]");
    var at = cases.querySelector("[data-cases-at]");
    var index = 0;
    var queued = false;

    var step = function () {
      return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
    };
    var sync = function () {
      queued = false;
      var max = track.scrollWidth - track.clientWidth;
      var scrolls = max > 1;
      nav.hidden = !scrolls;
      // A focus stop only while there is something to scroll with the arrow keys.
      if (scrolls) track.setAttribute("tabindex", "0");
      else track.removeAttribute("tabindex");
      index = track.scrollLeft >= max - 1
        ? cards.length - 1
        : Math.round(track.scrollLeft / step());
      at.textContent = index + 1;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max - 1;
    };
    var queue = function () {
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(sync);
      }
    };
    var go = function (dir) {
      track.scrollBy({ left: dir * step(), behavior: reduceMotion ? "auto" : "smooth" });
    };

    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });
    track.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    sync();
  }

  // Launch-dependent wording. Each element carries its launch instant (data-launch)
  // and the text to show from then on (data-live-text); the HTML holds the
  // pre-launch text. The badge's parent gets .is-live so its marker changes shape.
  var liveBits = document.querySelectorAll("[data-live-text]");
  if (liveBits.length) {
    var goLive = function (el) {
      el.textContent = el.getAttribute("data-live-text");
      el.removeAttribute("data-live-text");
      if (el.parentElement) el.parentElement.classList.add("is-live");
    };
    Array.prototype.forEach.call(liveBits, function (el) {
      var at = Date.parse(el.getAttribute("data-launch"));
      if (isNaN(at)) return;
      var wait = at - Date.now();
      if (wait <= 0) goLive(el);
      // setTimeout caps at about 24.8 days; a page open that long can reload.
      else if (wait < 2147483647) window.setTimeout(function () { goLive(el); }, wait);
    });
  }

  // StitchFYN countdown. The target instant lives in data-launch on the element.
  // Without JS the static "Launching 31 October 2026" line is shown instead. Under
  // reduced motion the seconds are dropped and the display updates once a minute.
  var countdown = document.querySelector("[data-countdown]");
  if (countdown) {
    var target = Date.parse(countdown.getAttribute("data-launch"));
    if (!isNaN(target)) {
      var cd = function (k) { return countdown.querySelector('[data-cd="' + k + '"]'); };
      var pad = function (n) { return n < 10 ? "0" + n : String(n); };
      var timer;
      if (reduceMotion) {
        var secs = countdown.querySelector("[data-cd-seconds]");
        if (secs) secs.hidden = true;
      }
      var tick = function () {
        var left = target - Date.now();
        if (left <= 0) {
          countdown.classList.remove("is-on");
          countdown.classList.add("is-live");
          countdown.querySelector(".countdown__date").textContent = "Now live";
          window.clearInterval(timer);
          return;
        }
        var s = Math.floor(left / 1000);
        cd("days").textContent = pad(Math.floor(s / 86400));
        cd("hours").textContent = pad(Math.floor((s % 86400) / 3600));
        cd("minutes").textContent = pad(Math.floor((s % 3600) / 60));
        cd("seconds").textContent = pad(s % 60);
        countdown.classList.add("is-on");
      };
      tick();
      if (!countdown.classList.contains("is-live")) {
        timer = window.setInterval(tick, reduceMotion ? 30000 : 1000);
      }
    }
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
