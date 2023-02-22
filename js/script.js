// player instance
// -  player name - setter/getter
// -  player symbol - setter/getter
const player = function () {
  let name, symbol;
  const setName = function (nameInp) { name = nameInp; }
  const getName = function () {return name;}
  const setSymbol = function (symbolInp) { symbol = symbolInp; }
  const getSymbol = function () {return symbol;}
  return {setName, getName, setSymbol, getSymbol};
};


// - gameBoard instance
// - game board array - setter/getter
const gameBoard = function () {
  let boardArray;
  const initialize = function () {
    boardArray = new Array(3);
    for (let i = 0; i < 3; i++) {
      boardArray[i] = new Array(3);
      for (let j = 0; j < 3; j++)
        boardArray[i][j] = 0;
    }
  }
  const updateBoard = function(row, col, value) {
    boardArray[row][col] = value;
  }
  const getBoard = function () {
    // return a copy or display ??
  }
  return {initialize, updateBoard, getBoard};
}

// - game instance
// - game id - getter
// - players - getter
// - game board 
// - buttons to confirm each player's move - accept last clicked square only
// - only active for player currently playing
// - initialize game () - initialize all pvt vars
// - display board()
// - determine if next move needs to be played () 
// - display notif if not
const game = function () {
  let boardArr, symbol, symbolDic, lastClicked;
  const initialize = function () {
    let gameGrid = document.querySelector("div.gameGrid");
    document.querySelectorAll("div.gameGrid > *").forEach(e => gameGrid.removeChild(e));
    boardArr = new Array(3);
    for (let i = 0; i < 3; i++) {
      boardArr[i] = new Array(3);
      for (let j = 0; j < 3; j++) {
        boardArr[i][j] = 0;
        let gridDiv = document.createElement("div");
        gridDiv.classList.add(`${i}${j}`);
        gridDiv.style.width = "3rem";
        gridDiv.style.height = "3rem";
        gridDiv.style.border = "1px solid black";
        gridDiv.addEventListener("click", playMove);
        gameGrid.appendChild(gridDiv);
      }    
    }
    document.querySelectorAll("button.confirm")
            .forEach(e => e.addEventListener("click", confirmMove));
    document.querySelector(".player1 .confirm").removeAttribute("disabled");
    document.querySelector(".player2 .confirm").setAttribute("disabled", "");
    lastClicked = null;
    symbol = 'X';
    symbolDic = {'X': 'O', 'O': 'X'};
  }
  const playMove = function (e) {
    if (e.target.textContent !== "") 
      alert("Sorry, that's not allowed!");
    else {
      if (lastClicked !== null) 
       lastClicked.textContent = "";
      if(e.target.textContent === "") {
        e.target.textContent = symbol;
        lastClicked = e.target;
      }
    }
  }
  const confirmMove = function () {
    if (lastClicked !== null) {
      let currPlayer = symbol === 'X' ? 1 : 2;
      let lastDiv = lastClicked.getAttribute("class");
      boardArr[Number(lastDiv[0])][Number(lastDiv[1])] = currPlayer;
      if (hasWon(lastDiv)) {
        alert(`Player ${currPlayer} wins!`);
        // reset to starting position
        initialize();
        return;
      }
      symbol = symbolDic[symbol];
      document.querySelectorAll(".confirm").forEach(e => {e.toggleAttribute("disabled")});
      lastClicked = null;
    }
    else
      alert("You MUST play a move!!");
  }
  const hasWon = function (div) {
    let row = Number(div[0]), col = Number(div[1]), chkRow, chkCol, chkDiag = false;
    // check row and column for all divs
    chkRow = (boardArr[row][0] === boardArr[row][1]) && (boardArr[row][1] === boardArr[row][2]);
    chkCol = (boardArr[0][col] === boardArr[1][col]) && (boardArr[1][col] === boardArr[2][col]);
    // also check diagonals for divs that allow it - defined by the following condition
    if (Math.abs(row - col) % 2 === 0) {
      let row1, col1, row2, col2, chkMainDiag = false, chkAntiDiag = false;
      row1 = (row + 1) % 3; col1 = (col + 1) % 3; row2 = (row + 2) % 3; col2 = (col + 2) % 3;
      // check divs along main diagonal
      chkMainDiag = (boardArr[row][col] === boardArr[row1][col1]) && (boardArr[row][col] === boardArr[row2][col2]);
      // for anti diagonal interchange combination of row and col
      let temp = row1; row1 = row2; row2 = temp;
      chkAntiDiag = (boardArr[row][col] === boardArr[row1][col1]) && (boardArr[row][col] === boardArr[row2][col2]); 
      // check main diagonal for divs along the main diagonal
      if (row === col)
        chkDiag = chkMainDiag;
      // check along anti diagonal too if we're in the middle
      if (row === 1 && col === 1)
        chkDiag = chkMainDiag || chkAntiDiag;
      // check anti diagonal for divs along the anti diagonal
      if (Math.abs(row - col) === 2)
        chkDiag = chkAntiDiag;      
    }
    return (chkRow || chkCol || chkDiag);
  }
  return {initialize};
}

// create divs for board game, add listeners to each div
// create instance of game 
// for each click call updateBoard with the move - use returned result to either prompt for re-move 
// or call playNext - if yes, getArray() and display new board. If no, declare winner

// typical flow - click start button, present form for pl1/pl2, pl1 gets first chance to play (by disabling pl2 button)
// clicks on a box, check if move is legal - if not prompt for re-play, if yes record in game board 
// check if next move is to be played, if yes disable pl1 button else display notif
// repeat for pl2 until either someone wins or gameboard is filled up 

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", game().initialize);