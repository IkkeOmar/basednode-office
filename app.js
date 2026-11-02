/* BasedNode — language switch and mobile menu.
   Front-end only: no login, no backend, no tracking. */

(function () {
  "use strict";

  /* ---------------- Translations ---------------- */

  var TEXT = {
    en: {
      nav_services: "What I build",
      nav_how: "How it works",
      nav_pricing: "Pricing",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      nav_cta: "Talk to me",

      hero_eyebrow: "AI & automation studio · Copenhagen",
      hero_title: "Invoicing, bookkeeping and admin. Automated.",
      hero_sub:
        "I build the software that runs the repetitive part of a small company: reading incoming invoices, posting them to the ledger, following up on leads, and answering the same customer question fifty times. You get a working system, documented, that you own.",
      hero_cta1: "See what I build",
      hero_cta2: "Talk to me",
      hero_hint:
        "Fixed price or revenue share. Code, documentation and data stay yours. No lock-in, and nothing to log into.",

      drawing_name: "Invoice in, booked, done",
      drawing_spec:
        "Supplier PDF read, VAT split, posted to account 5700. 4.5 minutes of manual work becomes zero.",
      drawing_link: "See what it costs →",

      s1_label: "§ 01 — What I build",
      s1_title: "Seven things I build. Most companies need two.",
      s1_desc:
        "Each one is a piece of software that runs on its own after I hand it over. You do not need all seven. Most people start with the first one, feel the difference in a week, and come back for the second.",

      svc1_name: "AI agents",
      svc1_lead: "Answers support questions from your own documents",
      svc1_price: "from 8,500 DKK",
      svc2_name: "Workflow automation",
      svc2_lead: "Invoices, mail routing, approvals, reminders",
      svc2_price: "from 12,000 DKK",
      svc3_name: "Data pipelines",
      svc3_lead: "Your data from five systems, cleaned and joined",
      svc3_price: "from 9,000 DKK",
      svc4_name: "Cost work",
      svc4_lead: "Same result, smaller model bill",
      svc4_price: "from 4,000 DKK",
      svc5_name: "Dashboards and internal tools",
      svc5_lead: "One screen with the numbers, askable in plain Danish",
      svc5_price: "from 15,000 DKK",
      svc6_name: "Marketing automation",
      svc6_lead: "Every lead followed up, without a spreadsheet",
      svc6_price: "from 7,000 DKK",
      svc7_name: "Full AI products",
      svc7_lead: "An app built from scratch, for a fixed price or a share",
      svc7_price: "from 30,000 DKK",

      s2_label: "§ 02 — How it works",
      s2_title: "Three things you get that a template does not give you.",
      s2_desc:
        "Not because anyone else is bad at this. Because a template was never written for your week, your systems, or your way of working.",

      wedge1_label: "Wedge 01 / 03",
      wedge1_title: "You own it.",
      wedge1_desc:
        "The code sits in your accounts, the documentation is written for you, and the data stays with you. If we stop working together, nothing breaks and nobody has to ask permission to keep it running.",
      wedge1_meta: "Your accounts · Your data · Your copy",
      wedge2_label: "Wedge 02 / 03",
      wedge2_title: "Plain language, no theatre.",
      wedge2_desc:
        "You will not get a slide deck about how AI is changing everything. You get a screen that does the job, and a number to call when it does something you did not expect.",
      wedge2_meta: "Documented · Explained · Runnable by you",
      wedge3_label: "Wedge 03 / 03",
      wedge3_title: "Scope before price.",
      wedge3_desc:
        "We agree on exactly what the system does before I quote it. If the scope changes, the price changes with it, in writing. No surprise invoice in month three.",
      wedge3_meta: "Written scope · Fixed price · Change log",

      moment_heading: "One project, one price. This is what a typical automation looks like.",
      moment_sub:
        "The order that takes two hours to place anywhere else, itemised here so you can see what you are paying for.",
      m_item1: "1 × Setup: invoice to ledger, installed",
      m_item2: "1 × Agent answering from your own documents",
      m_item3: "4 × Connections (CRM, ERP, mail, storage)",
      m_item4: "1 × Running and monitoring, 12 months",
      m_total: "Total: 30,100 DKK · excl. VAT · delivered in 3 weeks",
      moment_cta: "Get a price for yours",

      stat1_label: "Projects delivered",
      stat1_note: "since 2019, across finance, retail, education and logistics",
      stat2_label: "Client satisfaction",
      stat2_note: "measured on projects that ran longer than one month",
      stat3_label: "Model cost reduction",
      stat3_note: "on the API-heavy systems I took over from other teams",
      stat4_label: "Fixed price from",
      stat4_note: "one small, finished thing, delivered and documented",

      tech_lead: "I work with",

      s3_label: "§ 03 — The promise",
      promise: "The code, the documentation and the data are yours. I build it, you own it.",
      promise_sub:
        "Not a trial, not a rented platform, not a login I keep the keys to. If you decide to take it in-house, the handover is a folder with everything in it and a call where I walk you through it.",
      promise_cta: "Start with one problem →",

      s4_label: "§ 04 — Pricing",
      pricing_title: "Three ways to pay. One of them will fit.",
      pricing_sub:
        "I would rather you pick the one that makes sense for your week than the one that sounds biggest.",

      plan1_name: "Fixed price",
      plan1_desc:
        "We agree on what the system does, and it costs that. Best for one clear problem with a clear finish line.",
      plan1_i1: "Written scope before work starts",
      plan1_i2: "Fixed price, change log if scope moves",
      plan1_i3: "Documented handover",
      plan2_name: "Revenue share",
      plan2_desc:
        "A percentage of what the system actually brings in. Best when the value is real but hard to price up front.",
      plan2_i1: "Smaller upfront cost",
      plan2_i2: "I stay on it while it runs",
      plan2_i3: "Reporting on what it produced",
      plan3_name: "Partnership",
      plan3_desc:
        "I build the product, you bring the market and the customers. We split what comes in.",
      plan3_i1: "For early-stage products",
      plan3_i2: "Reduced cash retainer",
      plan3_i3: "Agreement in writing, up front",

      pricing_note:
        "All prices exclude VAT. Every engagement starts with a free 30-minute call, and I will tell you on that call if I am the wrong person for it.",

      s5_label: "§ 05 — Questions",
      faq_title: "The five questions everyone asks first.",
      faq1_q: "How long does a project take?",
      faq1_a:
        "Two to eight weeks, depending on scope. The first working version is usually live inside three weeks, because I would rather show you something running than describe it.",
      faq2_q: "Do I have to replace the systems I already use?",
      faq2_a:
        "Usually not. Most of the work is connecting what you already have — your ERP, your CRM, your mail — and removing the manual step in between. Nothing gets ripped out unless you want it to.",
      faq3_q: "What does it cost?",
      faq3_a:
        "It depends on scope, and I will not guess from a website form. After the first call you get a written scope and a fixed price, so you can compare it against doing nothing.",
      faq4_q: "Who owns the code and the data?",
      faq4_a:
        "You do, from day one. Everything is delivered in your own accounts, with documentation written for someone who has not seen the code before.",
      faq5_q: "Do you work with companies outside Denmark?",
      faq5_a:
        "Yes. The work is remote, and I have delivered for teams in Denmark, Germany and Sweden. Everything is in English and Danish, so nothing gets lost in translation.",

      s6_label: "§ 06 — Start",
      contact_title: "Tell me what is slow in your week.",
      contact_sub:
        "One call, thirty minutes, no slides. We look at your week, and I tell you whether I can help — and if I cannot, I will say who can.",
      contact_cta1: "Write to me",
      contact_cta2: "Book 30 minutes",

      footer_desc: "Automation for the repetitive half of running a company. Copenhagen.",
      foot_col1: "What I build",
      foot_col2: "How it works",
      foot_col3: "Company",
      foot_email: "Write to me",
      foot_terms: "Terms",
      foot_privacy: "Privacy"
    },

    da: {
      nav_services: "Hvad jeg bygger",
      nav_how: "Sådan foregår det",
      nav_pricing: "Priser",
      nav_faq: "Spørgsmål",
      nav_contact: "Kontakt",
      nav_cta: "Skriv til mig",

      hero_eyebrow: "AI & automatisering · København",
      hero_title: "Regning, bogholdering og administration. Automatiseret.",
      hero_sub:
        "Jeg bygger den software, der klarer det repetitive i en mindre virksomhed: læser indgående regninger, bogfører dem, følger op på leads og svarer på det samme kundespørgsmål halvtreds gange. Du får et fungerende system, dokumenteret, som du ejer.",
      hero_cta1: "Se hvad jeg bygger",
      hero_cta2: "Skriv til mig",
      hero_hint:
        "Fast pris eller indtægtsdeling. Kode, dokumentation og data bliver dine. Ingen binding, og intet at logge ind i.",

      drawing_name: "Regning ind, bogført, færdig",
      drawing_spec:
        "Leverandør-PDF læst, moms fordelt, bogført på konto 5700. 4,5 minutters manuelt arbejde bliver til nul.",
      drawing_link: "Se hvad det koster →",

      s1_label: "§ 01 — Hvad jeg bygger",
      s1_title: "Syv ting jeg bygger. De fleste virksomheder har brug for to.",
      s1_desc:
        "Hver enkelt er et stykke software, der kører videre, efter jeg har afleveret det. Du har ikke brug for alle syv. De fleste starter med den første, mærker forskellen inden for en uge og kommer tilbage til den næste.",

      svc1_name: "AI-agenter",
      svc1_lead: "Svarer på supportspørgsmål ud fra dine egne dokumenter",
      svc1_price: "fra 8.500 DKK",
      svc2_name: "Workflow-automatisering",
      svc2_lead: "Regninger, mailrouting, godkendelser, påmindelser",
      svc2_price: "fra 12.000 DKK",
      svc3_name: "Datapipelines",
      svc3_lead: "Data fra fem systemer, renset og samlet",
      svc3_price: "fra 9.000 DKK",
      svc4_name: "Kostningsarbejde",
      svc4_lead: "Samme resultat, mindre modelregning",
      svc4_price: "fra 4.000 DKK",
      svc5_name: "Dashboards og interne værktøjer",
      svc5_lead: "Ét skærmbillede med tallene, spørgbart i almindeligt dansk",
      svc5_price: "fra 15.000 DKK",
      svc6_name: "Marketingautomatisering",
      svc6_lead: "Alle leads fulgt op, uden en regneark",
      svc6_price: "fra 7.000 DKK",
      svc7_name: "Fulde AI-produkter",
      svc7_lead: "En app bygget fra bunden, til fast pris eller andel",
      svc7_price: "fra 30.000 DKK",

      s2_label: "§ 02 — Sådan foregår det",
      s2_title: "Tre ting du får, som en skabelon ikke giver dig.",
      s2_desc:
        "Ikke fordi nogen anden er dårlig til det. Fordi en skabelon aldrig blev skrevet til din uge, dine systemer eller din måde at arbejde på.",

      wedge1_label: "Wedge 01 / 03",
      wedge1_title: "Du ejer det.",
      wedge1_desc:
        "Koden ligger i dine egne konti, dokumentationen er skrevet til dig, og data bliver hos dig. Hvis vi holder op med at samarbejde, går intet i stykker, og ingen skal bede om tilladelse for at holde det kørende.",
      wedge1_meta: "Dine konti · Dine data · Din kode",
      wedge2_label: "Wedge 02 / 03",
      wedge2_title: "Almindeligt sprog, ingen teater.",
      wedge2_desc:
        "Du får ikke en præsentation om, hvordan AI ændrer alt. Du får en skærm, der giver arbejdet, og et nummer at ringe til, når den gør noget uventet.",
      wedge2_meta: "Dokumenteret · Forklaret · Kan køres af dig",
      wedge3_label: "Wedge 03 / 03",
      wedge3_title: "Omfang før pris.",
      wedge3_desc:
        "Vi er enige om præcis, hvad systemet gør, før jeg giver et tilbud. Hvis omfanget ændrer sig, ændrer prisen sig med, skriftligt. Ingen overraskelsesregning i måned tre.",
      wedge3_meta: "Skriftligt omfang · Fast pris · Ændringslog",

      moment_heading: "Ét projekt, én pris. Sådan ser en typisk automatisering ud.",
      moment_sub:
        "Den ordre, der tager to timer at lægge hos alle andre, står her specificeret, så du kan se, hvad du betaler for.",
      m_item1: "1 × Opsætning: regning til bogføring, installeret",
      m_item2: "1 × Agent, der svarer ud fra dine egne dokumenter",
      m_item3: "4 × Forbindelser (CRM, ERP, mail, lager)",
      m_item4: "1 × Drift og overvågning, 12 måneder",
      m_total: "I alt: 30.100 DKK · ekskl. moms · leveret på 3 uger",
      moment_cta: "Få et tilbud på din",

      stat1_label: "Leverede projekter",
      stat1_note: "siden 2019, i finance, detailhandel, uddannelse og logistik",
      stat2_label: "Kundetilfredshed",
      stat2_note: "målt på projekter, der løb længere end en måned",
      stat3_label: "Reducerede modelomkostninger",
      stat3_note: "på de API-tunge systemer, jeg overtog fra andre teams",
      stat4_label: "Fast pris fra",
      stat4_note: "én lille, færdig ting, leveret og dokumenteret",

      tech_lead: "Jeg arbejder med",

      s3_label: "§ 03 — Løftet",
      promise: "Koden, dokumentationen og data er dine. Jeg bygger det, du ejer det.",
      promise_sub:
        "Ikke en prøveperiode, ikke en lejeplatform, ikke et login, jeg har nøglerne til. Hvis du beslutter at tage det ind i huset, er overdragelsen en mappe med alt i og et opkald, hvor jeg gennemgår det.",
      promise_cta: "Start med ét problem →",

      s4_label: "§ 04 — Priser",
      pricing_title: "Tre måder at betale på. En af dem passer.",
      pricing_sub:
        "Jeg hellere vil have dig vælge den, der passer din uge, end den der lyder størst.",

      plan1_name: "Fast pris",
      plan1_desc:
        "Vi er enige om, hvad systemet gør, og så koster det det. Bedst til ét klart problem med en klar slutpunkt.",
      plan1_i1: "Skriftligt omfang før arbejdet starter",
      plan1_i2: "Fast pris, ændringslog hvis omfanget flytter sig",
      plan1_i3: "Dokumenteret overdragelse",
      plan2_name: "Indtægtsdeling",
      plan2_desc:
        "En procentdel af, hvad systemet faktisk kommer ind. Bedst når værdien er reel, men svær at prissætte på forhånd.",
      plan2_i1: "Mindre pris upfront",
      plan2_i2: "Jeg bliver ved, mens det kører",
      plan2_i3: "Rapportering på, hvad det har produceret",
      plan3_name: "Partnerskab",
      plan3_desc:
        "Jeg bygger produktet, du kommer med markedet og kunderne. Vi deler det, der kommer ind.",
      plan3_i1: "Til produkter i tidlig fase",
      plan3_i2: "Reduceret kontant honorar",
      plan3_i3: "Aftale skriftligt fra starten",

      pricing_note:
        "Alle priser er ekskl. moms. Alle samarbejder starter med et gratis 30-minutters opkald, og på det opkald siger jeg dig, hvis jeg er den forkerte til opgaven.",

      s5_label: "§ 05 — Spørgsmål",
      faq_title: "De fem spørgsmål, alle spørger først.",
      faq1_q: "Hvor lang tid tager et projekt?",
      faq1_a:
        "To til otte uger, afhængigt af omfang. Den første fungerende version er som regel live inden for tre uger, fordi jeg hellere vil vise dig noget, der kører, end fortælle om det.",
      faq2_q: "Skal jeg erstatte de systemer, jeg allerede har?",
      faq2_a:
        "Som regel ikke. Det meste arbejde er at forbinde det, du allerede har — dit ERP, dit CRM, din mail — og fjerne det manuelle trin imellem. Intet bliver revet ud, medmindre du vil det.",
      faq3_q: "Hvad koster det?",
      faq3_a:
        "Det afhænger af omfang, og jeg gætter ikke ud fra en formular på en hjemmeside. Efter det første opkald får du et skriftligt omfang og en fast pris, så du kan sammenligne den med at gøre ingenting.",
      faq4_q: "Hvem ejer koden og data?",
      faq4_a:
        "Det gør du, fra dag ét. Alt leveres i dine egne konti, med dokumentation skrevet til nogen, der aldrig har set koden før.",
      faq5_q: "Arbejder du med virksomheder uden for Danmark?",
      faq5_a:
        "Ja. Arbejdet er remote, og jeg har leveret for teams i Danmark, Tyskland og Sverige. Alt foregår på engelsk og dansk, så intik går tabt i oversættelsen.",

      s6_label: "§ 06 — Start",
      contact_title: "Fortæl mig, hvad der er langsomt i din uge.",
      contact_sub:
        "Ét opkald, tredive minutter, ingen slides. Vi ser på din uge, og jeg fortæller dig, om jeg kan hjælpe — og hvis ikke, siger jeg, hvem der kan.",
      contact_cta1: "Skriv til mig",
      contact_cta2: "Book 30 minutter",

      footer_desc: "Automatisering af det repetitive halvdels af at drive virksomhed. København.",
      foot_col1: "Hvad jeg bygger",
      foot_col2: "Sådan foregår det",
      foot_col3: "Virksomhed",
      foot_email: "Skriv til mig",
      foot_terms: "Vilkår",
      foot_privacy: "Privatliv"
    }
  };

  /* ---------------- Language ---------------- */

  var STORAGE_KEY = "bn-lang";
  var current = "en";

  function applyLang(lang) {
    current = lang === "da" ? "da" : "en";
    try { localStorage.setItem(STORAGE_KEY, current); } catch (e) {}
    var t = TEXT[current];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (t[k] !== undefined) el.textContent = t[k];
    });
    document.querySelectorAll("[data-lang-label]").forEach(function (el) {
      el.textContent = current === "en" ? "DA" : "EN";
    });
    document.documentElement.setAttribute("lang", current === "da" ? "da-DK" : "en");
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      b.setAttribute("aria-label", current === "en" ? "Vis på dansk" : "Show in English");
    });
  }

  function toggleLang() {
    applyLang(current === "en" ? "da" : "en");
  }

  /* ---------------- Mobile menu ---------------- */

  function toggleMobileMenu() {
    var menu = document.querySelector("[data-mobile-menu]");
    var btn = document.querySelector("[data-menu-btn]");
    if (!menu) return;
    var open = menu.getAttribute("aria-hidden") === "true";
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
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
      var link = e.target.closest(".mobile-menu a");
      if (link) { toggleMobileMenu(); }
    });
  });
})();
