const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");  //1-3 sets variables to manipulate the cells, status text, and restart button on the document
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],                                              //4-13 sets a variable that equals an array setting all the conditions for winning
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];         // 15 turns the cells into strings
let currentPlayer = "X";                                    // 16 makes the first player X
let running = false;                                        // 17 makes the game not run

initializeGame();                                           // 18 triggers the function to initialize the game

function initializeGame(){                                                     // 21-26 sets what the initialize game function does
    cells.forEach(cell => cell.addEventListener("click", cellClicked));       // 22 makes each of the cell pay attention to when clicked
    restartBtn.addEventListener("click", restartGame);                       // 23 adds an event listener for when the restart button is clicked
    statusText.textContent = `${currentPlayer}'s turn`;                     // 24 modifies the status text to reflect which player turn it is
    running = true;                                                         // 25 sets the game in the running mode
}                                                                           // 26 closes the function initializeGame


function cellClicked(){                                                     // 29 -38 sets what to do when a cell is clicked
    const cellIndex = this.getAttribute("cellIndex");                      // 30 sets a variable cell index

    if(options[cellIndex] != "" || !running){                              // 32-34 sets an if statement contining that cell must be empty to be clicked
        return;
    }

    updateCell(this, cellIndex);                                           // 36 sets a callback with the arguments this and cell Index
    checkWinner();                                                         // 37 triggers a function that checks for the winner
}                                                                          //38 closes off the function cellClicked


function updateCell(cell, index){                                           // 41-44 sets a function called updateCell with the parameters cell and index and what occurs when called
    options[index] = currentPlayer;                                         // 42 set the cell to be updated based on current players tag X or O
    cell.textContent = currentPlayer;                                       // 43 modifies the text content of the cell to show the mark of the current player
}                                                                           // 44 closes off the function updateCell


function changePlayer(){                                                    // 47-50 sets a function that changes the player
    currentPlayer = (currentPlayer == "X") ? "O" : "X";                     // 48 switches the current player from X to O
    statusText.textContent = `${currentPlayer}'s turn`;                     // 49 modifes the text content to reflect when a switch is made
}                                                                           // 50 closes off the function changePlayer


function checkWinner(){                                                     // 53-82 consist of a function that checks for the winner
    let roundWon = false;                                                   // 54 lets the function trigger only if the boolean is false(the round has not been won) 

    for(let i = 0; i < winConditions.length; i++){                         // 56 sets a for loop for the array consisting of the win conditions(from index of 0 to the end with an step interval of 1)
        const condition = winConditions[i];
        const cellA = options[condition[0]];                              // 57-60 checks if the current condtion match one of the win conditions array
        const cellB = options[condition[1]];                             
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){                     // 62-63 if cell A,B, or C equal an empty string continue going through the loop
            continue;
        }
        if(cellA == cellB && cellB == cellC){                              // 65-68 set another if statement for if cells A,B, and C are equal the the round is won and break out of loop
            roundWon = true;
            break;
        }
    }

    if(roundWon){                                                          // 71-74 if the round is won display the current player wins game (since logic is set to check if won after every move)
        statusText.textContent = `${currentPlayer} wins!`;                 // and terminate game
        running = false;
    }
    else if(!options.includes("")){                                       // 75-78  is an else if statement if the options are not blank and all above trigger a draw message and end the round
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{                                                                  // 79-82 is an else statement triggerring the changePlayer function
        changePlayer();
    }
}


function restartGame(){       
    currentPlayer = "X";                                                    // 85-91 is a function that restarts the game by switching the current play back to X, clearing out the options array, status dispalying the current player turn() which would be X, 
    options = ["", "", "", "", "", "", "", "", ""];                        //clearing out the markings on each cell (Xs or Os) to an empty string and restart the games status to running
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}


    