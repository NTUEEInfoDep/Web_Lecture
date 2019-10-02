let playerIsX = true;
let gameOver = false;
let boxDiv = []; // Stores all the box divs.
let winnerDiv = document.getElementById("winner");
let boardDiv = document.getElementById("board");
let boardLength = 3;

const setAttributes = (elem, attrs) => {
    /**
     * Set multiple attributes for an HTML element
     * 
     * @param {Object} elem The HTML element.
     * @param {Object} attrs The attributes to add to the element.
     */

    for(var key in attrs) elem.setAttribute(key, attrs[key]);
}

const resetGameState = () => {
    /**
     * Reset the game state for tic tac toe.
     */

    gameOver = false;
    playerIsX = true;
    boxDiv = [];
    // Remove board from HTML
    while(boardDiv.firstChild) boardDiv.removeChild(boardDiv.firstChild);
    // Remove winner text from HTML
    if(winnerDiv.firstChild) winnerDiv.removeChild(winnerDiv.firstChild);
}

const updateBoardLength = inc => {
    /**
     * Update the board length by inc.
     * 
     * @param {Nunmber} inc Increment of board length.
     */
    let newBoardLength = boardLength + inc;
    if(newBoardLength <= 1 || newBoardLength > 10) return;
    resetGameState();
    // Draw the board.
    boardLength = newBoardLength;
    document.getElementById('board_length').textContent = `Board length: ${boardLength}`;
    renderBoard(boardLength);
}

const renderBoard = boardLength => {
    /**
     * Draw the board and setup.
     * 
     * @param {Number} boardLength The size of the board (measured by number 
     *                             of boxes / cells in each row / column).
     */

    let boxSize = 300 / boardLength;
    for(let i = 0; i < boardLength; ++i){
        // Create a row-container.
        let newContainerDiv = document.createElement('div');
        newContainerDiv.setAttribute('class', 'container');
        for(let j = 0; j < boardLength; ++j){
            // Fill up the row container with boxes.
            let newBoxDiv = document.createElement('div');
            setAttributes(newBoxDiv, {'class': 'box', 'id': `box${i * boardLength + j}`});
            newBoxDiv.style.height = `${boxSize}px`;
            newBoxDiv.style.width = `${boxSize}px`;
            newBoxDiv.style.fontSize = `${boxSize / 2}px`;
            // Add a callback function to each box div.
            newBoxDiv.addEventListener('click', event => {
                if(!gameOver && newBoxDiv.textContent === ""){
                    newBoxDiv.textContent = playerIsX ? "X" : "O"
                    playerIsX = !playerIsX;
                    checkWin();
                }
            });
            boxDiv.push(newBoxDiv);
            newContainerDiv.appendChild(newBoxDiv);
        }
        boardDiv.appendChild(newContainerDiv);
    }
}

const renderWinner = line => {
    /**
     * Show the winner text and winning line.
     * 
     * @param {Array[Object]} line An array of HTML elements. 
     */

    winnerDiv.textContent = `Player ${line[0].textContent} wins!`;
    for(let i = 0; i < boardLength; ++i) line[i].style.backgroundColor = "rgb(139, 182, 252)";
    gameOver = true;
}

const checkLine = arr => ((arr[0].textContent != "") && arr.every(v => v.textContent === arr[0].textContent));

const checkWin = () => {
    /**
     * Check if current board state is gameover (someone wins).
     */
    let leftDiag = [];
    let rightDiag = [];
    for(let i = 0; i < boardLength; ++i){
        let col = [];
        let row = [];
        for(let j = 0; j < boardLength; ++j){
            row.push(boxDiv[i * boardLength + j]);
            col.push(boxDiv[j * boardLength + i]);
        }
        if(checkLine(row)) renderWinner(row);
        else if(checkLine(col)) renderWinner(col);
        leftDiag.push(boxDiv[i * boardLength + i]);
        rightDiag.push(boxDiv[(boardLength - 1) * (i + 1)]);
    }
    if(checkLine(leftDiag)) renderWinner(leftDiag);
    else if (checkLine(rightDiag)) renderWinner(rightDiag);
}