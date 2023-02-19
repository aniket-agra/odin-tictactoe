// player instance
// -  player name - setter/getter
// -  player symbol - setter/getter

// - gameBoard instance
// - game board array - setter/getter
// - 

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
    document.querySelector(".player2 .confirm").toggleAttribute("disabled");
    lastClicked = null;
    symbol = 'X';
    symbolDic = {'X': 'O', 'O': 'X'};
  }
  const playMove = function (e) {
    if (lastClicked !== null) 
      lastClicked.textContent = "";
    if(e.target.textContent === "") {
      e.target.textContent = symbol;
      lastClicked = e.target;
    }
  }
  const confirmMove = function (e) {
    if (lastDiv !== null) {
      let currPlayer = symbol === 'X' ? 1 : 2;
      let lastDiv = lastClicked.getAttribute("class");
      boardArr[Number(lastDiv[0])][Number(lastDiv[1])] = currPlayer;
      checkBoardState();
      symbol = symbolDic[symbol];
      document.querySelectorAll(".confirm").forEach(e => {e.toggleAttribute("disabled")});
      lastClicked = null;
    }
    else
      alert("You MUST play a move!!");
  }
  const checkBoardState = function () {
    
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