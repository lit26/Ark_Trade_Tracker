import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import './Display.css'
import Menu from './Menu'
import Tradetable from './Tradetable'
import Portfolio from './Portfolio'
import { useDispatch, useSelector } from 'react-redux'
import { TRADE_COLUMNS, HOLDING_COLUMNS } from './columns'

function Display() {
    const fund = useSelector(state => state.funds);
    const ticker = useSelector(state => state.ticker);
    const date = useSelector(state => state.date);
    const tableView = useSelector(state => state.tableView);
    const dispatch = useDispatch();
    const [alltrades, setAllTrades] = useState([]);
    const [trades, setTrades] = useState([]);
    const [columns, setColumns] = useState([]);

    const getData = (file) => {
        d3.csv(`https://raw.githubusercontent.com/lit26/Ark_Trade/main/ark_trading/Ark_trade_${file}`).then(function (data) {
            data.forEach(function (d) {
                d['No.'] = + d['No.'];
                d['holding'] = + d['holding'].toLocaleString();
                d['market value($)'] = + d['market value($)'];
                d['shares'] = + d['shares'];
                d['weight(%)'] = + d['weight(%)'];
                d['% change'] = + d['% change'];
            })
            setAllTrades(data);
        }).catch(err => {
            console.log(err)
        });
    }
    useEffect(() => {
        if (date === '') {
            let file = 'trades.csv'
            if (tableView === 'holding') {
                file = 'holdings.csv'
            }

            d3.csv(`https://raw.githubusercontent.com/lit26/Ark_Trade/main/${file}`).then(function (data) {
                data.forEach(function (d) {
                    d['holding'] = + d['holding'].toLocaleString();
                    d['market value($)'] = + d['market value($)'];
                    d['shares'] = + d['shares'];
                    d['weight(%)'] = + d['weight(%)'];
                    if(tableView === 'holding'){
                        d['% change'] =+ d['% change'];
                    }
                })
                setAllTrades(data);
            });

        } else {
            let file_date = date.split('-')
            let file = `${file_date[1]}-${file_date[2]}-${file_date[0]}.csv`
            getData(file)
        }

    }, [date, dispatch, tableView])

    useEffect(() => {
        let data = alltrades;
        if (tableView === 'trade') {
            if (date !== ''){
                data = data.filter(trade => trade.action !== 'Hold');
            }
            setColumns(TRADE_COLUMNS);
        } else {
            if (date !== ''){
                data = data.filter(trade => trade.action === 'Hold');
            }
            setColumns(HOLDING_COLUMNS);
        }
        if (ticker !== '') {
            data = data.filter(trade => trade.ticker === ticker)
        }
        if (fund !== 'All') {
            data = data.filter(trade => trade.fund === fund)
        }
        setTrades(data);
    }, [fund, date, ticker, tableView, alltrades])

    return (
        <div className="Display">
            <div className="Display__left">
                <Menu />
                <Tradetable trades={trades} table_columns={columns} />
            </div>
            <div className="Display__right">
                <Portfolio />
            </div>
        </div>
    )
}

export default Display
