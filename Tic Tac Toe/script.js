document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const gameStatus = document.getElementById('game-status');
    const playerXScoreElement = document.getElementById('playerX-score');
    const playerOScoreElement = document.getElementById('playerO-score');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let playerXScore = 0; // Initialize Player X score
    let playerOScore = 0; // Initialize Player O score

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const index = event.target.dataset.index;

        // Prevent clicking on an already filled cell or if the game is over
        if (board[index] !== '' || !gameActive) {
            return;
        }

        // Update the board and UI
        board[index] = currentPlayer;
        event.target.innerText = currentPlayer;
        event.target.classList.add(currentPlayer.toLowerCase());

        checkResult();
    }

    function checkResult() {
        let roundWon = false;

        // Check if any winning condition is met
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            // Show message for the winning player
            gameStatus.innerText = `Player ${currentPlayer} Wins!`;
            gameStatus.style.color = currentPlayer === 'X' ? '#007bff' : '#dc3545'; // Blue for X, Red for O

            // Update the score
            if (currentPlayer === 'X') {
                playerXScore++;
                playerXScoreElement.innerText = `Player X: ${playerXScore}`;
            } else {
                playerOScore++;
                playerOScoreElement.innerText = `Player O: ${playerOScore}`;
            }

            gameActive = false; // Stop the game after winning
            return;
        }

        // Check for a draw (when no more empty spaces and no winner)
        if (!board.includes('')) {
            gameStatus.innerText = "It's a Draw!";
            gameStatus.style.color = '#ffc107'; // Yellow for draw
            gameActive = false;
            return;
        }

        // Switch players if no one has won
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.innerText = `Player ${currentPlayer}'s Turn`;
        gameStatus.style.color = '#fff'; // Reset color to default
    }

    function resetGame() {
        // Reset the game state
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        gameStatus.innerText = `Player X's Turn`;
        gameStatus.style.color = '#fff'; // Default color for the game status
        cells.forEach(cell => {
            cell.innerText = ''; // Clear the text inside each cell
            cell.classList.remove('x', 'o'); // Remove X or O classes
        });
    }

    // Event listeners for each cell
    cells.forEach(cell => cell.addEventListener('click', handleClick));

    // Event listener for the reset button
    resetButton.addEventListener('click', resetGame);
});
