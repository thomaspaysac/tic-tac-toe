// Store the gameboard as an array inside of a Gameboard object : module
const gameBoard = (() => {
  const gameBoardArray = [];

  return { gameBoardArray };
})();

// Your players are also going to be stored in objects : factory function
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
// Write a JavaScript function that will render the contents of the gameboard array to the webpage
// Get the ID of the clicked box
const getBoxID = (() => {
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
};
