(function () {
  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Hero typewriter: type "whoami" on load ---
  var typewriterEl = document.getElementById("hero-typewriter");
  var cursorEl = document.getElementById("hero-cursor");
  if (typewriterEl && cursorEl) {
    var text = "whoami";
    if (cursorEl.classList) cursorEl.classList.add("hero-cursor-hidden");
    var i = 0;
    function typeNext() {
      if (i <= text.length) {
        typewriterEl.textContent = text.slice(0, i);
        i++;
        setTimeout(typeNext, 120);
      } else {
        if (cursorEl.classList) cursorEl.classList.remove("hero-cursor-hidden");
      }
    }
    setTimeout(typeNext, 400);
  }

  // --- Scroll progress bar ---
  var progressEl = document.getElementById("scroll-progress");
  if (progressEl) {
    function updateProgress() {
      var scrollY = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0;
      progressEl.style.width = pct + "%";
    }
    window.addEventListener("scroll", function () { requestAnimationFrame(updateProgress); });
    updateProgress();
  }

  // --- Parallax background layers (disabled on single-page so background stays fixed) ---
  var bgGradient = document.getElementById("bg-gradient");
  var bgGrid = document.getElementById("bg-grid");
  var bgDots = document.querySelector(".bg-dots");
  var isSinglePage = document.body.classList.contains("page-single");
  if ((bgGradient || bgGrid || bgDots) && !isSinglePage) {
    function updateParallax() {
      var y = window.scrollY;
      var t1 = "translateY(" + y * 0.2 + "px)";
      var t2 = "translateY(" + y * 0.12 + "px)";
      var t3 = "translateY(" + y * 0.08 + "px)";
      if (bgGradient) bgGradient.style.transform = t1;
      if (bgGrid) bgGrid.style.transform = t2;
      if (bgDots) bgDots.style.transform = t3;
    }
    window.addEventListener("scroll", function () { requestAnimationFrame(updateParallax); });
    updateParallax();
  }
  if (isSinglePage && (bgGrid || bgDots)) {
    if (bgGrid) bgGrid.style.transform = "none";
    if (bgDots) bgDots.style.transform = "none";
  }

  // --- Single-page: very subtle scroll parallax on gradient (depth) ---
  if (isSinglePage && bgGradient) {
    function parallaxGradient() {
      var y = window.scrollY * 0.04;
      bgGradient.style.transform = "translateY(" + y + "px)";
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.addEventListener("scroll", function () {
        requestAnimationFrame(parallaxGradient);
      });
      parallaxGradient();
    }
  }

  // --- Section reveal on scroll (Intersection Observer) ---
  var sections = document.querySelectorAll(".page-single .section[id]");
  function revealSectionIfVisible(sec) {
    var r = sec.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    if (r.top < vh * 0.9 && r.bottom > vh * 0.05) sec.classList.add("revealed");
  }
  function revealAllVisibleSections() {
    sections.forEach(revealSectionIfVisible);
  }
  if (sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.03 }
    );
    sections.forEach(function (sec) {
      observer.observe(sec);
    });
    // #home has class "revealed" in HTML; reveal anything already in view (restore scroll, wide screens).
    requestAnimationFrame(function () {
      requestAnimationFrame(revealAllVisibleSections);
    });
    window.addEventListener("load", revealAllVisibleSections);
  }

  // Typewriter effect on Home (always shows text as it types)
  var typewriters = document.querySelectorAll(".typewriter[data-text]");
  if (typewriters.length) {
    var delay = 90;
    function runTypewriter(el, text, done) {
      el.textContent = "";
      var i = 0;
      function tick() {
        if (i < text.length) {
          el.textContent += text[i];
          i++;
          setTimeout(tick, delay);
        } else if (done) done();
      }
      tick();
    }
    runTypewriter(typewriters[0], typewriters[0].getAttribute("data-text"), function () {
      if (typewriters[1]) {
        setTimeout(function () {
          runTypewriter(typewriters[1], typewriters[1].getAttribute("data-text"));
        }, 300);
      }
    });
  }

  var navHeight = 56;

  /** Scroll position: Education’s # block is tall (min-height); align .education-inner to viewport center below nav. */
  function scrollTopForEducation() {
    var section = document.getElementById("education");
    var inner = section ? section.querySelector(".education-inner") : null;
    var focus = inner || section;
    if (!focus) return 0;
    var rect = focus.getBoundingClientRect();
    var elTop = rect.top + window.scrollY;
    var elH = rect.height;
    var padTop = navHeight + 20;
    var availH = window.innerHeight - padTop;
    // Center the inner block in the visible area
    var top = elTop - padTop - Math.max(0, (availH - elH) / 2);
    if (elH > availH - 40) {
      top = elTop - padTop;
    }
    return Math.max(0, top);
  }

  function scrollToSection(id) {
    var target = id ? document.getElementById(id) : null;
    if (!target) return;
    target.classList.add("revealed");
    if (id === "education") {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          window.scrollTo({ top: scrollTopForEducation(), behavior: "smooth" });
        });
      });
      return;
    }
    var rect = target.getBoundingClientRect();
    var top = Math.max(0, rect.top + window.scrollY - (navHeight + 10));
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  // Ensure hash-based navigation never lands on a hidden section.
  function revealHashTarget() {
    var hash = window.location.hash ? window.location.hash.slice(1) : "";
    if (!hash) return;
    var target = document.getElementById(hash);
    if (target) {
      target.classList.add("revealed");
      if (hash === "education") {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            window.scrollTo({ top: scrollTopForEducation(), behavior: "auto" });
          });
        });
      } else {
        var rect = target.getBoundingClientRect();
        var top = Math.max(0, rect.top + window.scrollY - (navHeight + 10));
        window.scrollTo({ top: top, behavior: "auto" });
      }
    }
  }
  window.addEventListener("hashchange", revealHashTarget);
  revealHashTarget();

  // Smooth scroll for anchor links (offset handled by scroll-margin-top in CSS)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = this.getAttribute("href").slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        scrollToSection(id);
      }
    });
  });

  // Single-page: section order for prev/next and section selector
  var sectionIds = ["home", "about", "education", "experience", "publications", "projects", "skills", "contact"];
  var sectionsWithId = document.querySelectorAll(".section[id]");
  var isSinglePage = document.body.classList.contains("page-single") && sectionsWithId.length > 0;

  if (isSinglePage) {
    var navLinks = document.querySelectorAll(".nav-links a");
    var sectionSelect = document.getElementById("section-select");
    var arrowPrev = document.getElementById("arrow-prev");
    var arrowNext = document.getElementById("arrow-next");

    function getCurrentSectionIndex() {
      var scrollY = window.scrollY;
      for (var i = 0; i < sectionIds.length; i++) {
        var el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        var top = el.offsetTop - navHeight;
        var height = el.offsetHeight;
        if (scrollY >= top && scrollY < top + height) return i;
        if (scrollY < top) return i > 0 ? i - 1 : 0;
      }
      return sectionIds.length - 1;
    }

    function updateActiveNav() {
      var idx = getCurrentSectionIndex();
      var currentId = sectionIds[idx];
      navLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentId) link.classList.add("active");
      });
      if (sectionSelect && sectionSelect.value !== currentId) sectionSelect.value = currentId;
      if (arrowPrev) {
        arrowPrev.href = idx > 0 ? "#" + sectionIds[idx - 1] : "#";
        arrowPrev.classList.toggle("no-prev", idx === 0);
      }
      if (arrowNext) {
        arrowNext.href = idx < sectionIds.length - 1 ? "#" + sectionIds[idx + 1] : "#";
        arrowNext.classList.toggle("no-next", idx === sectionIds.length - 1);
      }
    }

    window.addEventListener("scroll", function () { requestAnimationFrame(updateActiveNav); });
    updateActiveNav();

    if (sectionSelect) {
      sectionSelect.addEventListener("change", function () {
        scrollToSection(sectionSelect.value);
      });
    }

    if (arrowPrev) {
      arrowPrev.addEventListener("click", function (e) {
        var idx = getCurrentSectionIndex();
        if (idx > 0) {
          e.preventDefault();
          scrollToSection(sectionIds[idx - 1]);
        }
      });
    }
    if (arrowNext) {
      arrowNext.addEventListener("click", function (e) {
        var idx = getCurrentSectionIndex();
        if (idx < sectionIds.length - 1) {
          e.preventDefault();
          scrollToSection(sectionIds[idx + 1]);
        }
      });
    }
  }

  // --- Theme toggle (dark/light) ---
  var themeToggle = document.getElementById("theme-toggle");
  var THEME_KEY = "portfolio-theme";
  function getStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function setTheme(theme) {
    var doc = document.documentElement;
    if (theme === "light") doc.setAttribute("data-theme", "light");
    else doc.removeAttribute("data-theme");
    try { localStorage.setItem(THEME_KEY, theme || "dark"); } catch (e) {}
  }
  function initTheme() {
    var stored = getStoredTheme();
    if (stored === "light") setTheme("light");
    else setTheme("dark");
  }
  initTheme();
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var isLight = document.documentElement.getAttribute("data-theme") === "light";
      setTheme(isLight ? "dark" : "light");
    });
  }

  // --- Contact form (Formspree) ---
  var contactForm = document.getElementById("contact-form");
  var formStatus = document.getElementById("contact-form-status");
  var formSuccess = document.getElementById("contact-form-success");
  var sendAnotherBtn = document.getElementById("contact-form-send-another");
  function showContactSuccess() {
    if (contactForm) contactForm.classList.add("contact-form-sent");
    if (formSuccess) formSuccess.removeAttribute("hidden");
  }
  function hideContactSuccess() {
    if (contactForm) contactForm.classList.remove("contact-form-sent");
    if (formStatus) { formStatus.textContent = ""; formStatus.className = "contact-form-status"; }
    if (formSuccess) formSuccess.setAttribute("hidden", "");
  }
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector(".contact-form-submit");
      if (submitBtn) submitBtn.disabled = true;
      if (formStatus) formStatus.textContent = "Sending...";
      if (formSuccess) formSuccess.setAttribute("hidden", "");
      var formData = new FormData(contactForm);
      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then(function (r) {
          if (r.ok) {
            contactForm.reset();
            showContactSuccess();
          } else {
            if (formStatus) { formStatus.textContent = "Something went wrong. Please try again or email directly."; formStatus.className = "contact-form-status error"; }
          }
        })
        .catch(function () {
          if (formStatus) { formStatus.textContent = "Network error. Please try again or email directly."; formStatus.className = "contact-form-status error"; }
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
  if (sendAnotherBtn) sendAnotherBtn.addEventListener("click", hideContactSuccess);

  // --- Micro-interactions: hero cursor trail + magnetic CTAs (fine pointer only) ---
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!reducedMotion && finePointer) {
    var hero = document.querySelector("#home.hero");
    var trailLayer = document.getElementById("hero-cursor-trail");
    if (hero && trailLayer) {
      var trailMax = 28;
      var lastTx = 0;
      var lastTy = 0;
      var lastT = 0;
      hero.addEventListener(
        "pointermove",
        function (e) {
          var now = performance.now();
          var dx = e.clientX - lastTx;
          var dy = e.clientY - lastTy;
          if (now - lastT < 45 && dx * dx + dy * dy < 36) return;
          lastT = now;
          lastTx = e.clientX;
          lastTy = e.clientY;
          var rect = hero.getBoundingClientRect();
          var dot = document.createElement("span");
          dot.className = "hero-trail-dot";
          dot.style.left = e.clientX - rect.left + "px";
          dot.style.top = e.clientY - rect.top + "px";
          trailLayer.appendChild(dot);
          while (trailLayer.children.length > trailMax) {
            trailLayer.removeChild(trailLayer.firstChild);
          }
          window.setTimeout(function () {
            if (dot.parentNode === trailLayer) trailLayer.removeChild(dot);
          }, 800);
        },
        { passive: true }
      );
    }

    function initMagnetic(selector, strength, maxPx) {
      strength = strength == null ? 0.2 : strength;
      maxPx = maxPx == null ? 10 : maxPx;
      document.querySelectorAll(selector).forEach(function (btn) {
        var inner = btn.querySelector(".magnetic-cta-inner");
        if (!inner) return;
        btn.addEventListener("pointermove", function (e) {
          var r = btn.getBoundingClientRect();
          var mx = e.clientX - (r.left + r.width / 2);
          var my = e.clientY - (r.top + r.height / 2);
          var x = Math.max(-maxPx, Math.min(maxPx, mx * strength));
          var y = Math.max(-maxPx, Math.min(maxPx, my * strength));
          inner.style.transform = "translate(" + x + "px," + y + "px)";
        });
        btn.addEventListener("pointerleave", function () {
          inner.style.transform = "";
        });
      });
    }
    initMagnetic(".magnetic-cta", 0.22, 10);
  }
})();
