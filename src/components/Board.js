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

    onSupermanModeCheckboxChange = (event) => {
        this.setState({ isSupermanMode: event.target.checked });
    };

    onCellToggle = (item) => {
        if (this.state.flagsLefts === 0 && !item.isFlagged) {
            alert("You don't have any more flags. In order to add a flag for this cell you should first remove a flag from another cell.")
        } else {
            const updatedCellsArray = this.state.cellsArray;
            let updatedFlagsLefts = this.state.flagsLefts;
            let updatedFlaggedMinesCounter = this.state.flaggedMinesCounter;

            updatedCellsArray[item.point.x][item.point.y].isFlagged = !item.isFlagged;

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
        let updatedCellsArray = this.state.cellsArray;

        if (updatedCellsArray[item.point.x][item.point.y].isMine) {
            this.handleMineCellClick(updatedCellsArray, item.point.x, item.point.y)
        } else {
            this.revealAdjacentEmptyCells(updatedCellsArray, item.point.x, item.point.y);
            this.setState({cellsArray: updatedCellsArray});
        }
    };

    revealAdjacentEmptyCells(cellsArray, x, y) {
        if (this.isCellInBound(cellsArray, x, y) && !cellsArray[x][y].isRevealed){
            if (!cellsArray[x][y].isMine) {
                cellsArray[x][y].isRevealed = true;
            }
            if (cellsArray[x][y].isEmpty) {
                this.revealAdjacentEmptyCells(cellsArray, x+1, y); // right
                this.revealAdjacentEmptyCells(cellsArray, x+1, y-1); //right top
                this.revealAdjacentEmptyCells(cellsArray, x+1, y+1); // right bottom
                this.revealAdjacentEmptyCells(cellsArray, x, y-1); // top
                this.revealAdjacentEmptyCells(cellsArray, x, y+1); // bottom
                this.revealAdjacentEmptyCells(cellsArray, x-1, y); // left
                this.revealAdjacentEmptyCells(cellsArray, x-1, y-1); // left top
                this.revealAdjacentEmptyCells(cellsArray, x-1, y+1); // left bottom
            }
        }
    }
    handleMineCellClick(updatedCellsArray, x, y) {
        updatedCellsArray[x][y].isRevealed = true;
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
        for (let x = 0; x < this.props.width; x++) {
            const rowArray = [];
            for (let y = 0; y< this.props.height; y++) {
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
            if (!cellsArray[x][y].isMine) {
                cellsArray[x][y].isMine = true;
                minesCount++;
            }
        }
    }

    updateMinesCounts(cellsArray) {
        for (let x = 0; x < this.props.width; x++) {
            for (let y = 0; y < this.props.height; y++) {
                if(!cellsArray[x][y].isMine) {
                    cellsArray[x][y].minesCount = this.calculateAdjacentMines(cellsArray, x, y);
                    cellsArray[x][y].isEmpty = cellsArray[x][y].minesCount === 0;
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
        return this.isCellInBound(cellsArray, x, y) && cellsArray[x][y].isMine;
    }

    isCellInBound(cellsArray, x, y) {
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
            return (<tr key={row[0].point.x}>
                {row.map(cell => <Cell key={`${cell.point.x},${cell.point.y}`} item={cell} onCellClick={this.onCellClick} onCellToggle={this.onCellToggle} />)}
            </tr>)
        });
        return cellsTags;
    }

    render() {
        return (
            <div className="board">
                <div className="game-status">{this.getGameStatusLabel()}</div>
                <div className="superman-mode-checkbox-container">
                    <input type="checkbox" className="superman-mode-checkbox" name="superman-mode-checkbox" onChange={this.onSupermanModeCheckboxChange}/>
                    <label htmlFor="superman-mode-checkbox">Superman mode</label>
                </div>
                <div className="remaining-flags-indicator">
                    flags left: {this.state.flagsLefts}
                </div>
                <table className="board-container">
                    <tbody>
                        {this.renderTableCellsTags()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Board;