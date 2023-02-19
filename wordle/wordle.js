async function fetchData() {
    const res = await fetch("https://api.masoudkf.com/v1/wordle", {
      headers: {
        "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
      },
    });
    const data = await res.json();
    const index =  Math.floor(Math.random() * data.dictionary.length);
    const dataObj = {
      dictionary: data.dictionary,
      secretWord: data.dictionary[index].word,
      hint: data.dictionary[index].hint,
    }
    return dataObj;
}

async function game() {
  loseCondition = 0;
  winCondition = 0;
  const game = document.getElementById("game");
  const x = await fetchData();
  const { hint } = x;
  const { secretWord } = x;
  const state = {
      secretnum: String(secretWord).toUpperCase(),
      grid: Array(4)
          .fill()
          .map(() => Array(4).fill("")),
      currentRow: 0,
      currentCol: 0,
  };
  console.log(state.secretnum);
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
  // async function resetGame() {
  //     if(winCondition > 0){
  //         congrats.classList.toggle("hidden");
  //         drawGrid(game);
  //     }
  //     state.currentRow = 0;
  //     const row = state.currentRow;
  //     for (let i = 0; i < 4; i++){
  //         for(let j = 0; j < 4; j++){
  //             const box = document.getElementById(`box ${i}${j}`);
  //             box.classList.remove("right");
  //             box.classList.remove("partial");
  //             box.classList.remove("empty");
  //         }
  //     }
  //     state.grid = Array(4)
  //     .fill()
  //     .map(() => Array(4).fill(""));
  //     state.currentRow = 0;
  //     state.currentCol = 0;
  //     updateGrid();
  //     if(loseCondition > 0){
  //         lose.classList.toggle("hidden");
  //     }
      
  // }        
  function drawGrid(container){
      const grid = document.createElement("div");
      grid.className = "grid";
      for(let i = 0; i < 4; i++){
          for(let  j = 0; j < 4; j++){
              drawBox(grid, i, j);
          }
      }
      container.appendChild(grid)
  }
  function removeGrid(container){
      const grid = container.querySelector(".grid");
      if(grid){
          container.removeChild(grid);
      }
  }
  function registerKeyboardEvents() {
      document.body.onkeydown = (e) => {
          const key = e.key
          if (key == "Enter"){
              if (state.currentCol == 4){
                  const word = getCurrentWord();
                  if (isWordValid(word)) {
                      revealWord(word);
                      state.currentRow++;
                      state.currentCol = 0;
                  } else {
                  }
              } else {
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
  async function isWordValid(userWord){
      const { dictionary } = await fetchData();
      const words = dictionary.map(entry => entry.word.toUpperCase());
      return words.includes(String(userWord).toUpperCase());
  }
  function getNumOfOccurrencesInWord(word, letter) {
      let result = 0;
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          result++;
        }
      }
      return result;
  }
  function getPositionOfOccurrence(word, letter, position) {
      let result = 0;
      for (let i = 0; i <= position; i++) {
        if (word[i] === letter) {
          result++;
        }
      }
      return result;
  }
  // function revealWord(guess) {
  //     const row = state.currentRow;
    
  //     for (let i = 0; i < 4; i++) {
  //       const box = document.getElementById(`box ${row}${i}`);
  //       const letter = box.textContent;
  //       const numOfOccurrencesSecret = getNumOfOccurrencesInWord(
  //         state.secretnum,
  //         letter
  //       );
  //       const numOfOccurrencesGuess = getNumOfOccurrencesInWord(guess, letter);
  //       const letterPosition = getPositionOfOccurrence(guess, letter, i);
  //       console.log(numOfOccurrencesGuess);
  //       console.log(numOfOccurrencesSecret);
  //       console.log(letterPosition);
  //       console.log(numOfOccurrencesSecret);
  //     if (
  //         numOfOccurrencesGuess > numOfOccurrencesSecret &&
  //         letterPosition > numOfOccurrencesSecret
  //     ) {
  //         box.classList.add("empty");
  //     } else {
  //         if (letter.toUpperCase() === state.secretnum[i]) {
  //             box.classList.add("right");
  //         } else if (state.secretnum.includes(letter.toUpperCase)) {
  //             box.classList.add("partial");
  //         } else {
  //             box.classList.add("empty");
  //         }
  //         }
  //     }
  //     const isWinner = state.secretnum === guess;
  //     const isGameOver = state.currentRow === 3;
    
  //     setTimeout(() => {
  //       if (isWinner) {
  //         alert('Congratulations!');
  //       } else if (isGameOver) {
  //         document.getElementById("lose").innerHTML = "You missed the word <b>" + state.secretnum + "</b> and lost!";
  //         lose.classList.toggle("hidden");
  //         loseCondition += 1;
  //       }
  //     },);
  //   }
  function revealWord(guess){
      const row = state.currentRow;
      for (let i = 0; i < 4; i++){
          const box = document.getElementById(`box ${row}${i}`);
          const letter = box.textContent;
          if (letter.toUpperCase() === state.secretnum[i]){
              box.classList.add("right");
          }else if(state.secretnum.includes(letter.toUpperCase())) {
              box.classList.add("partial");
          }else{
              box.classList.add("empty");
          }
      }
      const isWinner = state.secretnum === guess.toUpperCase();
      const isGameOver = state.currentRow === 3;
      if (isWinner) {
          removeGrid(game);
          document.getElementById("congrats").innerHTML = `<img src="https://res.cloudinary.com/mkf/image/upload/v1675467141/ENSF-381/labs/congrats_fkscna.gif" alt="Congratulations" />`;
          document.getElementById("win").innerHTML = "You guessed the word <b>" + state.secretnum + "</b> correctly!";
          win.classList.toggle("hidden");
      }else if (isGameOver) {
          document.getElementById("lose").innerHTML = "You missed the word <b>" + state.secretnum + "</b> and lost!";
          lose.classList.toggle("hidden");
      }
  }
  function registerButtonEvents(){
      const body=document.querySelector("body");
      document.getElementById("startover").addEventListener("click",()=>{
          location.reload();
      });
      document.getElementById("theme").addEventListener("click",()=>{
          body.classList.toggle("dark-mode");
          
      });
      document.getElementById("hintBlock").innerHTML = "<i>Hint: </i>" + hint;
      const hintClick = document.getElementById("hint")
      hintClick.addEventListener("click", () => {
          hintBlock.classList.toggle("hidden");
      });
      const instructClick = document.getElementById("instruct")
      const right = document.getElementById("right")
      instructClick.addEventListener("click", () => {
          right.classList.toggle("hidden2");
      });
  }
  function isLetter(key){
      return key.length == 1 && key.match(/[a-z]/i);
  }
  function removeLetter() {
      if (state.secretnum === 0) return;
      state.grid[state.currentRow][state.currentCol - 1] = "";
      state.currentCol--;
  }
  function addLetter(letter) {
      if (state.currentCol === 4) return;
      state.grid[state.currentRow][state.currentCol] = letter;
      state.currentCol++;
  }
  async function startup() {
      drawGrid(game);
      registerKeyboardEvents();
      registerButtonEvents();
  }
  startup();
}
game();