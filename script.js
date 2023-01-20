const turnDisplay = document.querySelector('.turn-display');

// Store the gameboard as an array inside of a Gameboard object
//
const gameBoard = (() => {
  const gameBoardArray = [];

  return { 
    gameBoardArray,
  };
})();


// Players created via factory function
//
const Player = (playerName, mark, isPlaying) => {
  this.playerName = playerName;
  this.mark = mark;
  this.isPlaying = isPlaying;

  return { playerName, mark, isPlaying};
};

let player1 = Player('Player One', 'X', true);
let player2 = Player('Player Two', 'O', false);


// An object to control the flow of the game itself.
//
const gameFlow = (() => {
  const launchGame = () => {
    let boxId;
    const boardGameBox = document.querySelectorAll('.boardgame-box');
    boardGameBox.forEach(box => {
      box.addEventListener('click', (e) => {
      boxId = e.target.id; // Get the ID of the clicked box
      if (gameBoard.gameBoardArray[boxId] === undefined) { // Authorize move only if the clicked box is empty
        addMoveToArray(boxId);
        addMoveToDisplay(e.target, boxId);
        turnChange();
        //checkWin(gameBoard.gameBoardArray);
      }
      //console.log(gameBoard.gameBoardArray);
      });
    });
  };

  // Fill the array with players' moves
  const addMoveToArray = (boxId) => {
    if (gameBoard.gameBoardArray[boxId] === undefined) {
    player1.isPlaying? gameBoard.gameBoardArray[boxId] = player1.mark : gameBoard.gameBoardArray[boxId] = player2.mark;
    }
  };
  
  // Render the contents of the gameboard array to the webpage
  const addMoveToDisplay = (target, boxId) => { 
    target.textContent= gameBoard.gameBoardArray[boxId];
    player1.isPlaying? target.style.color = '#93adcc' : target.style.color = 'RGB(245,249,173)';
  };

  const turnChange = () => {
    player1.isPlaying = !player1.isPlaying;
    player2.isPlaying = !player2.isPlaying;
    player1.isPlaying? turnDisplay.textContent = `Player One\'s turn ( ${player1.mark} )` : turnDisplay.textContent = `Player Two\'s turn ( ${player2.mark} )`;
  };

  /*const checkWin = (board) => {
      
  };*/

  return {
    launchGame
  };
})();


// User interface
const newGame = (() => {
  document.getElementById('start-game__btn').addEventListener('click', () => {
    gameBoard.gameBoardArray = []; // Reset current game
    player1.isPlaying = true;
    player2.isPlaying = false;
    turnDisplay.textContent = `Player One\'s turn ( X )`;
    document.querySelectorAll('.boardgame-box').forEach(box => {
      box.textContent = '';
    });
    gameFlow.launchGame(); // Launch the game's logic
  });
})();



// OLD CODE

// Write a JavaScript function that will render the contents of the gameboard array to the webpage
// Get the ID of the clicked box
/*const getBoxID = (() => {
  let boxId;
  const boardGameBox = document.querySelectorAll('.boardgame-box');
  boardGameBox.forEach(box => {
    box.addEventListener('click', (e) => {
    boxId = e.target.id;
    addMoveToArray(boxId);
    addMoveToDisplay(e.target, boxId);
    console.log(gameBoard.gameBoardArray);
    });
  });

  return { boxId };
})();

// Fill the array with players' moves
const addMoveToArray = (boxId) => {
  if (gameBoard.gameBoardArray[boxId] === undefined) {
  player1.isPlaying? gameBoard.gameBoardArray[boxId] = player1.mark : gameBoard.gameBoardArray[boxId] = player2.mark;
  }
  player1.isPlaying = !player1.isPlaying;
};

// Edit DOM to display moves
const addMoveToDisplay = (target, boxId) => {
  target.textContent= gameBoard.gameBoardArray[boxId];
};*/

