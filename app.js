/* BasedNode — language switch and mobile menu.
   Front-end only: no login, no backend, no tracking.

   The copy for both languages is generated into i18n.js by build/build.py,
   namespaced per page: window.BN_I18N[page][lang][key]. The toggle reads
   the current page from <body data-page> and swaps every data-i18n slot
   in place. */

(function () {
  "use strict";

  /* ---------------- Translations ---------------- */

  var STORAGE_KEY = "bn-lang";

  function currentPage() {
    return document.body.getAttribute("data-page") || "home";
  }

  function table() {
    var all = window.BN_I18N || {};
    var page = currentPage();
    return all[page] || all.home || { en: {}, da: {} };
  }

  var current = "en";

  /* ---------------- Language ---------------- */

  var current = "en";

  function applyLang(lang) {
    current = lang === "da" ? "da" : "en";
    try { localStorage.setItem(STORAGE_KEY, current); } catch (e) {}
    var t = table()[current] || {};

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (t[k] !== undefined) el.textContent = t[k];
    });
    document.querySelectorAll("[data-lang-label]").forEach(function (el) {
      el.textContent = current === "en" ? "DA" : "EN";
    });

    /* Flow drawings are separate SVG files per language, because the text
       inside an SVG loaded via <img> cannot be swapped by the normal
       data-i18n mechanism. Each drawing is marked with data-flow="<id>" and
       the src is rebuilt for the active language. */
    document.querySelectorAll("[data-flow]").forEach(function (el) {
      var id = el.getAttribute("data-flow");
      el.setAttribute("src", "_assets/illustrations/flow-" + id + "-" + current + ".svg");
    });
    document.documentElement.setAttribute("lang", current === "en" ? "en" : "da-DK");
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      b.setAttribute("aria-label", current === "en" ? "Vis på dansk" : "Show in English");
    });

    var desc = document.querySelector('meta[name="description"]');
    var title = document.querySelector("title");
    if (t._meta_description && desc) desc.setAttribute("content", t._meta_description);
    if (t._page_title && title) title.textContent = t._page_title;
  }

  function toggleLang() {
    applyLang(current === "en" ? "da" : "en");
  }

  /* ---------------- Mobile menu ---------------- */

  /* The panel is fixed to the header (position: fixed; top: var(--header-h)),
     so opening it must:
       - flip aria-hidden on the panel and the button
       - set body.nav-open so the page behind cannot scroll
       - show the scrim and allow a tap outside to close it
     Everything else (opacity, visibility, transform) is CSS-driven. */

  function setMenuState(open) {
    var menu = document.querySelector("[data-mobile-menu]");
    var btn = document.querySelector("[data-menu-btn]");
    var scrim = document.querySelector("[data-nav-scrim]");
    if (!menu) return;

    menu.setAttribute("aria-hidden", open ? "false" : "true");
    if (btn) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    document.body.classList.toggle("nav-open", open);

    if (scrim) {
      if (open) {
        scrim.hidden = false;
        // next frame, so the transition actually runs
        requestAnimationFrame(function () {
          scrim.classList.add("is-visible");
        });
      } else {
        scrim.classList.remove("is-visible");
        scrim.hidden = true;
      }
    }
  }

  function isMenuOpen() {
    var menu = document.querySelector("[data-mobile-menu]");
    return !!menu && menu.getAttribute("aria-hidden") === "false";
  }

  function toggleMobileMenu() {
    setMenuState(!isMenuOpen());
  }

  /* ---------------- Wire up ---------------- */

  document.addEventListener("DOMContentLoaded", function () {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (!stored) {
      var nav = (navigator.language || "en").toLowerCase();
      stored = nav.indexOf("da") === 0 ? "da" : "en";
    }
    applyLang(stored);

    document.addEventListener("click", function (e) {
      var lang = e.target.closest("[data-lang-toggle]");
      if (lang) { toggleLang(); return; }
      var menu = e.target.closest("[data-menu-btn]");
      if (menu) { toggleMobileMenu(); return; }
      var scrim = e.target.closest("[data-nav-scrim]");
      if (scrim) { setMenuState(false); return; }
      var link = e.target.closest(".mobile-menu a");
      if (link) { setMenuState(false); }
    });

    /* Escape closes the panel */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isMenuOpen()) setMenuState(false);
    });

    /* Leaving the mobile breakpoint while open must not strand the
       body scroll lock or a visible panel on desktop. */
    var mq = window.matchMedia("(min-width: 900px)");
    var onBreakpoint = function (e) { if (e.matches) setMenuState(false); };
    if (mq.addEventListener) mq.addEventListener("change", onBreakpoint);
    else if (mq.addListener) mq.addListener(onBreakpoint);
  });
})();
