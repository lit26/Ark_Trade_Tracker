import React, {useState, useEffect} from 'react'
import SortableTicker from './SortableTicker'
import './Watchlist.css'

function Watchlist({tickers}) {
    const [sortableTicker, setSortableTicker] = useState(null);

    useEffect(()=>{
        // load from storage
        // let tickers = ['TSLA']
        // if(localStorage.getItem("tickers") === null){
        //     localStorage.setItem("tickers", JSON.stringify(tickers));
        // }else{
        //     tickers = JSON.parse(localStorage.getItem("tickers"))
        // }
        setSortableTicker(<SortableTicker tickers={tickers}/>)
    }, [tickers])

    return (
        <div className="Watchlist">
            <div className="Watchlist__setting">
                <h4>Watchlist</h4>
            </div>
            <table>
                <thead className="Watchlist__header">
                    <tr>
                        <th>Symbol</th>
                        <td style={{width: '24px'}}></td>
                    </tr>
                </thead>
                {sortableTicker} 
            </table>
        </div>
    )
}

export default Watchlist
