console.log("✅ Drag-and-Drop-Script geladen!");


const tokens = document.querySelectorAll('.token');
const slots = document.querySelectorAll('.slot');
const checkBtn = document.getElementById('check');
const resetBtn = document.getElementById('reset');
const result = document.getElementById('result');
const trashZone = document.getElementById('trash');

let draggedToken = null;  
let draggedSymbol = null; 


tokens.forEach(token => {
  token.addEventListener('dragstart', e => {
    draggedSymbol = token.dataset.symbol;
    // Wenn aus Toolbox gezogen wird  kein echtes Token
    draggedToken = token.parentElement.classList.contains('toolbox') ? null : token;
    e.dataTransfer.effectAllowed = 'move';
  });

  token.addEventListener('dragend', () => {
    draggedToken = null;
    draggedSymbol = null;
  });
});


slots.forEach(slot => {
  slot.addEventListener('dragover', e => e.preventDefault());
  slot.addEventListener('drop', e => {
    e.preventDefault();
    if (!draggedSymbol && !draggedToken) return;

    
    if (slot.firstChild && slot.firstChild !== draggedToken) return;

    
    if (draggedToken && draggedToken.parentElement.classList.contains('slot')) {
      const oldSlot = draggedToken.parentElement;
      oldSlot.classList.remove('filled');
      delete oldSlot.dataset.current;
    }

    
    const tokenElement = draggedToken || (() => {
      const clone = document.createElement('div');
      clone.classList.add('token');
      clone.textContent = draggedSymbol;
      clone.draggable = true;
      clone.dataset.symbol = draggedSymbol;

      
      clone.addEventListener('dragstart', ev => {
        draggedToken = clone;
        draggedSymbol = clone.dataset.symbol;
        ev.dataTransfer.effectAllowed = 'move';
      });
      clone.addEventListener('dragend', () => {
        draggedToken = null;
        draggedSymbol = null;
      });

      return clone;
    })();

  
    slot.innerHTML = '';
    slot.appendChild(tokenElement);
    slot.classList.add('filled');
    slot.dataset.current = tokenElement.dataset.symbol;
  });
});


trashZone.addEventListener('dragover', e => {
  e.preventDefault();
  trashZone.classList.add('dragover');
});

trashZone.addEventListener('dragleave', () => {
  trashZone.classList.remove('dragover');
});

trashZone.addEventListener('drop', e => {
  e.preventDefault();
  trashZone.classList.remove('dragover');

  if (!draggedToken) return;

 
  if (draggedToken.parentElement.classList.contains('slot')) {
    const parentSlot = draggedToken.parentElement;
    parentSlot.classList.remove('filled');
    delete parentSlot.dataset.current;
  }

 
  draggedToken.remove();
  draggedToken = null;
  draggedSymbol = null;
});


checkBtn.addEventListener('click', () => {
 
  var oldAlert = document.getElementById("alert");
  if (oldAlert) oldAlert.remove();

 
  if (getRoomStatus && getRoomStatus(3)) {
    showAlert("Dieser Raum wurde bereits von dir gelöst!", "warning");
    setTimeout(() =>    {   window.location.href = "../home.html"}, 10000);
    return;
  }

 
  const userInput = Array.from(slots)
    .map(slot => slot.dataset.current || '')
    .join('');

 
  const correctAnswers = [
    "CO2+4H2→CH4+2H2O",
    "4H2+CO2→CH4+2H2O",
    "CO2+4H2→2H2O+CH4",
    "4H2+CO2→2H2O+CH4"
  ];


  const correct = correctAnswers.includes(userInput);

  if (correct) {
    showAlert("Richtig! Du hast erfolgreich Methan hergestellt!", "success");
    try {
      setRoomStatusDone(3);
      addCoins(20);
    } catch (e) {
      console.warn("Fehler bei setRoomStatusDone:", e);
    }
    setTimeout(() =>   {    window.location.href = "../home.html"}, 10000);
  } else {
    showAlert("Falsch! Versuch es nochmal.", "danger");
  }
});


resetBtn.addEventListener('click', () => {
  slots.forEach(slot => {
    slot.textContent = '';
    slot.classList.remove('filled');
    delete slot.dataset.current;
  });
  result.textContent = '';
});


function showAlert(message, type) {
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div id="alert" class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `;
  alertPlaceholder.append(wrapper);

 
  setTimeout(() => wrapper.remove(), 5000);
}
