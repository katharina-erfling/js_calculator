<img width="983" height="681" alt="Screenshot 2026-03-30 142636" src="https://github.com/user-attachments/assets/5374a461-51ba-446c-b313-8ab74bd6998a" />

# 🧮 GLaDOS Mini – Calculator

Ein voll funktionsfähiger Taschenrechner im Retro-Synthwave-Look.

---

## ✨ Besonderheiten

> 🎹 **Tastaturunterstützung** – alle Tasten (0–9, Operatoren, Enter, Escape, Backspace) funktionieren per Keyboard, ohne doppelte Logik

> 🔗 **Event Delegation** – ein einziger Event Listener auf dem Button-Grid statt eines Listeners pro Button

> ➕ **Ketteneingabe** – `3 + 4 + 5 =` berechnet korrekte Zwischenergebnisse

> 🔬 **Gleitkomma-Fix** – `toFixed(10)` + `parseFloat` verhindert Darstellungsfehler wie `0.30000000000000004`

> 📐 **Exponentialdarstellung** – bei mehr als 10 Stellen wird automatisch in Exponentialschreibweise gewechselt

> 🎨 **3D-Gehäuse rein per CSS** – mehrschichtige `box-shadow`-Konstruktion, `rotateX`, Scanlines per `repeating-linear-gradient` und Neon-Glow auf dem Display

---

## 🎮 Funktionen

- Grundrechenarten: `+` `−` `×` `÷`
- Vorzeichenwechsel (`+/-`)
- Prozentrechnung (`%`)
- Dezimalpunkt mit Doppelpunkt-Schutz
- AC – vollständiges Zurücksetzen
- Visuelle Tastenanimation beim Klicken

---

## 📁 Projektstruktur

```
/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

---

## 🛠️ Technologien

- **HTML5** – semantisches Markup, `data-val` Attribute für Button-Werte
- **CSS3** – `box-shadow` Schichtung, `rotateX`, `repeating-linear-gradient`, CSS Custom Properties, Neon-Glow per `text-shadow`
- **JavaScript** – Event Delegation, DOM-Manipulation, Keyboard-Map, State-Management

---

## 📚 Kontext

Teil der **Softwareentwicklerin Frontend Javascript Zertifizierung** bei GFN (extern zertifiziert durch WPI), März – Juni 2026.
