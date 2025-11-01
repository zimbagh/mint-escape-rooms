// Antwort
var answer = [];

// Funktion zum ändern des Textes auf dem Bildschirm
function changeText(number) {
    document.getElementById("screenText").innerHTML = number;
}

// Funktion zum Erzeugen einer zufälligen Zahlenfolge
function randomNumber() {
    const arr = [];
    for (i = 0; i < 3; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

// Funktion zum Starten der Sequenz
function startSequence() {
    answer = randomNumber();
    for(let i = 0; i < answer.length; i++) {
        setTimeout(() => {
            changeText(answer[i]);
        }, i * 250);
    }
    setTimeout(() => {
        changeText("Enter the numbers in the same order!");
    }, answer.length * 250);
}

// Funktion zum Überprüfen der Sequenz
function checkSequence() {
    const input = [];
    input.push(Number(document.getElementById("input").value));
    input.push(Number(document.getElementById("input2").value));
    input.push(Number(document.getElementById("input3").value));
    if ( input.every((val, index) => val === answer[index])) {
        alert("Richtig! Du erhältst den Schlüssel für die Steuerzentrale.");
        addKeyOnce("steuerzentrale");
    } else {
        alert("Falsch! Bitte versuche es erneut.");
    }
}

// Funktion zum Testen, ob der Schlüssel bereits erhalten wurde
window.addEventListener("DOMContentLoaded", () => {
  const solved = JSON.parse(localStorage.getItem("solvedRooms")) || [];

  if (solved.includes("steuerzentrale")) {
    alert("Du hast den Schlüssel für die Steuerzentrale bereits erhalten.");
  }
});


