let playerIsX = true;
let boxDiv = [];
let winnerDiv = document.getElementById("winner");

// Keep track of the state of each box in the board.
for(let i = 0; i < 9; ++i) {
    boxDiv.push({
            elem: document.getElementById(`box${i}`),
            mark: null,
        }
    );
}

boxDiv.map(item => {
    item.elem.addEventListener('click', event => {
        if(!item.mark){
            let check = playerIsX ? "X" : "O";
            item.elem.textContent = item.mark = check;
            playerIsX = !playerIsX;
            checkWin();
        }
    });
})

let checkWin = () => {
    let toCheck = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4 ,7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    toCheck.map(line => {
        if(boxDiv[line[0]].mark){
            if(boxDiv[line[0]].mark === boxDiv[line[1]].mark && boxDiv[line[0]].mark === boxDiv[line[2]].mark){
                let winner = boxDiv[line[0]].mark;
                winnerDiv.innerHTML = `Player ${winner} wins!`;
                for(let i = 0; i < 3; ++i) boxDiv[line[i]].elem.style.backgroundColor = "green";
            }
        }
    });
}