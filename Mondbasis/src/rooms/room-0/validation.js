const form = document.getElementById("biologieroom-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Eingaben auslesen
  const gene = document.getElementById("gene").value.trim();
  const blood = document.getElementById("blood").value.trim();
  const rhesus = document.getElementById("rhesus").value.trim().toLowerCase();
  const solutions = document.getElementById("solutions").value.trim();



  // Prüfen, ob Raum schon gelöst wurde
  if (getRoomStatus(0)) {
    removeOldAlert();
    showAlert("Dieser Raum wurde bereits von dir gelöst!", "warning");
    setTimeout(() => {
      removeOldAlert();
      window.location.href = "../home.html";
    }, 10000);
    return;
  }

    // Prüfen, ob alle Felder ausgefüllt sind
  if (!gene || !blood || !rhesus || !solutions) {
    removeOldAlert();
    showAlert("Bitte fülle alle Felder aus, bevor du überprüfst!", "warning");
    setTimeout(() => removeOldAlert(), 7000);
    return;
  }

  // Richtige Antworten
  const correctGene = "B0";
  const correctBlood = "B";
  const correctRhesus = ["negativ", "positiv"]; // beides korrekt
  const correctSolutions = "2";

  // Abgleich der richtigen Antworten mit den eingegebenen Antworten
  const isCorrect =
    gene === correctGene &&
    blood === correctBlood &&
    correctRhesus.includes(rhesus) &&
    solutions === correctSolutions;

  removeOldAlert();

  if (isCorrect) {
    setRoomStatusDone(0);
    addCoins(20);
    showAlert("Richtige Lösung!", "success");
    setTimeout(() => {
      removeOldAlert();
      window.location.href = "../home.html";
    }, 10000);
  } else {
    showAlert("Falsche Lösung!", "danger");
    setTimeout(() => removeOldAlert(), 10000);
  }
});


function showAlert(message, type) {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div id="alert" class="alert alert-${type}" role="alert">
      ${message}
    </div>`;
  alertPlaceholder.append(wrapper);
}

function removeOldAlert() {
  const oldAlert = document.getElementById("alert");
  if (oldAlert) oldAlert.remove();
}
