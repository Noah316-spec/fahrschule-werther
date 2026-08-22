# Fahrschule Werther – Website-Entwurf

Neu gebauter Entwurf für die Fahrschule Werther, Nürnberger Str. 15, 34212 Melsungen.
Inhalte stammen vollständig von der bestehenden Website `fahrschule-werther.de`.

## Lokal ansehen

```bash
node server.js
```

Danach im Browser `http://localhost:5174` öffnen. Alternativ die `index.html`
direkt per Doppelklick öffnen – alle Pfade sind relativ.

## Aufbau

```
index.html                 Startseite (alle Abschnitte auf einer Seite)
datenschutz.html           Datenschutzerklärung
haftungsausschluss.html    Haftungsausschluss / Disclaimer
assets/css/style.css       Stylesheet
assets/js/main.js          Menü, Aufklapper, Scroll-Effekte, Kontaktformular
assets/img/                Bilder von der Original-Website
server.js                  Kleiner Testserver, wird beim Hosten nicht gebraucht
```

## Design

Eigenständiges System, bewusst anders als andere Fahrschul-Entwürfe:

- **Leitmotiv Straße** – aus dem Logo abgeleitet: Fahrbahnmarkierungen als
  Trenner, die Ablauf-Schritte als Route mit Haltepunkten, animierte
  Mittellinie in der Bildmarke.
- **Farben** – Blau `#1a2ae0` (aus dem Original-Logo), Nachtblau `#080d4d`,
  Signalgelb `#ffd400`, Asphaltgrau `#3f4354`.
- **Typografie** – Archivo für Überschriften (versal), Inter für Fließtext.
- **Formen** – kantige Ecken (6 px), 2 px Konturen, harte Versatzschatten
  statt weicher Schlagschatten.
- **Führerscheinklassen** – 11 Klassen als Aufklapp-Liste, gruppiert nach
  Zweirad / Auto und Anhänger / Lkw und Lastzüge.

## Bilder

Alle Bilder stammen von der Original-Website. Es wurden keine fremden oder
erfundenen Bilder ergänzt.

| Datei | Herkunft |
|---|---|
| `logo.jpg` | Logo der Fahrschule |
| `auto.jpg` | Motivbild „Auto" |
| `motorrad.jpg` | Motivbild „Motorrad" |
| `roller.jpg` | Motivbild „50 ccm Roller" |
| `preisaushang.png` | Foto des Preisaushangs nach § 32 Fahrlehrergesetz |

Der Preisaushang ist bewusst als Bild eingebunden und **nicht** abgetippt: Auf
dem Foto sind mehrere Beträge unscharf oder überlagert. Eine Abschrift hätte
das Risiko falscher Preisangaben.

## Vor dem Livegang entfernen

Beides ist im Code kommentiert und über eine Suche nach `draft` zu finden:

1. `<meta name="robots" content="noindex, nofollow">` in allen drei HTML-Dateien
2. Der `<div class="draft">`-Block sowie der zugehörige CSS-Abschnitt

## Offene Punkte

- **Klasse CE, Vorbesitz:** Die Original-Website nennt „Vorbesitz erforderlich:
  Ja, Klasse B", während die Ausbildungstabelle derselben Seite von „Vorbesitz
  von Klasse C" ausgeht. Der Entwurf gibt die Angabe der Website unverändert
  wieder – das sollte mit der Fahrschule geklärt werden.
- **Datenschutzerklärung:** Der übernommene Text beschreibt eine Seite ohne
  Eingabefelder und ohne externe Dienste. Dieser Entwurf hat ein
  Kontaktformular (rein `mailto:`, keine Serververarbeitung) und lädt Google
  Fonts. Beides gehört ergänzt und juristisch geprüft.
- **Anhängerweiterbildung** und **B196** sind auf der Original-Website noch
  nicht ausformuliert; der Entwurf gibt den vorhandenen Stand wieder.
