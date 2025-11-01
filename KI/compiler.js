function checkAnswer() {
    // Antwort
    const answer = "Du kommst hier niemals raus.";
    // Benutzerinput
    const userInput = document.getElementById("input").value;
    // Überprüfen, ob der Benutzerinput mit der Antwort übereinstimmt
    if (userInput == answer) {
        alert("Richtig ! Du erhältst den Schlüssel für den Compilerraum.");
        // Schlüssel hinzufügen
        addKeyOnce("compiler");
    }
    else {
        alert("Falsch! Bitte versuche es erneut.");
    }
}

// Funktion zum Testen, ob der Schlüssel bereits erhalten wurde
window.addEventListener("DOMContentLoaded", () => {
  const solved = JSON.parse(localStorage.getItem("solvedRooms")) || [];

  if (solved.includes("compiler")) {
    alert("Du hast den Schlüssel für den Compilerraum bereits erhalten.");
  }
});