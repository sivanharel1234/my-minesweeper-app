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
    getGameSettingsErrorMessage(gameSettings) {
        const totalNumberOfCells = gameSettings.width * gameSettings.height;
        let errorMessage = '';

        if (gameSettings.width <= 0 || gameSettings.width > 300) {
            errorMessage = 'Width must be between 1 and 300. Please enter a valid number \n\n';
        }
        if (gameSettings.height <= 0 || gameSettings.height > 300) {
            errorMessage += 'Height must be between 1 and 300. Please enter a valid number \n\n';
        }
        if (gameSettings.mines >= totalNumberOfCells) {
            errorMessage += 'Number of mines cannot reach the number of cells. Please enter a valid number \n\n';
        }
        if (gameSettings.mines <= 0) {
            errorMessage += 'Number of mines must be greater than 0. Please enter a valid number \n\n';
        }

        return errorMessage;
    }

    onStartGameButtonClick = (gameSettings) => {
        const errorMessage = this.getGameSettingsErrorMessage(gameSettings);
        if (errorMessage) {
            alert(errorMessage);
        } else {
            this.setState({
                boardWidth : gameSettings.width,
                boardHeight: gameSettings.height,
                numberOfMines: gameSettings.mines,
                numberOfRemainingFlags: gameSettings.mines,
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
                <div className="app-title">Minesweeper by Sivan Harel</div>
                <GameSettings
                    onStartButonClick={this.onStartGameButtonClick}
                />
                {this.renderBoard()}
            </div>
        );
    }
}

export default App;
