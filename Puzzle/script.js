const board = document.getElementById('puzzle-board');
const message = document.getElementById('message');
const shuffleBtn = document.getElementById('shuffle-btn');

let tileOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function renderBoard() {
    board.innerHTML = '';
    tileOrder.forEach((originalIdx, currentPos) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.currentPos = currentPos;
        
        // Calculate the slice of the heart image
        const row = Math.floor(originalIdx / 3);
        const col = originalIdx % 3;
        tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

        // Event Listeners for Dragging
        tile.setAttribute('draggable', 'true');
        tile.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', currentPos);
            tile.classList.add('dragging');
        });

        tile.addEventListener('dragover', (e) => e.preventDefault());

        tile.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedPos = e.dataTransfer.getData('text/plain');
            const targetPos = currentPos;
            swapTiles(draggedPos, targetPos);
        });

        tile.addEventListener('dragend', () => tile.classList.remove('dragging'));

        board.appendChild(tile);
    });
}

function swapTiles(idx1, idx2) {
    const temp = tileOrder[idx1];
    tileOrder[idx1] = tileOrder[idx2];
    tileOrder[idx2] = temp;
    renderBoard();
    checkWin();
}

function checkWin() {
    if (tileOrder.every((val, i) => val === i)) {
        message.innerHTML = "<h3>Heart Healed! ❤️</h3>";
        board.style.border = "4px solid #ff4d6d";
        document.querySelector('.message-container').classList.add('show');       
    }
}

shuffleBtn.addEventListener('click', () => {
    tileOrder.sort(() => Math.random() - 0.5);
    message.innerText = "";
    board.style.border = "none";
    renderBoard();
});

renderBoard();