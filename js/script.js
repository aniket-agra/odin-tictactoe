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

// typical flow - click start button, present form for pl1/pl2, pl1 gets first chance to play (by disabling pl2 button)
// clicks on a box, check if move is legal - if not prompt for re-play, if yes record in game board 
// check if next move is to be played, if yes disable pl1 button else display notif
// repeat for pl2 until either someone wins or gameboard is filled up 