document.addEventListener('DOMContentLoaded', () => {

    const TURNS = {
        player: 'Player',
        computer: 'Computer',
    }

    let playerSymbol = 'X';
    let computerSymbol = 'O';

    let currentTurn = TURNS.player;
    let current = 1;

    let winner = '';

    const maxTurn = 9;

    const table = document.querySelectorAll('[data-field]');

    const restart = document.getElementById('restart');
    const restart_modal = document.getElementById('restart-modal');
    const X = document.getElementById('X');
    const O = document.getElementById('O');

    /*
     
        table ->
        [0][1][2]

        [3][4][5]

        [6][7][8]
     
    */

    const checkRow = () => {
        let row = [];

        for(let i = 0; i < 3; i++) {
            row = []
            for (let j = i * 3; j < i * 3 + 3; j++) {
                row.push(table[j]);
            }

            if (row.every(field => field.innerHTML === playerSymbol) || row.every(field => field.innerHTML === computerSymbol)) {
                winner = row[0];
                return true;
            }

        }

        return false

    }
    const checkColumn = () => {
        let column = [];

        for(let i = 0; i < 3; i++) {
            column = []
            for (let j = 0; j < 3; j++) {
                column.push(table[i + 3 * j]);
            }

            if (column.every(field => field.innerHTML === playerSymbol) || column.every(field => field.innerHTML === computerSymbol)) {
                winner = column[0];
                return true;
            }

        }

        return false;
    }
    const checkDiagonal = () => {
        let col1 = [table[0], table[4], table[8]];
        let col2 = [table[2], table[4], table[6]];
        for(let i = 0; i < 3; i++) {
            column = []

            column.push(table[i + 3]);

            if (col1.every(field => field.innerHTML === playerSymbol) || col1.every(field => field.innerHTML === computerSymbol)) {
                winner = col1[0];
                return true;
            }
            if (col2.every(field => field.innerHTML === playerSymbol) || col2.every(field => field.innerHTML === computerSymbol)) {
                winner = col1[0];
                return true;
            }

        }

        return false;
    }

    const checkWinner = () => {
        if(checkRow() || checkColumn() || checkDiagonal()) {
            console.log('winner: ' + winner.textContent);
            document.getElementById('overlay').style.display = 'flex';
            document.getElementById('winner').textContent = 'Winner: ' + winner.innerHTML + '!';
            return;
        } 
        if(current === maxTurn) {
            document.getElementById('overlay').style.display = 'flex';
            document.getElementById('winner').textContent = 'Tie!';
            return;
        }
        setTimeout(computerTurn, 500);
    };

    const computerTurn = () => {
        console.log(currentTurn);
        if(currentTurn === TURNS.computer) {
            let pos = Math.floor(Math.random() * 9);
            if(table[pos].innerHTML === '') {
                table[pos].textContent = computerSymbol;
                currentTurn = TURNS.player;
            } else {
                computerTurn();
            }
        } 
    };

    const setContent = (event) => {
        console.log('setting...');

        current++;

        if(currentTurn === TURNS.computer) {
            computerTurn();
        }

        if(currentTurn === TURNS.player && event.target.innerHTML === '') {
            event.target.textContent = playerSymbol;
            currentTurn = TURNS.computer;
        } 
        checkWinner();
    };

    table.forEach(item => {
        item.addEventListener('click', setContent);
    })

    X.addEventListener('click', () => {
        X.classList.add('act');
        O.classList.remove('act');

        playerSymbol = 'X';
        computerSymbol = 'O';

        currentTurn = TURNS.player;

        restartGame();
    });
    O.addEventListener('click', () => {
        O.classList.add('act');
        X.classList.remove('act');

        
        restartGame();
        
        playerSymbol = 'O';
        computerSymbol = 'X';

        currentTurn = TURNS.computer;
        computerTurn();
    });

    const restartGame = () => {
        console.log('restarting...');

        document.getElementById("overlay").style.display = "none";

        table.forEach(item => {
            item.textContent = '';
        });

        if(X.classList.contains('act')) {
            playerSymbol = 'X';
            computerSymbol = 'O';
    
            currentTurn = TURNS.player;
        } 
        if(O.classList.contains('act')) {
            playerSymbol = 'O';
            computerSymbol = 'X';
    
            currentTurn = TURNS.computer;
            setContent();
        }
    };

    restart.addEventListener('click', restartGame);
    restart_modal.addEventListener('click', restartGame);
    
});