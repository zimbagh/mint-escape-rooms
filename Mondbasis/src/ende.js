const input1 = document.getElementById("loesung");

function checkcoinnumber() {
  if (getCoins() >= 100) {
    var oldAlert = document.getElementById("alert");
    var leaveSuccess = document.getElementById("leave-success");
    var leaveFail = document.getElementById("leave-fail");

    if (oldAlert !== null) oldAlert.remove();

    // Erfolgsmeldung
    alert(
      "Glückwunsch! Jan und Lisa haben mit deiner Hilfe alle Daten wiederhergestellt.",
      "success"
    );
    var currentAlert = document.getElementById("alert");
    setTimeout(() => {
      currentAlert.remove();
    }, 10000);

    leaveSuccess.style.display = "block";
    leaveFail.style.display = "none";
  } else {
    var oldAlert = document.getElementById("alert");
    if (oldAlert !== null) oldAlert.remove();

    // Fehlermeldung
    alert(
      "Es wurden noch nicht alle Daten wiederhergestellt.",
      "danger"
    );
    var currentAlert = document.getElementById("alert");
    setTimeout(() => {
      currentAlert.remove();
      window.location.href = "./home.html";
    }, 10000);
  }
}

function bonustime() {
  const answer = input1.value.trim().toLowerCase();

  // Falls schon ein Alert da ist diesen entfernen
  const oldAlert = document.getElementById("alert");
  if (oldAlert) oldAlert.remove();

  // Prüfen, ob der Bonus schon aktiviert wurde
  if (localStorage.getItem("bonusUsed") === "true") {
    alert("Der Zeitbonus wurde bereits aktiviert!", "warning");
    const currentAlert = document.getElementById("alert");
    setTimeout(() => {
      if (currentAlert) currentAlert.remove();
    }, 10000);
    return;
  }

  
  if (answer === "rakete") {
    increaseEndtime(10);

    // Bonus als erledigt markieren
    localStorage.setItem("bonusUsed", "true");

    alert("Email abgesendet, Die Konferenz beginnt 10 min später! +10 Minuten wurden zur Countdown-Zeit hinzugefügt.", "success");
    const currentAlert = document.getElementById("alert");
    setTimeout(() => {
      if (currentAlert) currentAlert.remove();
    }, 10000);
  } else {
    alert("Falsches Passwort!", "danger");
    const currentAlert = document.getElementById("alert");
    setTimeout(() => {
      if (currentAlert) currentAlert.remove();
    }, 10000);
  }
}
