const player = function (...args) {
  let name, symbol;
  const setName = function (nameInp) { name = nameInp; }
  const getName = function () {return name;}
  const setSymbol = function (symbolInp) { symbol = symbolInp; }
  const getSymbol = function () {return symbol;}
  if (args.length === 2) {
    setName(args[0]);
    setSymbol(args[1]);
  }
  const getMove = function () {
    let row = prompt(`${name}, enter row for your move (0 to 2):`);
    let col = prompt(`${name}, enter col for your move (0 to 2):`);
    return [Number(row), Number(col)];
  }
  const playMove = function (boardObj) {
    [row, col] = getMove();
    boardObj.updateBoard(row, col, symbol);
    boardObj.getBoard();
    return boardObj.hasWon(row, col);
  }
  const playMoveDOM = function (boardObj, row, col) {
    boardObj.updateBoard(row, col, symbol);
    boardObj.getBoard();
    return boardObj.hasWon(row, col);
  }
  return {setName, getName, setSymbol, getSymbol, playMove, playMoveDOM};
};

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
    // let boardCopy = new Array(3);
    for (let i = 0; i < 3; i++) {
      // boardCopy[i] = new Array(3);
      console.log(`${boardArray[i][0]}, ${boardArray[i][1]}, ${boardArray[i][2]}`);
      // for (let j = 0; j < 3; j++)
        // boardCopy[i][j] = boardArray[i][j];
    }
    // return boardCopy;
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
  const queryValue = function (row, col) {
    return boardArray[row][col];
  }
  return {initialize, updateBoard, getBoard, hasWon, queryValue};
}

const game = function () {
  let player1, player2, current, gameBoardObj = gameBoard();
  const getPlayerInfo = function (playerNum) {
    // get player info - name and symbol
    // returns player object
    return player(`Player ${playerNum}`, `${playerNum === 1 ? "X" : "O"}`);
  }

  const initialize = function () {
    // initialize board, other vars
    console.log("Getting player 1 info...");
    player1 = getPlayerInfo(1);
    console.log("Getting player 2 info...");
    player2 = getPlayerInfo(2);
    gameBoardObj.initialize();
  }

  const playRoundDOM = function () {
    initialize();
    let gameGrid = document.querySelector(".gameGrid");
    let gameOver = false, move = 0;
    let updateMove = function (e) {
      let clickedRow = Number(e.target.classList[0][0]), clickedCol = Number(e.target.classList[0][1]);
      let alreadyFilled = gameBoardObj.queryValue(clickedRow, clickedCol) !== 0;
      if (!alreadyFilled) {
        if (!gameOver && move <= 9) {
          if (move % 2 === 0) 
            current = player2;
          else 
            current = player1;
          gameOver = current.playMoveDOM(gameBoardObj, clickedRow, clickedCol);
          if (gameOver) {
            alert(`${current.getName()} wins!!`);
            // do other stuff to reset game!
          }
          else 
            move += 1;
        }
        if (!gameOver && move == 9)
          alert("Game tied!");
      }
      else 
        alert("Sorry, this cell is already filled!");
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let gridDiv = document.createElement("div");
        gridDiv.classList.add(`${i}${j}`);
        gridDiv.addEventListener('click', updateMove);
        gridDiv.style.height = "3rem";
        gridDiv.style.width = "3rem";
        gridDiv.style.border = "2px solid black";
        gameGrid.appendChild(gridDiv);
      }
    }      
  }

  const playRound = function () {
    let gameOver = false, move = 1;
    while (!gameOver && move <= 9) {
      let currentValue = 0;
      if (move % 2 === 0) {
        currentValue = 2;
        current = player2;
      }
      else {
        currentValue = 1;
        current = player1;
      }
      gameOver = current.playMove(gameBoardObj);
      if (gameOver) {
        alert(`${current.getName()} wins!!`);
        // do other stuff to reset game!
      }
      else
        move += 1;
    }
  }
  return {initialize, playRound, playRoundDOM};
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
startBtn.addEventListener("click", game().playRoundDOM);
