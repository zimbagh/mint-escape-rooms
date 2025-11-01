const form = document.getElementById("mathe-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Eingaben auslesen
  const start = document.getElementById("start").value.trim();
  const vier = document.getElementById("vier").value.trim();
  const sieben = document.getElementById("sieben").value.trim();
  const acht = document.getElementById("acht").value.trim();
  const neun = document.getElementById("neun").value.trim();



  // Prüfen, ob  der Raum schon gelöst wurde
  if (getRoomStatus(4)) {
    removeOldAlert();
    showAlert("Dieser Raum wurde bereits von dir gelöst!", "warning");
    setTimeout(() => {
      removeOldAlert();
      window.location.href = "../home.html";
    }, 10000);
    return;
  }

    // Prüfen  ob alle Felder ausgefüllt sind
  if (!start || !vier || !sieben || !acht || !neun) {
    removeOldAlert();
    showAlert("Bitte fülle alle Felder aus, bevor du überprüfst!", "warning");
    setTimeout(() => removeOldAlert(), 7000);
    return;
  }

  // Richtige Antworten
  const correctstart = "Beide Sanduhren werden gedreht";
  const correctvier = "Nur Sanduhr 4 wird gedreht";
  const correctsieben = "Nur Sanduhr 7 wird gedreht";
  const correctacht = ["Nur Sanduhr 7 wird gedreht", "Beide Sanduhren werden gedreht"]; // beides korrekt
  const correctneun = "Sanduhr 7 ist genau jetzt leer";

  // Abgleich
  const isCorrect =
    start === correctstart &&
    vier === correctvier &&
    sieben === correctsieben &&
    correctacht.includes(acht) &&
    neun === correctneun;

  removeOldAlert();

  if (isCorrect) {
    setRoomStatusDone(4);
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
