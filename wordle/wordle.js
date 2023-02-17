const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
    "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
});

const data = await res.json()
const dictionary = data.dictionary;
const index = Math.floor(Math.random() * dictionary.length);
const secretWord = dictionary[index].word;

const state = {
    secretnum: secretWord,
    grid: Array(4)
        .fill()
        .map(() => Array(4).fill("")),
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
function isWordValid(word){
    return json.includes(word);
}


function revealWord(guess){
    const row = state.currentRow;
    for (let i = 0; i < 4; i++){
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;
        if (letter === state.secretnum[i]){
            box.classList.add("right");
        }else if(state.secretnum.includes(letter)) {
            box.classList.add("wrong");
        }else{
            box.classList.add("empty");
        }
    }


    const winner = state.secretnum === guess;
    const over = state.currentRow === 4;


    if(winner){
        alert("Congrats");
    }else if (over) {
        alert(`Better luck next time! The word was ${state.secretnum}`);
    }
}


function isLetter(key){
    return key.leght == 1 && key.match(/[a-z]/i);
}
function removeLetter() {
    if (state.secretnum === 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = "";
    state.currentCol--;
}


function startup() {
    const game = document.getElementById("game");
    drawGrid(game);
    
    console.log(state.secretnum);
}


startup();