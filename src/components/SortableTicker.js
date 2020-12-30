import React, { Component } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import WatchlistRow from './WatchlistRow'

const SortableItem = sortableElement(({ value }) => {
    return (
        <WatchlistRow
            ticker={value}
        />
    )
});

const SortableContainer = sortableContainer(({ children }) => {
    return <tbody className="Watchlist__main">{children}</tbody>;
});

class SortableTicker extends Component {
    state = {
        tickers: this.props.tickers,
        data: this.props.data
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ tickers }) => ({
            tickers: arrayMove(tickers, oldIndex, newIndex),
        }));
    };

    render() {
        const { tickers} = this.state;
        localStorage.setItem("tickers", JSON.stringify(tickers));

        return (
            <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                {tickers.map((value, index) => (
                    <SortableItem key={`item-${value }`} index={index} value={value} />
                ))}
            </SortableContainer>
        );
    }
}

export default SortableTicker