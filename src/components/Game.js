import React, { Component } from 'react';
import './Game.css';


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: null,
            score: 0,
            message: null,
            gameOver: false,
        };

    }
    initBoard() {
        let board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        board = this.placeRandom(this.placeRandom(board));
        this.setState({ board, score: 0, message: null, gameOver: false });
    }

    getBlankCoordinates(board) {
        const blankCoordinates = [];

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] === 0) { blankCoordinates.push([r, c]) }
            }
        }

        return blankCoordinates;
    }

    randomStartingNumber() {
        const startingNumbers = [2, 4];
        const randomNumber = startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
        return randomNumber;
    }

    placeRandom(board) {
        const blankCoordinates = this.getBlankCoordinates(board);
        const randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
        const randomNumber = this.randomStartingNumber();
        board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
        return board;
    }

    boardMoved(original, updated) {
        return (JSON.stringify(updated) !== JSON.stringify(original)) ? true : false;
      }
      
    move(direction) {
        if (!this.state.gameOver) {
            if (direction === 'up') {
                const movedUp = this.moveUp(this.state.board);
                if (this.boardMoved(this.state.board, movedUp.board)) {
                    const upWithRandom = this.placeRandom(movedUp.board);

                    if (this.checkForGameOver(upWithRandom)) {
                        this.setState({ board: upWithRandom, gameOver: true, message: 'Game over!' });
                    } else {
                        // eslint-disable-next-line
                        this.setState({ board: upWithRandom, score: this.state.score += movedUp.score });
                    }
                }
            } else if (direction === 'right') {
                const movedRight = this.moveRight(this.state.board);
                if (this.boardMoved(this.state.board, movedRight.board)) {
                    const rightWithRandom = this.placeRandom(movedRight.board);

                    if (this.checkForGameOver(rightWithRandom)) {
                        this.setState({ board: rightWithRandom, gameOver: true, message: 'Game over!' });
                    } else {
                        // eslint-disable-next-line
                        this.setState({ board: rightWithRandom, score: this.state.score += movedRight.score });
                    }
                }
            } else if (direction === 'down') {
                const movedDown = this.moveDown(this.state.board);
                if (this.boardMoved(this.state.board, movedDown.board)) {
                    const downWithRandom = this.placeRandom(movedDown.board);

                    if (this.checkForGameOver(downWithRandom)) {
                        this.setState({ board: downWithRandom, gameOver: true, message: 'Game over!' });
                    } else {
                        // eslint-disable-next-line
                        this.setState({ board: downWithRandom, score: this.state.score += movedDown.score });
                    }
                }
            } else if (direction === 'left') {
                const movedLeft = this.moveLeft(this.state.board);
                if (this.boardMoved(this.state.board, movedLeft.board)) {
                    const leftWithRandom = this.placeRandom(movedLeft.board);

                    if (this.checkForGameOver(leftWithRandom)) {
                        this.setState({ board: leftWithRandom, gameOver: true, message: 'Game over!' });
                    } else {
                        // eslint-disable-next-line
                        this.setState({ board: leftWithRandom, score: this.state.score += movedLeft.score });
                    }
                }
            }
        } else {
            this.setState(alert('Game over. Please start a new game.'));
        }
    }

    moveUp(inputBoard) {
        let rotatedRight = this.rotateRight(inputBoard);
        let board = [];
        let score = 0;

        for (let r = 0; r < rotatedRight.length; r++) {
            let row = [];
            for (let c = 0; c < rotatedRight[r].length; c++) {
                let current = rotatedRight[r][c];
                (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }

        for (let r = 0; r < board.length; r++) {
            for (let c = board[r].length - 1; c >= 0; c--) {
                if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c - 1] = 0;
                    score += board[r][c];
                } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
                    board[r][c] = board[r][c - 1];
                    board[r][c - 1] = 0;
                }
            }
        }

        board = this.rotateLeft(board);

        return { board, score };
    }

    moveRight(inputBoard) {
        let board = [];
        let score = 0;

        for (let r = 0; r < inputBoard.length; r++) {
            let row = [];
            for (let c = 0; c < inputBoard[r].length; c++) {
                let current = inputBoard[r][c];
                (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }

        for (let r = 0; r < board.length; r++) {
            for (let c = board[r].length - 1; c >= 0; c--) {
                if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c - 1] = 0;
                    score += board[r][c];
                } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
                    board[r][c] = board[r][c - 1];
                    board[r][c - 1] = 0;
                }
            }
        }

        return { board, score };
    }

    moveDown(inputBoard) {
        let rotatedRight = this.rotateRight(inputBoard);
        let board = [];
        let score = 0;

        for (let r = 0; r < rotatedRight.length; r++) {
            let row = [];
            for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
                let current = rotatedRight[r][c];
                (current === 0) ? row.push(current) : row.unshift(current);
            }
            board.push(row);
        }

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board.length; c++) {
                if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c + 1] = 0;
                    score += board[r][c];
                } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
                    board[r][c] = board[r][c + 1];
                    board[r][c + 1] = 0;
                }
            }
        }

        board = this.rotateLeft(board);

        return { board, score };
    }

    moveLeft(inputBoard) {
        let board = [];
        let score = 0;

        for (let r = 0; r < inputBoard.length; r++) {
            let row = [];
            for (let c = inputBoard[r].length - 1; c >= 0; c--) {
                let current = inputBoard[r][c];
                (current === 0) ? row.push(current) : row.unshift(current);
            }
            board.push(row);
        }

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board.length; c++) {
                if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c + 1] = 0;
                    score += board[r][c];
                } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
                    board[r][c] = board[r][c + 1];
                    board[r][c + 1] = 0;
                }
            }
        }

        return { board, score };
    }

    rotateRight(matrix) {
        let result = [];

        for (let c = 0; c < matrix.length; c++) {
            let row = [];
            for (let r = matrix.length - 1; r >= 0; r--) {
                row.push(matrix[r][c]);
            }
            result.push(row);
        }

        return result;
    }

    rotateLeft(matrix) {
        let result = [];

        for (let c = matrix.length - 1; c >= 0; c--) {
            let row = [];
            for (let r = matrix.length - 1; r >= 0; r--) {
                row.unshift(matrix[r][c]);
            }
            result.push(row);
        }

        return result;
    }

    checkForGameOver(board) {
        let moves = [
            this.boardMoved(board, this.moveUp(board).board),
            this.boardMoved(board, this.moveRight(board).board),
            this.boardMoved(board, this.moveDown(board).board),
            this.boardMoved(board, this.moveLeft(board).board)
        ];

        return (moves.includes(true)) ? false : true;
    }

    componentWillMount() {
        this.initBoard();
        const body = document.querySelector('body');
        body.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(e) {
        const up = 38;
        const right = 39;
        const down = 40;
        const left = 37
        const n = 78;

        if (e.keyCode === up) {
            this.move('up');
        } else if (e.keyCode === right) {
            this.move('right');
        } else if (e.keyCode === down) {
            this.move('down');
        } else if (e.keyCode === left) {
            this.move('left');
        } else if (e.keyCode === n) {
            this.initBoard();
        }
    }



  render() {

    return (
        <div classname="container">
            <div className="score">Score: {this.state.score}</div>
            <div className="button" onClick={() => { this.initBoard() }}>New Game</div>

            <table>
                {this.state.board.map((row, i) => (<Row key={i} row={row} />))}
            </table>

            <div className="buttons">
                <div className="button" onClick={() => { this.move('up') }}>Up</div>
                <div className="button" onClick={() => { this.move('right') }}>Right</div>
                <div className="button" onClick={() => { this.move('down') }}>Down</div>
                <div className="button" onClick={() => { this.move('left') }}>Left</div>
            </div>

            <p>{this.state.message}</p>
        </div>  
    );
  }
};

const Row = ({ row }) => {
    return (
        <tr>
            {row.map((cell, i) => (<Cell key={i} cellValue={cell} />))}
        </tr>
    );
};

const Cell = ({ cellValue }) => {
    let color = 'cell';
    let value = (cellValue === 0) ? '' : cellValue;
    if (value) {
        color += ` color-${value}`;
    }

    return (
        <td>
            <div className={color}>
                <div className="number">{value}</div>
            </div>
        </td>
    );
};



export default Game;