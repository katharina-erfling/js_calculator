
/* ── Konstanten ────────────────────────────────────────────────── */

const disp = document.getElementById('display'); //holt sich das Display-Element
//  einfach disp.textContent schreiben statt immer getElementById aufzurufen





/* ── Variablen (der "State" des Taschenrechners) ────────────────── */
let current = '0'; //Was gerade auf dem Bildschirm steht
let prev = ''; //Die Zahl vor dem Operator (z.B. die "3" bei "3 + 4")
let op = null; //Der aktive Operator         ('+', '-', '*', '/' oder null)
let resetNext = false; // Zahl beim tippen ersetzen







 

/* ── Updatefunktion ──────────────────────────────────────────────── */
// Anzeige auf dem Display/ mehr als 10 Zeichen -> Exponential
function update(val) {
    disp.textContent = val.length > 10 
    ? parseFloat(val).toExponential(4) 
    : val;
}







/* ── Event Listener: Mausklick ──────────────────────────────────── */

// Event Delegation -> alle Buttons im Grid, nicht allein stehend
document.getElementById('buttons').addEventListener('click', e => {
    const btn = e.target.closest('.btn'); //wurde ein Button geklickt?
    if (!btn) return; // wenn Klick daneben gar nichts tun
    const v = btn.dataset.val; //liest Wert aus dem data-val-Attribut (html) z.b. 7 oder +


//Visuelle Tastenanimation -> kurzer Klick
btn.classList.add('pressed');
setTimeout(() => btn.classList.remove('pressed'), 120);


// AC Button: Display leeren
if (v === 'AC') { 
    current = '0'; prev = ''; op = null; resetNext = false; 
    update('0'); 
    return; 
}


// Vorzeichenwechsel -> von positiven zu negativen Zahlen und umgekehrt
if (v === '+/-') {
// String → Zahl → negieren → zurück zu String
    current = String(-parseFloat(current));
    update(current);
    return;
}


// Prozentzeichen
if (v === '%') {
    // String → Zahl → durch 100 → zurück zu String
    current = String(parseFloat(current) / 100);
    update(current);
    return;
}


// wird ein Operator gedrückt?
if (['+', '-', '*', '/'].includes(v)) {
    // Falls schon ein Operator aktiv ist UND der Nutzer bereits eine zweite Zahl
    // getippt hat: Zwischenergebnis berechnen (ermöglicht Ketteneingabe wie 3+4+5)

if (op && !resetNext) {
      current = String(eval(prev + op + current));
      update(current);
}

    prev = current;   // Aktuelle Zahl als ersten Operanden merken
    op = v;           // Neuen Operator speichern
    resetNext = true; // Nächste Ziffer soll frisch beginnen
    return;
  }

// Gleichheitszeichen
  if (v === '=') {
    if (!op) return; // Kein Operator aktiv → nichts zu berechnen

    // eval führt einen String als Rechenausdruck aus: eval('3+4') → 7
    const res = eval(prev + op + current);

    // toFixed(10) schneidet Gleitkomma-Fehler ab (z.B. 0.30000000000000004)
    // parseFloat entfernt danach überflüssige Nullen am Ende
    current = String(parseFloat(res.toFixed(10)));
    update(current);

    op = null; prev = ''; resetNext = true; // Für die nächste Eingabe zurücksetzen
    return;
  }

  
  //Dezimalpunkt
  if (v === '.') {
    // Direkt nach einem Operator gedrückt? Dann mit '0' beginnen (→ '0.')
    if (resetNext) { current = '0'; resetNext = false; }
    // Nur hinzufügen wenn noch kein Punkt in der Zahl ist (verhindert '3.4.5')
    if (!current.includes('.')) { current += '.'; update(current); }
    return;
  }


  // Ziffer (0–9)
  if (resetNext) {
    current = '';      // Alten Wert löschen, frisch beginnen
    resetNext = false;
  }
  // Ist current noch '0', ersetzen statt anhängen (verhindert führende Null wie '07')
  current = current === '0' ? v : current + v;
  if (current.length > 12) return; // Mehr als 12 Stellen → ignorieren
  update(current);
});



/* ── Event Listener: Tastatur ───────────────────────────────────── */

document.addEventListener('keydown', e => {
  // Wörterbuch: Taste auf der Tastatur → data-val des entsprechenden Buttons
  const map = {
    '0':'0', '1':'1', '2':'2', '3':'3', '4':'4',
    '5':'5', '6':'6', '7':'7', '8':'8', '9':'9',
    '+':'+', '-':'-', '*':'*', '/':'/',
    '.':'.', 'Enter':'=', 'Escape':'AC', 'Backspace':'AC', '%':'%'
  };

  const v = map[e.key]; // Nachschlagen: welchem Button entspricht diese Taste?
  if (!v) return;       // Taste nicht im Wörterbuch → nichts tun

  // Den passenden Button im HTML suchen und anklicken –
  // dieselbe Logik wie beim Mausklick, nichts doppelt schreiben
  const btn = [...document.querySelectorAll('.btn')]
    .find(b => b.dataset.val === v);
  if (btn) btn.click();
});