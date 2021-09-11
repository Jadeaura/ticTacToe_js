const gameboard = (() => {

	let _board = ["","","","","","","","",""];

	const WIN_CONDITIONS = [[0,1,2],
							[3,4,5],
							[6,7,8],
							[0,3,6],
							[1,4,7],
							[2,5,8],
							[0,4,8],
							[2,4,6]];

	const board = () => { return _board };
	const changeBoard = (newBoard) => { _board = newBoard }

	const checkWin = () => {
		for (var i = WIN_CONDITIONS.length - 1; i >= 0; i--) {
			winState = WIN_CONDITIONS[i];
			// check to see that the first square has been filled
			if (_board[winState[0]] != ""){
				// if a win state has been reached
				if (_board[winState[0]] == _board[winState[1]] && _board[winState[0]] == _board[winState[2]]) {
					return {win:true, winner:_board[winState[0]]};
				}
			}
		}

		// if function hasn't returned already game must be tied or ongoing
		return {win:false};
	}

	return {
		board, checkWin, changeBoard
	};
})();

const displayController = (() => {

	const _board = [];

	const board = () => { return _board };

	const square_1 = document.querySelector("#square_1");
	const square_2 = document.querySelector("#square_2");
	const square_3 = document.querySelector("#square_3");
	const square_4 = document.querySelector("#square_4");
	const square_5 = document.querySelector("#square_5");
	const square_6 = document.querySelector("#square_6");
	const square_7 = document.querySelector("#square_7");
	const square_8 = document.querySelector("#square_8");
	const square_9 = document.querySelector("#square_9");

	board().push(square_1,square_2,square_3,square_4,square_5,square_6,square_7,square_8,square_9);

	const displayBoard = () => {
		for (var i = gameboard.board().length - 1; i >= 0; i--) {
			board()[i].innerHTML = gameboard.board()[i];
		}
	}

	return {
		displayBoard, board
	};
})();

// Main module doesn't return anything
const gameManager = (() => {

	console.log("gameManger initiated");

	let turnCount = 0;

	let turn = () => {
		if (turnCount % 2 == 0 || turnCount == 0) {
			return "X";
		} else {
			return "O";
		}
	};
	
	let incrementTurn = () => {
		turnCount++;
		if (turnCount > 4) {
			if (gameboard.checkWin().win == true) {
				// Lazy implementation becuase of constraint on how players must be handled
				let winnerName = "";
				if (gameboard.checkWin().winner == "X") {
					winnerName = document.querySelector("#player1name").value;
					if (winnerName == "") {
						winnerName = "X";
					}
				} else {
					winnerName = document.querySelector("#player2name").value;
					if (winnerName == "") {
						winnerName = "O";
					}
				}
				alert(`${winnerName} is the winner!`);
			}
		}
	}
	
	// Event driven game logic
	const squareClicked = (e) => {
		square = e.target;
		if (square.innerHTML != "X" && square.innerHTML != "O") {
			if (turn() == "X") {
				// Place an X
				square.innerHTML = "X"
				newBoard = gameboard.board();
				newBoard[square.getAttribute("value")] = "X";
				gameboard.changeBoard(newBoard);
			} else {
				// Place an O
				square.innerHTML = "O"
				newBoard = gameboard.board();
				newBoard[square.getAttribute("value")] = "O";
				gameboard.changeBoard(newBoard);
			}
			incrementTurn();
		}
	}

	const restart = () => {
		console.log("restart");
		gameboard.changeBoard(["","","","","","","","",""]);
		displayController.displayBoard();
		turnCount = 0;
	}

	// Add event listeners to the board
	for (var i = displayController.board().length - 1; i >= 0; i--) {
		displayController.board()[i].addEventListener("click", squareClicked);
	}

	// Add event listener to restart button
	document.querySelector("#restartBtn").addEventListener("click", restart);

	// display board
	displayController.displayBoard();

})();

const Player = (n) => {

	let _name = n;

	const name = () => { return _name }

	return {
		name
	};
}