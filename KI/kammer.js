function checkDoor(guardian) {
  // Antwort
  const correct = 'B';

  // Test ob die richtige Div Box ausgewählt wurde
  if (guardian === correct) {
    alert('Richtig! Wächter B trägt den echten Schlüssel. Du erhältst den Schlüssel.');
    // Funktion zum Hinzufügen des Schlüssels
    addKeyOnce('kammer'); // optional: Schlüssel im Inventory markieren
  } else {
    alert('Falsch! Dieser Wächter lügt. Versuche es noch einmal.');
  }
}

// Funktion zum Testen, ob der Schlüssel bereits erhalten wurde
window.addEventListener("DOMContentLoaded", () => {
  const solved = JSON.parse(localStorage.getItem("solvedRooms")) || [];

  if (solved.includes("kammer")) {
    alert("Du hast den Schlüssel für die Verschlüsselte Kammer bereits erhalten.");
  }
});
