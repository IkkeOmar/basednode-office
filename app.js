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
  /* Records where a nav click was heading, so the destination page can
     show the landing bar even when the fragment is applied by the
     browser rather than by a load event. */
  var NAV_INTENT_KEY = "bn-nav-intent";

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

/* ---------------- Scroll reveal ---------------- */

  /* Elements marked with [data-reveal] fade up into place the first time
     they scroll into view. Without this the site is completely static:
     a reader who lands mid-page (from a nav anchor) gets no signal that
     the page is alive.

     Two rules keep this from being annoying:

       * The reveal is driven by an IntersectionObserver, not a scroll
         handler, so it costs nothing while the page sits still.
       * Anything already on screen when the page loads reveals
         IMMEDIATELY, with no animation delay. A reader who clicks a nav
         link and lands on a section that is already in view must not
         have to wait for it to fade in — that is the "the page vanished"
         feeling.

     Elements stay visible if JavaScript never runs: the hidden state is
     applied by a class that JS adds, not by CSS alone. */

  var revealTargets = null;
  var groupCounter = 0;

  function initReveal() {
    revealTargets = Array.prototype.slice.call(
      document.querySelectorAll("[data-reveal]")
    );
    if (!revealTargets.length) return;

    /* The hidden state is applied by the inline head script (html.js +
       [data-reveal]), so there is no flash of visible-then-hidden
       content. Here we simply take responsibility for it: the fallback
       timer that would force everything visible is cancelled, because
       from now on the observer is in charge. */
    if (window.__bnRevealFallback) {
      clearTimeout(window.__bnRevealFallback);
      window.__bnRevealFallback = null;
    }

    /* No observer support, or reduced motion: show everything. */
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      revealTargets.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    /* Stagger: siblings inside a shared group come in one after another
       instead of all at once, so a row of cards unfurls rather than
       popping as a single block. The group is the element's parent, so
       two different sections stagger independently. */
    var byGroup = {};
    revealTargets.forEach(function (el) {
      var group = el.parentNode;
      var key = group && group.getAttribute ? group.getAttribute("data-reveal-group") : null;
      if (!key) {
        /* No explicit group: use the parent element itself as the group. */
        if (!group || !group.getAttribute) return;
        key = "__parent" + (group.__bnGroupId || (group.__bnGroupId = ++groupCounter));
      }
      (byGroup[key] = byGroup[key] || []).push(el);
    });

    Object.keys(byGroup).forEach(function (key) {
      byGroup[key].forEach(function (el, i) {
        /* Cap the stagger: a list of nine should not take a second and a
           half to finish coming in. */
        var delay = Math.min(i, 6) * 70;
        el.style.setProperty("--reveal-delay", delay + "ms");
        el.setAttribute("data-reveal-delay", delay + "ms");
      });
    });

    /* Anything already within the viewport (plus a small margin) reveals
       straight away. This is the case that matters: a nav anchor jump
       lands the reader directly on content that is already on screen,
       and it must not stay invisible.

       The measurement has to happen AFTER the hidden class is applied
       but BEFORE the observer starts, and the threshold has to be
       generous: an element whose top is just below the fold still
       counts as visible to the reader scrolling down. */
    var vh = window.innerHeight;
    revealTargets.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add("is-revealed");
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        io.unobserve(entry.target);
      });
    }, {
      /* Fire a little before the element reaches the bottom edge, so the
         motion has finished by the time it is properly in view. */
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.01,
    });

    var pending = revealTargets.filter(function (el) {
      return !el.classList.contains("is-revealed");
    });
    pending.forEach(function (el) { io.observe(el); });

    /* The sweep. The observer alone is not enough: with
       scroll-behavior: smooth a programmatic scroll can move past an
       element between two observer callbacks, and a short element that
       is only briefly on screen can be missed entirely. Either way the
       element stays at opacity 0 — which is invisible content, and
       invisible content is the one failure mode a reveal system must
       never have.

       So on every scroll frame we check the pending elements directly.
       The list shrinks as elements are revealed, so the work per frame
       goes to zero as the reader moves down the page. */
    var sweep = function () {
      var vh = window.innerHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var el = pending[i];
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0) {
          el.classList.add("is-revealed");
          io.unobserve(el);
          pending.splice(i, 1);
        }
      }
    };

    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        sweep();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    /* Belt and braces: after five seconds, reveal anything still
       pending. A reader who has not scrolled that far has not seen the
       content anyway, and a reader who has gets it regardless of what
       the observer did. */
    setTimeout(function () {
      pending.forEach(function (el) { el.classList.add("is-revealed"); });
      pending.length = 0;
    }, 5000);
  }

  /* ---------------- Anchor landing ---------------- */

  /* Jumping to an anchor lands the reader in the middle of a page with
     the page's own heading far above the fold. The reader sees a section
     with no context and no title, which reads as the page having
     vanished.

     The fix: when the page is loaded at an anchor, a slim bar appears
     at the top of the viewport naming the page you are on and the
     section you jumped to. It is not a modal and not a banner that
     pushes content down — it sits over the top of the page and fades
     itself out after a few seconds.

     It only appears for a REAL cross-page or cross-section jump. A
     reader who simply scrolls does not get it, and the page's own
     headline is used as the label when there is no section title. */

  /* Show the landing bar for an anchor arrival.

     It has to fire in BOTH cases:
       * the page is LOADED at a fragment (a direct link, or a bookmark)
       * the reader CLICKS a nav link that changes the fragment

     The second case is the common one and the easy one to miss: the
     page does not reload, so a load-time hook never runs. The reader
     clicks "How it works", the page scrolls, and they are dropped into
     the middle of a page with no context — which is exactly the
     "the page vanished" feeling.

     So the bar is shown on load, on hashchange, and on any nav click
     that lands on a fragment. */
  function showAnchorLanding(hash) {
    if (!hash || hash.length < 2) return;

    var target = null;
    try {
      target = document.querySelector(hash);
    } catch (e) {
      return; /* a malformed hash throws in querySelector */
    }
    if (!target) return;

    var old = document.querySelector(".anchor-bar");
    if (old && old.parentNode) old.parentNode.removeChild(old);

    /* The section's own label is the most honest label. The micro-label
       carries the section number ("§ 02 — How it works"), so it is used
       on its own; if there is none, the heading is used. The two
       together read as "§ 02 — How it works / Four steps...", which is
       noise. */
    var label = "";
    var micro = target.querySelector(".micro-label");
    if (micro) {
      label = micro.textContent.trim();
    } else {
      var head = target.querySelector("h2, h3");
      if (head) label = head.textContent.trim();
    }

    var pageLabel = document.title.replace(/\s+[—–-]\s+BasedNode\s*$/, "").trim();

    var bar = document.createElement("div");
    bar.className = "anchor-bar";
    bar.setAttribute("role", "status");
    bar.innerHTML =
      '<span class="anchor-bar__page"></span>' +
      '<span class="anchor-bar__sep" aria-hidden="true">/</span>' +
      '<span class="anchor-bar__section"></span>';
    bar.querySelector(".anchor-bar__page").textContent = pageLabel;
    bar.querySelector(".anchor-bar__section").textContent = label || pageLabel;

    document.body.appendChild(bar);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bar.classList.add("is-visible"); });
    });

    var hide = function () {
      bar.classList.remove("is-visible");
      setTimeout(function () {
        if (bar.parentNode) bar.parentNode.removeChild(bar);
      }, 500);
    };

    /* Dismiss on scroll, on a click, or after a while — whichever first.
       It is orientation, not an obstruction. */
    var dismissed = false;
    var dismiss = function () {
      if (dismissed) return;
      dismissed = true;
      hide();
    };

    /* The browser performs its own fragment scroll AFTER the click, and
       because the site sets `scroll-behavior: smooth`, that jump is
       animated over roughly half a second. A bar that dismisses on
       scroll would therefore flash and vanish during the jump itself.

       So the scroll-dismiss handler is armed only after the jump has had
       time to finish. Until then the bar can only be dismissed by a
       click or by its own timeout. */
    setTimeout(function () {
      window.addEventListener("scroll", dismiss, { once: true, passive: true });
    }, 1500);

    window.addEventListener("click", dismiss, { once: true });
    setTimeout(dismiss, 7000);
  }

  function initAnchorLanding() {
    /* Load with a fragment. */
    if (location.hash) showAnchorLanding(location.hash);

    /* A nav click that changes the fragment does not reload the page, so
       the load-time hook above never runs for it. Listen for the click
       itself.

       Two cases, and they need different handling:

         Same-page fragment ("#how"): the page does NOT reload, so the
         bar is created here, a moment after the browser has started
         scrolling. Creating it too early puts it over the old scroll
         position, and the page then moves out from under it.

         Another page with a fragment ("services#how"): the page DOES
         reload, so a bar created here would be destroyed by the
         navigation. The intent is written to sessionStorage instead,
         and the destination page picks it up on load. That survives a
         bfcache restore, where the load event never fires at all. */

    document.addEventListener("click", function (e) {
      var link = e.target.closest("a[href]");
      if (!link) return;
      var href = link.getAttribute("href") || "";
      if (href.length < 2) return;
      if (link.hasAttribute("download") || link.target === "_blank") return;

      var hash = href.charAt(0) === "#"
        ? href
        : (href.indexOf("#") > -1 ? "#" + href.split("#")[1] : "");
      if (!hash) return;

      /* A link to the fragment you are already at changes nothing. */
      if (hash === location.hash) return;

      var samePage = href.charAt(0) === "#";

      /* Record the intent for the destination page, whatever happens. */
      try {
        sessionStorage.setItem(NAV_INTENT_KEY, hash);
      } catch (e) {}

      if (!samePage) return; /* the destination will handle it */

      setTimeout(function () {
        if (location.hash === hash) showAnchorLanding(hash);
      }, 120);
    });

    /* The destination page: read the intent the click recorded. This
       runs on every load, including a bfcache restore where the load
       event does not fire. */
    var intended = null;
    try {
      intended = sessionStorage.getItem(NAV_INTENT_KEY);
      sessionStorage.removeItem(NAV_INTENT_KEY);
    } catch (e) {}

    if (intended && intended !== location.hash) {
      /* The browser may not have applied the fragment yet on a restored
         page, so the bar waits until the hash is actually in place. */
      var showWhenReady = function () {
        if (location.hash === intended) {
          showAnchorLanding(intended);
        } else {
          setTimeout(showWhenReady, 100);
        }
      };
      setTimeout(showWhenReady, 60);
    }

    /* The back button can also change the fragment without a reload. */
    window.addEventListener("hashchange", function () {
      showAnchorLanding(location.hash);
    });
  }

    /* Leaving the mobile breakpoint while open must not strand the
       body scroll lock or a visible panel on desktop. */
    var mq = window.matchMedia("(min-width: 900px)");
    var onBreakpoint = function (e) { if (e.matches) setMenuState(false); };
    if (mq.addEventListener) mq.addEventListener("change", onBreakpoint);
    else if (mq.addListener) mq.addListener(onBreakpoint);

    /* Motion and orientation. Both are no-ops when the browser says the
       reader does not want motion. */
    initReveal();
    initAnchorLanding();
  });
})();
