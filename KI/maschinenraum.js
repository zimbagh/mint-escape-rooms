// Antwort
const correctSequence = ['yellow', 'orange', 'blue', 'green', 'red', 'cyan', 'purple', 'white'];

// Benutzerinput
let userSequence = [];

// Alle Buttons in Array
const buttons = document.querySelectorAll('.color-btn');
// Reset-Button
const resetBtn = document.getElementById('reset-btn');

// Event-Listener für jeden Button
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Übernahme des Wertes des Buttons
    const value = button.value;

    // Gedrückt markieren
    button.classList.add('pressed');

    // Den Wert zum Benutzerinput hinzufügen
    userSequence.push(value);

    // Überprüfen, ob die Reihenfolge korrekt ist
    if (userSequence.length === correctSequence.length) {
      if (arraysEqual(userSequence, correctSequence)) {
        alert('Richtig! Die Maschine ist deaktiviert. Du erhältst den Schlüssel.');
        // Funktion zum Hinzufügen des Schlüssels
        addKeyOnce('maschinenraum');
      } else {  
        alert('Falsch! Die Reihenfolge war nicht korrekt.', userSequence);
      }

      // Buttons disablen, um weitere Eingaben zu verhindern
      buttons.forEach(btn => btn.disabled = true);
    }
  });
});

// Reset von der Benutzersequenz und Buttons
resetBtn.addEventListener('click', () => {
  userSequence = [];
  buttons.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('pressed');
  });
});

// Funktion zum Überprüfen, ob zwei Arrays gleich sind
function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

// Funktion zum Testen, ob der Schlüssel bereits erhalten wurde
window.addEventListener("DOMContentLoaded", () => {
  const solved = JSON.parse(localStorage.getItem("solvedRooms")) || [];

  if (solved.includes("maschinenraum")) {
    alert("Du hast den Schlüssel für den Maschinenraum bereits erhalten.");
  }
});

