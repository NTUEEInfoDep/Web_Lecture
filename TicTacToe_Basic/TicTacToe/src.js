let blocks = Array.from(document.getElementsByTagName('td')).map(elem => ({
  elem,
  mark: null
}));
let winner = document.getElementById('winner');
let playerIsX = true;
let gameState = { X_WON: 0, O_WON: 1, DRAW: 2, NOT_ENDING: 3 };
let currentState = gameState.NOT_ENDING;

function reset() {
  playerIsX = true;
  winner.textContent = '';
  currentState = gameState.NOT_ENDING;
  for (let i = 0; i < 9; ++i) {
    blocks[i].elem.textContent = '';
    blocks[i].elem.style.background = 'none';
    blocks[i].elem.classList.add('clickable');
    blocks[i].mark = null;
  }
}

function checkState(index) {
  let winPatterns = [
    [0, 1, 2], // row
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // col
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diag
    [2, 4, 6]
  ];
  let currentMark = blocks[index].mark;
  let pattern = null;

  if (
    (pattern = winPatterns.find(pattern =>
      pattern.every(i => blocks[i].mark === currentMark)
    ))
  ) {
    for (let i = 0; i < 3; ++i)
      blocks[pattern[i]].elem.style.background = '#91ff91';

    for (let i = 0; i < 9; ++i)
      if (!blocks[i].mark) blocks[i].elem.classList.remove('clickable');

    winner.textContent = `Player ${currentMark} won!`;
    return playerIsX ? gameState.X_WON : gameState.O_WON;
  }

  if (blocks.some(i => i.mark === null)) {
    return gameState.NOT_ENDING;
  }

  winner.textContent = `Draw!`;
  return gameState.DRAW;
}

for (let i = 0; i < 9; ++i) {
  blocks[i].elem.classList.add('clickable');

  blocks[i].elem.addEventListener('click', event => {
    if (currentState === gameState.NOT_ENDING && !blocks[i].mark) {
      blocks[i].mark = blocks[i].elem.textContent = playerIsX ? 'X' : 'O';
      blocks[i].elem.classList.remove('preview');
      blocks[i].elem.classList.remove('clickable');
      currentState = checkState(i);
      playerIsX = !playerIsX;
    }
  });

  blocks[i].elem.addEventListener('mouseover', event => {
    if (currentState === gameState.NOT_ENDING && !blocks[i].mark) {
      event.target.textContent = playerIsX ? 'X' : 'O';
      event.target.classList.add('preview');
    }
  });

  blocks[i].elem.addEventListener('mouseout', event => {
    event.target.textContent = blocks[i].mark || '';
    event.target.classList.remove('preview');
  });
}
