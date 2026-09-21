/* Business Diagnostic: a multi-step intake.
 *
 * - Answers live only in the form fields on this page. Nothing is written to
 *   localStorage, sessionStorage, cookies or the URL, and nothing is logged.
 * - Nothing is sent until the visitor submits the last step.
 * - Submission goes to the endpoint in the form's data-endpoint attribute. If it
 *   is empty or the request fails, the visitor sees the failure state; a success
 *   message is only ever shown after the endpoint answers with a 2xx response.
 */
(function () {
  "use strict";

  var root = document.querySelector("[data-diag]");
  if (!root) return;

  var form = root.querySelector("#diagnostic-form");
  var steps = [].slice.call(form.querySelectorAll(".step"));
  var dots = [].slice.call(root.querySelectorAll(".diag-steps li"));
  var backBtn = form.querySelector("[data-back]");
  var nextBtn = form.querySelector("[data-next]");
  var retryBtn = form.querySelector("[data-retry]");
  var errorBox = form.querySelector("[data-errors]");
  var failureBox = form.querySelector("[data-failure]");
  var doneBox = root.querySelector("[data-done]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var last = steps.length - 1;
  var current = 0;
  var sending = false;

  // The form is only shown once this script is running.
  document.documentElement.classList.add("diag-ready");
  root.hidden = false;

  /* ---------- Helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function trim(v) { return (v || "").replace(/^\s+|\s+$/g, ""); }
  function visible(el) { return !el.closest("[hidden]"); }
  function checkedValues(name) {
    return [].slice.call(form.querySelectorAll('input[name="' + name + '"]:checked')).map(function (i) { return i.value; });
  }
  function val(name) {
    var el = form.elements[name];
    if (!el || el.disabled) return "";
    return trim(el.value);
  }

  /* ---------- Step display ---------- */
  function show(i, moveFocus) {
    current = i;
    steps.forEach(function (s, k) { s.hidden = k !== i; });
    dots.forEach(function (d, k) {
      d.classList.toggle("is-done", k < i);
      d.classList.toggle("is-current", k === i);
      if (k === i) d.setAttribute("aria-current", "step");
      else d.removeAttribute("aria-current");
    });
    backBtn.hidden = i === 0;
    nextBtn.textContent = i === last ? "Submit Diagnostic" : "Continue";
    clearErrors();
    failureBox.hidden = true;
    if (moveFocus) {
      root.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
      steps[i].querySelector("h2").focus({ preventScroll: true });
    }
  }

  /* ---------- Conditional fields ---------- */
  function syncReveals() {
    // Select "Other" and checkbox "Other" each reveal a text field.
    [].slice.call(form.querySelectorAll("[data-reveals]")).forEach(function (ctl) {
      var target = $(ctl.getAttribute("data-reveals"));
      if (!target) return;
      var on = ctl.tagName === "SELECT" ? ctl.value === "Other" : ctl.checked;
      target.hidden = !on;
    });
    // "No website" disables the website field.
    [].slice.call(form.querySelectorAll("[data-disables]")).forEach(function (ctl) {
      var target = $(ctl.getAttribute("data-disables"));
      if (target) target.disabled = ctl.checked;
    });
  }

  form.addEventListener("change", function (e) {
    syncReveals();
    clearFieldError(e.target);
  });

  form.addEventListener("input", function (e) {
    clearFieldError(e.target);
  });

  /* ---------- Validation ---------- */
  function messageFor(el, fallback) {
    return el.getAttribute("data-msg") || fallback;
  }

  function validateStep(stepEl) {
    var errors = [];

    [].slice.call(stepEl.querySelectorAll("input, select, textarea")).forEach(function (el) {
      if (el.type === "checkbox" && el.name !== "consent") return;
      if (el.type === "radio") return;
      if (el.disabled || !visible(el)) return;
      var v = trim(el.value);
      var kind = el.getAttribute("data-kind");

      if (el.type === "checkbox") {
        if (el.required && !el.checked) errors.push({ id: el.id, msg: messageFor(el, "This is required.") });
        return;
      }
      if (el.required && !v) {
        errors.push({ id: el.id, msg: messageFor(el, "This is required.") });
      } else if (v && kind === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        errors.push({ id: el.id, msg: "Enter an email address in the form name@company.com." });
      } else if (v && kind === "url" && !/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}([\/?#].*)?$/i.test(v)) {
        errors.push({ id: el.id, msg: messageFor(el, "Enter a website address, for example organisation.com.") });
      } else if (v && kind === "phone" && v.replace(/\D/g, "").length < 7) {
        errors.push({ id: el.id, msg: "Enter a phone number with at least 7 digits." });
      }
    });

    // Required radio groups
    [].slice.call(stepEl.querySelectorAll("fieldset[data-required]")).forEach(function (fs) {
      if (!fs.querySelector("input:checked")) {
        errors.push({ id: fs.id, msg: messageFor(fs, "Choose one option."), group: true });
      }
    });

    // A phone number is needed when the visitor asks for a call or WhatsApp.
    var method = checkedValues("contact_method")[0];
    var phone = form.elements.contact_phone;
    if (stepEl.contains(phone) && (method === "Phone call" || method === "WhatsApp") && !trim(phone.value)) {
      if (!errors.some(function (e) { return e.id === "contact_phone"; })) {
        errors.push({ id: "contact_phone", msg: messageFor(phone, "Add a phone number.") });
      }
    }
    // Report problems in the order they appear on the page.
    errors.sort(function (a, b) {
      var x = $(a.id), y = $(b.id);
      if (!x || !y) return 0;
      return x.compareDocumentPosition(y) & 4 ? -1 : 1;
    });
    return errors;
  }

  function containerOf(id) {
    var el = $(id);
    if (!el) return null;
    return el.tagName === "FIELDSET" ? el : el.closest(".field");
  }

  function showErrors(errors) {
    clearErrors();
    errors.forEach(function (err) {
      var box = containerOf(err.id);
      if (!box) return;
      box.classList.add("field--invalid");
      var p = box.querySelector(".field__error");
      if (p) {
        p.innerHTML = "";
        var hidden = document.createElement("span");
        hidden.className = "visually-hidden";
        hidden.textContent = "Error: ";
        p.appendChild(hidden);
        p.appendChild(document.createTextNode(err.msg));
        p.hidden = false;
      }
      var target = $(err.id);
      if (target && target.tagName !== "FIELDSET") target.setAttribute("aria-invalid", "true");
      if (target && target.tagName === "FIELDSET") {
        [].slice.call(target.querySelectorAll("input")).forEach(function (i) { i.setAttribute("aria-invalid", "true"); });
      }
    });

    // Summary at the top of the step, with links to each problem.
    errorBox.innerHTML = "";
    var title = document.createElement("p");
    title.className = "diag-errors__title";
    title.textContent = summaryTitle(errors.length);
    var ul = document.createElement("ul");
    errors.forEach(function (err) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + err.id;
      a.textContent = err.msg;
      a.addEventListener("click", function (ev) {
        ev.preventDefault();
        focusField(err);
      });
      li.appendChild(a);
      ul.appendChild(li);
    });
    errorBox.appendChild(title);
    errorBox.appendChild(ul);
    errorBox.hidden = false;
    errorBox.focus();
  }

  function focusField(err) {
    var el = $(err.id);
    if (!el) return;
    var target = el.tagName === "FIELDSET" ? el.querySelector("input") : el;
    if (target) target.focus();
  }

  function clearFieldError(el) {
    var box = el && (el.closest ? el.closest(".field") : null);
    if (!box || !box.classList.contains("field--invalid")) return;
    box.classList.remove("field--invalid");
    var p = box.querySelector(".field__error");
    if (p) p.hidden = true;
    [].slice.call(box.querySelectorAll("[aria-invalid]")).forEach(function (n) { n.removeAttribute("aria-invalid"); });
    refreshSummary();
  }

  // Keep the summary in step with the fields: drop fixed items, update the count,
  // and hide it once nothing is left.
  function refreshSummary() {
    var items = [].slice.call(errorBox.querySelectorAll("li"));
    items.forEach(function (li) {
      var id = li.querySelector("a").getAttribute("href").slice(1);
      var box = containerOf(id);
      if (!box || !box.classList.contains("field--invalid")) li.parentNode.removeChild(li);
    });
    var left = errorBox.querySelectorAll("li").length;
    if (!left) {
      errorBox.hidden = true;
      errorBox.innerHTML = "";
      return;
    }
    errorBox.querySelector(".diag-errors__title").textContent = summaryTitle(left);
  }

  function summaryTitle(n) {
    return n === 1 ? "There is 1 thing to check before you continue." : "There are " + n + " things to check before you continue.";
  }

  function clearErrors() {
    [].slice.call(form.querySelectorAll(".field--invalid")).forEach(function (b) { b.classList.remove("field--invalid"); });
    [].slice.call(form.querySelectorAll(".field__error")).forEach(function (p) { p.hidden = true; });
    [].slice.call(form.querySelectorAll("[aria-invalid]")).forEach(function (n) { n.removeAttribute("aria-invalid"); });
    errorBox.hidden = true;
    errorBox.innerHTML = "";
  }

  /* ---------- Navigation ---------- */
  function goNext() {
    var errors = validateStep(steps[current]);
    if (errors.length) { showErrors(errors); return; }
    if (current < last) show(current + 1, true);
    else submit();
  }

  backBtn.addEventListener("click", function () {
    if (current > 0) show(current - 1, true);
  });

  // Enter inside a field, or the Continue button, both arrive here.
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!sending) goNext();
  });

  retryBtn.addEventListener("click", function () {
    if (!sending) submit();
  });

  /* ---------- Submission ---------- */
  function collect() {
    var data = { _subject: "Business Diagnostic submission" };
    function put(label, value) {
      if (Array.isArray(value)) value = value.join("; ");
      if (value) data[label] = value;
    }
    put("Organisation name", val("org_name"));
    put("Website", form.elements.no_website.checked ? "Not applicable" : val("org_website"));
    var type = val("org_type");
    put("Organisation type", type === "Other" ? "Other: " + val("org_type_other") : type);
    put("Industry or sector", val("industry"));
    put("Organisation size", val("org_size"));
    put("Role", val("role"));
    put("What they are trying to achieve", val("goal"));
    var areas = checkedValues("challenge_area").map(function (v) { return v === "Other" ? "Other: " + val("challenge_other") : v; });
    put("Where the challenge sits", areas);
    put("Main challenge", val("challenge"));
    var impact = checkedValues("impact_area").map(function (v) { return v === "Other" ? "Other: " + val("impact_other") : v; });
    put("What it is affecting", impact);
    put("Impact detail", val("impact_detail"));
    put("Already tried", val("attempts"));
    put("What would be different", val("future_state"));
    put("What success looks like", val("success"));
    put("Where they are", checkedValues("readiness")[0]);
    put("Name", val("contact_name"));
    put("Work email", val("contact_email"));
    put("Phone", val("contact_phone"));
    put("Preferred contact method", checkedValues("contact_method")[0]);
    put("Anything else", val("notes"));
    put("Consent to contact", form.elements.consent.checked ? "Agreed" : "");
    data._gotcha = val("_gotcha");
    return data;
  }

  function setBusy(on) {
    sending = on;
    nextBtn.disabled = on;
    backBtn.disabled = on;
    retryBtn.disabled = on;
    if (on) {
      nextBtn.setAttribute("aria-busy", "true");
      nextBtn.textContent = "Sending…";
    } else {
      nextBtn.removeAttribute("aria-busy");
      nextBtn.textContent = current === last ? "Submit Diagnostic" : "Continue";
    }
  }

  function fail() {
    setBusy(false);
    failureBox.hidden = false;
    failureBox.focus();
  }

  function succeed() {
    setBusy(false);
    form.reset();
    syncReveals();
    clearErrors();
    form.hidden = true;
    root.querySelector(".diag-steps").hidden = true;
    root.querySelector(".diag-keep").hidden = true;
    root.querySelector(".diag-key").hidden = true;
    doneBox.hidden = false;
    root.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
    doneBox.querySelector("h2").focus({ preventScroll: true });
  }

  function submit() {
    if (sending) return;
    failureBox.hidden = true;
    var endpoint = trim(form.getAttribute("data-endpoint"));
    var payload = collect();

    // Bots fill hidden fields; do not send those.
    if (payload._gotcha) { fail(); return; }
    // No endpoint configured: be honest rather than pretend it was sent.
    if (!endpoint) { fail(); return; }

    setBusy(true);
    var controller = "AbortController" in window ? new AbortController() : null;
    var timer = window.setTimeout(function () { if (controller) controller.abort(); }, 15000);

    fetch(endpoint, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "omit",
      referrerPolicy: "no-referrer",
      signal: controller ? controller.signal : undefined
    }).then(function (res) {
      window.clearTimeout(timer);
      if (res.ok) succeed(); else fail();
    }).catch(function () {
      window.clearTimeout(timer);
      fail();
    });
  }

  syncReveals();
  show(0, false);
})();
