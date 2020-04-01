import React from 'react';
import '../assets/scss/Cell.scss';
import flagImg from '../assets/images/flag.svg';
import mineImg from '../assets/images/mine.svg';

class Cell extends React.Component {

    getRelevantCell() {
        if (!this.props.item.isRevealed) {
            return this.props.item.isFlagged ?
                <div className="cell-data covered"><img className="flag-image covered" src={flagImg} alt="flag" onClick={this.onClick} /></div> :
                <div className="cell-data covered" onClick={this.onClick}></div>;
        }

        if (this.props.item.isMine) {
            return <div className="cell-data"><img className="mine-image" src={mineImg} alt="mine" /></div>
        }

        const cellData = this.props.item.isEmpty ? '' : this.props.item.minesCount;
        return <div className="cell-data">{cellData}</div>;
    }

    onClick = (event) => {
        event.stopPropagation();

        if (event.shiftKey) {
            this.props.onCellToggle(this.props.item);
        } else if (!this.props.item.isFlagged) {
                this.props.onCellClick(this.props.item);
        }
    };

    render() {
        return (
            <td className="cell">
                {this.getRelevantCell()}
            </td>
        );
    }
}

export default Cell;