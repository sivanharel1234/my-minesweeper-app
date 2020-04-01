import React from 'react';
import '../assets/scss/Cell.scss';
import flagImg from '../assets/images/flag.svg';
import mineImg from '../assets/images/mine.svg';

class Cell extends React.Component {

    onClick = (event) => {
        if (event.shiftKey) {
            this.props.onCellToggle(this.props.item);
        } else if (!this.props.item.isFlagged) {
                this.props.onCellClick(this.props.item);
        }
    };

    render() {
        let cellData = '';
        if (this.props.item.isMine) {
            cellData = <img className="mine-image" src={mineImg} alt="mine" />;
        }
        else if (!this.props.item.isEmpty) {
            cellData = <span className="mines-count">{this.props.item.minesCount}</span>;
        }
        const cellDataLayer = <div className="cell-data-layer">{cellData}</div>;
        const coverLayer = !this.props.item.isRevealed ? <div className="cell-cover-layer" onClick={this.onClick}></div> : '';
        const flagLayer = this.props.item.isFlagged ? <div className="cell-flag-layer" onClick={this.onClick}><img className="flag-image" src={flagImg} alt="flag"/></div> : '';

        return (
            <td className="cell">
                {cellDataLayer}
                {coverLayer}
                {flagLayer}
            </td>
        );
    }
}

export default Cell;