/* Fahrschule Werther – Interaktionen (vanilla JS, keine Abhängigkeiten) */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Mobiles Menü ---------- */
  var toggle = document.getElementById('navtoggle');
  var nav = document.getElementById('mainnav');

  if (toggle && nav) {
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    };

    toggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('is-open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setNav(false);
        toggle.focus();
      }
    });

    var mq = window.matchMedia('(min-width: 961px)');
    var onMq = function (e) { if (e.matches) setNav(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else if (mq.addListener) mq.addListener(onMq);
  }

  /* ---------- Führerscheinklassen aufklappen ---------- */
  var accButtons = [].slice.call(document.querySelectorAll('.acc__btn'));

  accButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.classList.toggle('is-open', !open);
    });
  });

  /* ---------- Aktiver Navigationspunkt ---------- */
  var sections = [].slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = [].slice.call(document.querySelectorAll('.mainnav a[href^="#"]'));

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      if (window.scrollY < 130) {
        navLinks.forEach(function (a) { a.classList.remove('is-active'); });
        return;
      }
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Kontaktformular -> E-Mail-Programm ---------- */
  var form = document.getElementById('kontaktformular');
  var status = document.getElementById('formStatus');
  var EMPFAENGER = 'fahrschule-werther@gmx.de';

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var MELDUNGEN = {
        nachricht: "Bitte schreib uns kurz, worum es geht.",
        name:      "Bitte trag deinen Namen ein, damit wir wissen, wen wir zurückrufen.",
        email:     "Bitte eine gültige E-Mail-Adresse eintragen, z. B. name@beispiel.de",
        consent:   "Ohne dein Einverständnis dürfen wir die Anfrage leider nicht bearbeiten."
      };

      var feldVon = function (el) { return el.closest(".fld") || el.closest(".agree") || el.closest(".consent"); };

      var loescheFehler = function () {
        form.querySelectorAll(".has-error").forEach(function (el) { el.classList.remove("has-error"); });
        form.querySelectorAll(".fld-error").forEach(function (el) { el.remove(); });
      };

      var zeigeFehler = function () {
        loescheFehler();
        var erstes = null;
        Object.keys(MELDUNGEN).forEach(function (name) {
          var el = form.elements[name];
          if (!el || el.checkValidity()) return;
          var box = feldVon(el);
          if (!box) return;
          box.classList.add("has-error");
          var p = document.createElement("p");
          p.className = "fld-error";
          p.textContent = MELDUNGEN[name];
          box.appendChild(p);
          if (!erstes) erstes = el;
        });
        if (erstes) {
          erstes.focus();
          erstes.scrollIntoView({ block: "center", behavior: "smooth" });
        }
        return !erstes;
      };

      if (!zeigeFehler()) return;
      loescheFehler();

      var val = function (name) {
        var el = form.elements[name];
        return el && el.value ? el.value.trim() : '';
      };

      var name = val('name');
      var zeilen = [
        'Name: ' + (name || '-'),
        'Telefon: ' + (val('telefon') || '-'),
        'E-Mail: ' + (val('email') || '-'),
        '',
        'Nachricht:',
        val('nachricht')
      ];

      var betreff = 'Anfrage über die Website' + (name ? ' – ' + name : '');
      var href = 'mailto:' + EMPFAENGER +
        '?subject=' + encodeURIComponent(betreff) +
        '&body=' + encodeURIComponent(zeilen.join('\n'));

      if (status) {
        status.textContent = 'Dein E-Mail-Programm öffnet sich mit der fertig ausgefüllten Nachricht. Bitte dort noch auf „Senden“ klicken.';
      }

      window.location.href = href;
    });
  }

  /* ---------- Jahreszahl in der Fußzeile ---------- */
  var year = document.getElementById('jahr');
  if (year) year.textContent = new Date().getFullYear();
})();
