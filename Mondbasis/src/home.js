document.addEventListener("DOMContentLoaded", () => {
  console.log("Home-Seite geladen – überprüfe Raumstatus...");

  // Check status of all rooms
  for (let i = 0; i < rooms.length; i++) {
    const room = document.getElementById("icon-room" + i);
    if (room) {
      if (getRoomStatus(i)) {
        room.style.display = "block";
      } else {
        room.style.display = "none";
      }
    } else {
      console.warn(" Icon für Raum", i, "nicht gefunden!");
    }
  }
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    console.log("Seite aus Browser-Cache (bfcache) geladen – aktualisiere manuell...");
    window.location.reload();
  } else {
    console.log("Home-Seite wieder sichtbar – aktualisiere Räume...");
    const icons = document.querySelectorAll('[id^="icon-room"]');
    icons.forEach((icon) => {
      const idx = parseInt(icon.id.replace("icon-room", ""), 10);
      if (getRoomStatus(idx)) {
        icon.classList.remove("bi-lock");
        icon.classList.add("bi-check-circle-fill", "text-success");
        icon.style.display = "inline-block";
      } else {
        icon.classList.remove("bi-check-circle-fill", "text-success");
        icon.classList.add("bi-lock");
      }
    });
  }
});
