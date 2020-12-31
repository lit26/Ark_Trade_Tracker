import React, { useState, useEffect } from 'react'
import './Portfolio.css'
import axios from 'axios'
import * as d3 from 'd3';
import { useSelector, useDispatch } from 'react-redux'
import Portfoliochart from './Portfoliochart'
import { setTicker } from '../redux/action';

function Portfolio() {
    const fund = useSelector(state => state.funds);
    const date = useSelector(state => state.date);
    const [defaultDate, setDefaultDate] = useState([]);
    const [data, setData] = useState([]);
    const [market, setMarket] = useState([]);
    const dispatch = useDispatch();

    const getData = (file) => {
        d3.csv(`https://raw.githubusercontent.com/lit26/Ark_Trade/main/ark_holding/${file}`).then(function (data) {
            data.forEach(function (d) {
                d['market value($)'] = + d['market value($)'];
                d['shares'] = + d['shares'];
                d['weight(%)'] = + d['weight(%)'];
            })
            if (fund !== 'All') {
                data = data.filter(trade => trade.fund === fund)
            }
            setData(data);
        }).catch(err => {
            console.log(err)
        });
    }
    useEffect(() => {
        if (date === '') {
            axios.get('https://raw.githubusercontent.com/lit26/Ark_Trade/main/scripts/info.json')
                .then(res => {
                    getData(res.data['latest file']);
                    setDefaultDate(res.data['latest file'].split('_')[2].split('.')[0]);
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            let file_date = date.split('-');
            file_date = `${file_date[1]}-${file_date[2]}-${file_date[0]}`;
            getData(`Ark_holding_${file_date}.csv`);
            setDefaultDate(file_date);
        }
        // eslint-disable-next-line
    }, [date, fund])

    useEffect(() => {
        let market_value = []
        if (fund === 'All') {
            data.map((value) => {
                market_value.push([`${value['ticker']}-${value['fund']}`, value['market value($)']])
                return '';
            })
        } else {
            data.map((value) => {
                market_value.push([`${value['ticker']}`, value['market value($)']])
                return '';
            })
        }
        market_value.sort(function (first, second) {
            return second[1] - first[1];
        });
        setMarket(market_value)
    }, [data, fund])

    const clickHandler = (ticker) => {
        dispatch(setTicker(ticker.split('-')[0]))
    }

    return (
        <div className="Portfolio">
            <div className="Portfolio__setting">
                <h4 style={{ fontWeight: 'bold' }}>Portfolio</h4>
            </div>
            <div className="Portfolio__info">
                <div className="Portfolio__chart">
                    <Portfoliochart data={market} />
                </div>
                <table>
                    <thead className="Portfolio__header">
                        <tr>
                            <th>Symbol ({defaultDate})</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {market.slice(0, 15).map((value, index) => {
                            return (
                                <tr key={`watchlist_${index}`} onClick={() => clickHandler(value[0])}>
                                    <td>{value[0]}</td>
                                    <td>{value[1].toLocaleString('en-US',{style: 'currency', currency: 'USD'})}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Portfolio
