import React from 'react';
import '../assets/scss/GameSettings.scss';

class GameSettings extends React.Component {
    state = {
        width: '',
        height: '',
        mines: '',
    };

    onWidthInputChange = (event) => {
        this.setState({ width: Number(event.target.value) });
    };

    onHeightInputChange = (event) => {
        this.setState({ height: Number(event.target.value) });
    };

    onMinesInputChange = (event) => {
        this.setState({ mines: Number(event.target.value) });
    };

    onStartGameButtonClick = () => {
        this.props.onStartButonClick(this.state);
    };

    render() {
        return (
            <div className="game-settings">
                <div className="title">Settings:</div>
                <div className="width-container">
                    <div className="label">Width:</div>
                    <input className="width-input" type="number" value={this.state.width} onChange={this.onWidthInputChange}></input>
                </div>
                <div className="height-container">
                    <div className="label">Height:</div>
                    <input className="height-input" type="number" value={this.state.height} onChange={this.onHeightInputChange}></input>
                </div>
                <div className="mines-container">
                    <div className="label">Mines:</div>
                    <input className="mines-input" type="number" value={this.state.mines} onChange={this.onMinesInputChange}></input>
                </div>
                <button onClick={this.onStartGameButtonClick}>Start a new game</button>
            </div>
        );
    }
}

export default GameSettings;