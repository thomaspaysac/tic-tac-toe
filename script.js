// Store the gameboard as an array inside of a Gameboard object : module
const gameBoard = (() => {
  const gameBoardArray = [];

  return { gameBoardArray };
})();

// Your players are also going to be stored in objects : factory function


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
  gameBoard.gameBoardArray[boxId] = 'X';
};

// Edit DOM to display moves
const addMoveToDisplay = (target, boxId) => {
  target.textContent= gameBoard.gameBoardArray[boxId];
};
