document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".control-btn");
  const resetBtn = document.getElementById("reset");
  const inputSeqDisplay = document.getElementById("inputSeq");
  const resultDisplay = document.getElementById("result");


  // Richtige Lösung
  const correctSequence = [5, 1, 4, 2, 3, 1, 4, 2, 5, 3];
  let currentSequence = [];


  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentSequence.length >= 10) return;

      const val = parseInt(btn.dataset.value);
      currentSequence.push(val);

      updateSequenceDisplay();

      if (currentSequence.length === 10) {
        checkSequence();
      }
    });
  });

 
  resetBtn.addEventListener("click", () => {
    currentSequence = [];
    resetSequenceDisplay();
    resultDisplay.textContent = "";
    removeOldAlert();
  });


  function updateSequenceDisplay() {
    const spans = inputSeqDisplay.querySelectorAll("span");
    spans.forEach((el, idx) => {
      el.textContent = currentSequence[idx] ?? "–";
    });
  }


  function resetSequenceDisplay() {
    const spans = inputSeqDisplay.querySelectorAll("span");
    spans.forEach((el) => (el.textContent = "–"));
  }


  function checkSequence() {
    var oldAlert = document.getElementById("alert");
    if (oldAlert !== null) oldAlert.remove();

    // Prüfen, ob der Raum ereldigt wurde
    if (getRoomStatus && getRoomStatus(2)) {
      alert("Dieser Raum wurde bereits von dir gelöst!", "warning");
      var currentAlert = document.getElementById("alert");
      setTimeout(() => {
        currentAlert.remove();
      window.location.href = "../home.html";
      }, 10000);
      return;
    }

    const correct = currentSequence.every((v, i) => v === correctSequence[i]);

    if (correct) {
      if (oldAlert !== null) oldAlert.remove();

      setRoomStatusDone(2);
      addCoins(20);

      alert("Sehr gut!", "success");
      var currentAlert = document.getElementById("alert");
      setTimeout(() => {
        currentAlert.remove();
      window.location.href = "../home.html";
      }, 10000);


    } else {
      if (oldAlert !== null) oldAlert.remove();

      alert("Falsche Reihenfolge!", "danger");
      var currentAlert = document.getElementById("alert");
      setTimeout(() => {
        currentAlert.remove();
      }, 10000);
    }
  }

  function removeOldAlert() {
    var old = document.getElementById("alert");
    if (old !== null) old.remove();
  }
});
