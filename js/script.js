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
    let boardCopy = new Array(3);
    for (let i = 0; i < 3; i++) {
      boardCopy[i] = new Array(3);
      for (let j = 0; j < 3; j++)
        boardCopy[i][j] = boardArray[i][j];
    }
    return boardCopy;
  }
  const hasWon = function (row, col) {
    let chkRow, chkCol, chkDiag = false;
    // check row and column for all divs
    chkRow = (boardArray[row][0] === boardArray[row][1]) && (boardArray[row][1] === boardArray[row][2]);
    chkCol = (boardArray[0][col] === boardArray[1][col]) && (boardArray[1][col] === boardArray[2][col]);
    // also check diagonals for divs that allow it - defined by the following condition
    if (Math.abs(row - col) % 2 === 0) {
      let row1, col1, row2, col2, chkMainDiag = false, chkAntiDiag = false;
      row1 = (row + 1) % 3; col1 = (col + 1) % 3; row2 = (row + 2) % 3; col2 = (col + 2) % 3;
      // check divs along main diagonal
      chkMainDiag = (boardArray[row][col] === boardArray[row1][col1]) && 
      (boardArray[row][col] === boardArray[row2][col2]);
      // for anti diagonal interchange combination of row and col
      let temp = row1; row1 = row2; row2 = temp;
      chkAntiDiag = (boardArray[row][col] === boardArray[row1][col1]) && 
      (boardArray[row][col] === boardArray[row2][col2]); 
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
  const playRound = function () {
  }
  return {playRound};
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