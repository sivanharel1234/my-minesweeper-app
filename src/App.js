import React from 'react';
import './assets/scss/App.scss';
import GameSettings from './components/GameSettings';
import Board from "./components/Board";

class App extends React.Component {
    state = {
        boardWidth: 0,
        boardHeight: 0,
        numberOfMines: 0,
        numberOfRemainingFlags: 0,
        shouldDisplayBoard: false,
    };
    onStartGameButtonClick = (gameSettings) => {
        const totalNumberOfCells = gameSettings.width * gameSettings.height;
        if (gameSettings.numberOfMines < totalNumberOfCells && gameSettings.numberOfMines > 0) {
            alert('The numbers of mines must be a number between 0 to the total number of cells. Please enter a valid number');
        }
        else {
            this.setState({
                boardWidth : Number(gameSettings.width),
                boardHeight: Number(gameSettings.height),
                numberOfMines: Number(gameSettings.mines),
                numberOfRemainingFlags: Number(gameSettings.mines),
                shouldDisplayBoard: true,
            });
        }
    };

    renderBoard() {
        if(this.state.shouldDisplayBoard) {
            return (
                <Board
                width={this.state.boardWidth}
                height={this.state.boardHeight}
                numberOfMines={this.state.numberOfMines}
                numberOfRemainingFlags={this.state.numberOfRemainingFlags}
            />
            );
        }
        return null;
    }

    render() {
        return (
            <div className="my-minesweeper-app">
                <div className="app-title">Minesweeper:</div>
                <GameSettings
                    onStartButonClick={this.onStartGameButtonClick}
                />
                {this.renderBoard()}
            </div>
        );
    }
}

export default App;
