const state = {
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill("")),
    currentRow: 0,
    currentCol: 0,
}
function updateGrid(){
    for(let i = 0; i < state.grid.length; i++){
        for(let j = 0; j < state.grid[i].length; j++){
            const box = document.getElementById(`box ${i}${j}`)
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(container, row, col, letter = "") {
    const box = document.createElement("div");
    box.className = "box";
    box.id = `box ${row}${col}`;
    box.textContent = letter;
    container.appendChild(box)
    return box
}

function drawGrid(container){
    const grid = document.createElement("div");
    grid.className = "grid";
    for(let i = 0; i < 3; i++){
        for(let  j = 0; j < 4; j++){
            drawBox(grid, i, j);
        }
    }
    container.appendChild(grid)
}

function registerKeyboardEvents() {
    document.body.onkeyDown = (e) => {
        const key = e.key
        if (key == "Enter"){
            if (state.current == 4){
                const word = getCurrentWord();
                if (isWordValid(word)) {
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                } else {

                }
            }
            if (state.current < 4){
                alert("You must complete the word first");
            }

        }
        if (key == "Backspace"){
            removeLetter();
            
        }
        if (isLetter(key)){
            addLetter(key);
            
        }
        updateGrid();
    }
}
function getCurrentWord(){
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function startup() {
    const game = document.getElementById("game");
    drawGrid(game);
}

startup();