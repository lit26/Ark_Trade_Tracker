import React from 'react'
import {useDispatch} from 'react-redux'
import {setTicker} from '../redux/action';
import {sortableHandle} from 'react-sortable-hoc';
import MenuIcon from '@material-ui/icons/Menu';

const DragHandle = sortableHandle(() => <span><MenuIcon /></span>);

function WatchlistRow({ticker}) {
    const dispatch = useDispatch();

    return (
        <tr onClick={() => dispatch(setTicker(ticker))} className="WatchlistRow">
            <td>{ticker}</td>
            <td><DragHandle /></td>
        </tr>
    )
}

export default WatchlistRow
