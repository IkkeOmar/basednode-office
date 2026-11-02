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

    /* Flow drawings are separate SVG files per language, because the text
       inside an SVG loaded via <img> cannot be swapped by the normal
       data-i18n mechanism. Each drawing is marked with data-flow="<id>" and
       the src is rebuilt for the active language. */
    document.querySelectorAll("[data-flow]").forEach(function (el) {
      var id = el.getAttribute("data-flow");
      el.setAttribute("src", "_assets/illustrations/flow-" + id + "-" + current + ".svg");
    });

    /* Contact topic buttons open a mail client with a subject line that
       is written in the page language. The subject string lives in the
       copy bundle, not in the DOM, so read it from the bundle. */
    document.querySelectorAll("[data-mail-subject]").forEach(function (el) {
      var key = el.getAttribute("data-mail-subject");
      var subject = t[key] || "";
      el.setAttribute("href", subject
        ? "mailto:omar@basednode.xyz?subject=" + encodeURIComponent(subject)
        : "mailto:omar@basednode.xyz");
    });
    document.documentElement.setAttribute("lang", current === "en" ? "en" : "da-DK");

    /* Language switch is a pair of flag buttons, one per language. The
       active one is in full colour and marked aria-pressed; the other is
       greyed out. Each button carries its own aria-label, so the label
       says what clicking THAT flag does, not what the toggle does. */
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      var target = b.getAttribute("data-lang-target");
      if (!target) return;
      var active = target === current;
      b.setAttribute("aria-pressed", active ? "true" : "false");
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-label", target === "en" ? "Show in English" : "Vis på dansk");
    });

    var desc = document.querySelector('meta[name="description"]');
    var title = document.querySelector("title");
    if (t._meta_description && desc) desc.setAttribute("content", t._meta_description);
    if (t._page_title && title) title.textContent = t._page_title;
  }

  function toggleLang() {
    applyLang(current === "en" ? "da" : "en");
  }

  /* The header switch is two separate flag buttons, each naming the
     language it selects. A button for the language already active is a
     no-op rather than a toggle, so clicking the visible flag never
     flips the language out from under the reader. */
  function selectLang(lang) {
    applyLang(lang === "da" ? "da" : "en");
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
      if (lang) {
        var target = lang.getAttribute("data-lang-target");
        if (target) { selectLang(target); return; }
        toggleLang();
        return;
      }
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

    /* ---------------- Contact topics ----------------
       Each topic on the contact page expands to a ready-to-use email
       template. The template text lives in the i18n bundle, so it
       follows the page language. */

    document.querySelectorAll(".topic__head").forEach(function (head) {
      head.addEventListener("click", function () {
        var open = head.getAttribute("aria-expanded") === "true";
        head.setAttribute("aria-expanded", open ? "false" : "true");
        var body = document.getElementById(head.getAttribute("aria-controls"));
        if (body) body.hidden = open;
      });
    });

    /* Copy to clipboard. The button text flips to "Copied" for two
       seconds so the click is confirmed without an alert. */
    function copyToClipboard(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }
      /* Fallback for browsers without the async clipboard API. */
      return new Promise(function (resolve, reject) {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          resolve();
        } catch (e) {
          reject(e);
        } finally {
          document.body.removeChild(ta);
        }
      });
    }

    function flashCopied(btn) {
      var original = btn.getAttribute("data-label-original");
      if (original === null) {
        original = btn.textContent;
        btn.setAttribute("data-label-original", original);
      }
      var copiedLabel = btn.getAttribute("data-label-copied");
      if (!copiedLabel) {
        var lbl = document.querySelector('[data-i18n="ct_copied"]');
        copiedLabel = lbl ? lbl.textContent : "Copied";
      }
      btn.textContent = copiedLabel;
      btn.classList.add("is-copied");
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove("is-copied");
      }, 2000);
    }

    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-copy-text]");
      if (btn) {
        var key = btn.getAttribute("data-copy-text");
        var el = document.querySelector('[data-i18n="' + key + '"]');
        if (el) {
          copyToClipboard(el.textContent || "").then(function () {
            flashCopied(btn);
          }).catch(function () {});
        }
        return;
      }

    });

    /* Leaving the mobile breakpoint while open must not strand the
       body scroll lock or a visible panel on desktop. */
    var mq = window.matchMedia("(min-width: 900px)");
    var onBreakpoint = function (e) { if (e.matches) setMenuState(false); };
    if (mq.addEventListener) mq.addEventListener("change", onBreakpoint);
    else if (mq.addListener) mq.addListener(onBreakpoint);
  });
})();
