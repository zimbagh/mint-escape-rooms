console.log("✅ index.js wurde erfolgreich geladen");

function startCountdown() {
  initCoins();
  setEndTime();
  initRoomStatus();
  localStorage.removeItem("bonusUsed");
  window.location.href = "./src/home.html";

}
