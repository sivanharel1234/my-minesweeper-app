import React from 'react';
import '../assets/scss/Board.scss';
import Cell from "./Cell";

class Board extends React.Component {
    state = {
        flagsLefts: this.props.numberOfRemainingFlags,
        cellsArray: this.initCellsArray(),
        flaggedMinesCounter: 0,
        isLost: false,
        isWon: false,
        isSupermanMode: false,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                flagsLefts: this.props.numberOfRemainingFlags,
                cellsArray: this.initCellsArray(),
                flaggedMinesCounter: 0,
                isLost: false,
                isWon: false,
                isSupermanMode: false,
            });
        }
    }

    onSupermanModeCheckboxChange = (event) => {
        this.setState({ isSupermanMode: event.target.checked });
    };

    onCellToggle = (item) => {
        if  (this.state.isWon || this.state.isLost) {
            return;
        }

        if (this.state.flagsLefts === 0 && !item.isFlagged) {
            alert("You don't have flags. /n In order to add a flag, you should first remove a flag from other cell.")
        } else {
            const updatedCellsArray = this.state.cellsArray;
            let updatedFlagsLefts = this.state.flagsLefts;
            let updatedFlaggedMinesCounter = this.state.flaggedMinesCounter;

            updatedCellsArray[item.point.y][item.point.x].isFlagged = !item.isFlagged;

            if (item.isFlagged) {
                updatedFlagsLefts--;
                if (item.isMine) {
                    updatedFlaggedMinesCounter++;
                }
            } else {
                updatedFlagsLefts++;
                if (item.isMine) {
                    updatedFlaggedMinesCounter--;
                }
            }

            const updatedIsWon = updatedFlaggedMinesCounter === this.props.numberOfMines;

            this.setState({cellsArray: updatedCellsArray, flagsLefts: updatedFlagsLefts, flaggedMinesCounter: updatedFlaggedMinesCounter, isWon: updatedIsWon})
        }
    };

    onCellClick = (item) => {
        if  (this.state.isWon || this.state.isLost) {
            return;
        }

        let updatedCellsArray = this.state.cellsArray;

        if (updatedCellsArray[item.point.y][item.point.x].isMine) {
            this.handleMineCellClick(updatedCellsArray, item.point.x, item.point.y)
        } else {
            this.revealAdjacentEmptyCells(updatedCellsArray, item.point.x, item.point.y);
            this.setState({cellsArray: updatedCellsArray});
        }
    };

    revealAdjacentEmptyCells(cellsArray, x, y) {
        cellsArray[y][x].isRevealed = true;

        if (cellsArray[y][x].isEmpty) {
            const adjacentCells = [{x, y}];
            while (adjacentCells.length > 0) {
                let cellCord = adjacentCells.shift();
                let neighbors = this.getCellsNeighbors(cellsArray, cellCord.x, cellCord.y);
                neighbors.forEach(neighbor => {
                    let neighborCell = cellsArray[neighbor.y][neighbor.x];
                    if (!neighborCell.isRevealed && !neighborCell.isMine) {
                        neighborCell.isRevealed = true;
                        if (neighborCell.isEmpty) {
                            adjacentCells.push(neighbor);
                        }
                    }
                })
            }
        }
    }

    getCellsNeighbors(cellsArray, x, y) {
        const neighbors = [];

        if (this.isCellInBound(x+1, y)) { // right
            neighbors.push({x: x + 1, y: y});
        }
        if (this.isCellInBound(x+1, y-1)) { //right top
            neighbors.push({x: x+1, y: y - 1});
        }
        if (this.isCellInBound(x+1, y+1)) { // right bottom
            neighbors.push({x: x+1, y: y + 1});
        }
        if (this.isCellInBound(x, y-1)) { // top
            neighbors.push({x: x, y: y - 1});
        }
        if (this.isCellInBound(x, y+1)) { // bottom
            neighbors.push({x: x, y: y + 1});
        }
        if (this.isCellInBound(x-1, y)) { // left
            neighbors.push({x: x - 1, y: y});
        }
        if (this.isCellInBound(x-1, y-1)) { // left top
            neighbors.push({x: x - 1, y: y - 1});
        }
        if (this.isCellInBound(x-1, y+1)) { // left bottom
            neighbors.push({x: x - 1, y: y + 1});
        }
         return neighbors;
    }

    handleMineCellClick(updatedCellsArray, x, y) {
        updatedCellsArray[y][x].isRevealed = true;
        this.setState({cellsArray: updatedCellsArray, isLost: true });
    }

    initCellsArray() {
        let cellsArray = this.createAnEmptyBoardArray();
        this.addRandomizedMines(cellsArray);
        this.updateMinesCounts(cellsArray);
        return cellsArray;
    }

    createAnEmptyBoardArray() {
        const cellsArray = [];
        for (let y = 0; y < this.props.height; y++) {
            const rowArray = [];
            for (let x = 0; x< this.props.width; x++) {
                rowArray.push({
                    point: { x, y },
                    isRevealed: false,
                    isFlagged: false,
                    isEmpty: false,
                    isMine: false,
                    minesCount: 0,
                })
            }
            cellsArray.push(rowArray);
        }
        return cellsArray;
    }

    addRandomizedMines(cellsArray) {
        let minesCount = 0;

        while (minesCount < this.props.numberOfMines) {
            let x = Math.floor(Math.random() * this.props.width);
            let y = Math.floor(Math.random() * this.props.height);
            if (!cellsArray[y][x].isMine) {
                cellsArray[y][x].isMine = true;
                minesCount++;
            }
        }
    }

    updateMinesCounts(cellsArray) {
        for (let y = 0; y < this.props.height; y++) {
            for (let x = 0; x < this.props.width; x++) {
                if(!cellsArray[y][x].isMine) {
                    cellsArray[y][x].minesCount = this.calculateAdjacentMines(cellsArray, x, y);
                    cellsArray[y][x].isEmpty = cellsArray[y][x].minesCount === 0;
                }
            }
        }
    }

    calculateAdjacentMines(cellsArray, x, y) {
        return this.isMine(cellsArray, x+1, y) + // right
            this.isMine(cellsArray, x+1, y-1) + //right top
            this.isMine(cellsArray, x+1, y+1) + // right bottom
            this.isMine(cellsArray, x, y-1) + // top
            this.isMine(cellsArray, x, y+1) + // bottom
            this.isMine(cellsArray, x-1, y) + // left
            this.isMine(cellsArray, x-1, y-1) + // left top
            this.isMine(cellsArray, x-1, y+1); // left bottom
    }

    isMine(cellsArray, x, y) {
        return this.isCellInBound(x, y) && cellsArray[y][x].isMine;
    }

    isCellInBound(x, y) {
        return x < this.props.width &&  x >= 0 &&
            y < this.props.height && y >= 0;
    }

    getGameStatusLabel() {
        let gameStatus = '';
        if (this.state.isLost) {
            gameStatus = 'You lost, let\'s start a new game';
        } else if (this.state.isWon) {
            gameStatus = 'You won!!!';
        }
        return gameStatus;
    }

    renderTableCellsTags() {
        const cellsTags = this.state.cellsArray.map((row) => {
            return (<tr key={row[0].point.y}>
                {row.map(cell => <Cell key={`${cell.point.x},${cell.point.y}`} item={cell} onCellClick={this.onCellClick} onCellToggle={this.onCellToggle} />)}
            </tr>)
        });
        return cellsTags;
    }

    render() {
        const boardClass = this.state.isSupermanMode ? "board-container superman-mode" : "board-container";
        const cellWidth = 18;

        return (
            <div className="board">
                <div className="game-status">{this.getGameStatusLabel()}</div>
                <div className="superman-mode-checkbox-container">
                    <input type="checkbox" className="superman-mode-checkbox" id="superman-mode-checkbox" checked={this.state.isSupermanMode} onChange={this.onSupermanModeCheckboxChange}/>
                    <label htmlFor="superman-mode-checkbox">Superman mode</label>
                </div>
                <div className="remaining-flags-indicator">
                    flags left: {this.state.flagsLefts}
                </div>
                <table className={boardClass} style={{minWidth: this.props.width * cellWidth}}>
                    <tbody>
                        {this.renderTableCellsTags()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Board;