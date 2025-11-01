function addKeyOnce(roomId) {
    // Variable für gelöste Räume
    let solved = JSON.parse(localStorage.getItem("solvedRooms")) || [];

    // Überprüfen, ob der Raum bereits gelöst wurde, wenn nicht dann hinzufügen
    if (!solved.includes(roomId)) {
        solved.push(roomId);
        localStorage.setItem("solvedRooms", JSON.stringify(solved));
    }
}