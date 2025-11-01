const rooms = [];
rooms.length = 9;

function initRoomStatus() {
  for (let i = 0; i < rooms.length; i++) {
    window.localStorage.setItem("statusRoom" + i, false);
  }
}

function getRoomStatus(roomnumber) {
  return window.localStorage.getItem("statusRoom" + roomnumber) === "true";
}

function setRoomStatusDone(roomnumber) {
  window.localStorage.setItem("statusRoom" + roomnumber, true);
}

function updateRoomStatusUI(roomIndex) {
  console.log("✅ Roomstatus updated!");
  const icon = document.querySelector(`[data-room="${roomIndex}"] .status-icon`);
  if (icon) {
    icon.classList.remove("bi-lock");
    icon.classList.add("bi-check-circle-fill", "text-success");
  }
}

function updateAllRoomsStatus() {
  console.log("🔄 Aktualisiere Raumstatus...");
  for (let i = 0; i < 5; i++) { 
    updateRoomStatusUI(i);
  }
}
