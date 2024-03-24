console.log("testest2");

// speler x begint altijd
let currentPlayer = 'X'; 

// 3x3 bordspel
let gameBoard = ['', '', '', '', '', '', '', '', '']; 

// spel is actief
let gameActive = true;

// speler gaat op vakje klikken
function handlePlayerTurn(clickedCellIndex) {
  // checkt of cel leeg is en of spel actief is
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
    // vakje wordt gevuld
      return;
  }
  // check of er winnaar of gelijkspel is
  gameBoard[clickedCellIndex] = currentPlayer;
  checkForWinOrDraw();
  // zo niet, beurt aan volgende
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// speler klikt op vakje
function cellClicked(clickedCellEvent) {
  // checkt of vakje leeg is en spel actief is
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return;
  }
  // functie wordt aangeroepen die beurt van speler behandelt, ui wordt upgedate
  handlePlayerTurn(clickedCellIndex);
  updateUI();
}

// ophalen html
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', cellClicked, false);
});


// Ui wordt opgedate, x of o in vakje
function updateUI() {
  for (let i = 0; i < cells.length; i++) {
    // dom manipulatie
      cells[i].innerText = gameBoard[i];
  }
}

// speler wint
function announceWinner(player) {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = `Speler ${player} wint!`;

  // Als speler X wint, verandert de achtergrondkleur van mn h1-element naar rood
  if (player === 'X') {
    messageElement.style.backgroundColor = 'red';
  } else { // Als speler O wint, verander de achtergrondkleur van het h1-element naar blauw
    messageElement.style.backgroundColor = 'blue';
  }
}

// gelijk spel
function announceDraw() {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = 'Game Draw!';
}

// combinaties om te winnen
const winConditions = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]  
];

// functie controleert of je gewonnen of gelijk spel speelt
function checkForWinOrDraw() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          roundWon = true;
          break;
      }
  }

  if (roundWon) {
      announceWinner(currentPlayer);
      gameActive = false;
      return;
  }

  let roundDraw = !gameBoard.includes('');
  if (roundDraw) {
      announceDraw();
      gameActive = false;
      return;
  }
}

// functie die de game reset en dus alles leeg maakt etc
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => {
      cell.innerText = '';
  });
  document.getElementById('gameMessage').innerText = '';
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);

// bronnen
// - https://www.youtube.com/watch?v=knkWr93kClY
// - https://www.youtube.com/watch?v=oZrp3Atkz18
// - https://www.geeksforgeeks.org/simple-tic-tac-toe-game-using-javascript/
