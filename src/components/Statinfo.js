import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;

function Statinfo({ ticker }) {
    const [data, setData] = useState({});
    const [verticalVal, setVerticalVal] = useState([0,0])

    const counter = (arr) => {
        let a = [],
            b = [],
            prev;

        arr.sort();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== prev) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length - 1]++;
            }
            prev = arr[i];
        }

        return [a, b];
    }

    useEffect(() => {
        axios.get(`https://raw.githubusercontent.com/lit26/Ark_Trade/main/stat/${ticker}.json`)
            .then(res => {
                let daily_return = res.data.daily_return;
                let meanVal = average(res.data.daily_return).toFixed(1);
                let results = counter(daily_return);
                let maxVal = Math.max(...results[1]);
                setVerticalVal([meanVal, maxVal])
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [ticker])

    return (
        <div className="Statinfo">
            <div className="Statinfo__stat">
                <table>
                    <tbody>
                        <tr>
                            <td>Sharpe:</td>
                            <td>{data.sharpe}</td>
                        </tr>
                        <tr>
                            <td>Sortino:</td>
                            <td>{data.sortino}</td>
                        </tr>
                        <tr>
                            <td>Max Drawdown:</td>
                            <td>{data.max_drawdown}</td>
                        </tr>
                        <tr>
                            <td>Win Rate:</td>
                            <td>{data.win_rate}</td>
                        </tr>
                        <tr>
                            <td>Win Loss Ratio:</td>
                            <td>{data.win_loss_ratio}</td>
                        </tr>
                        <tr>
                            <td>Profit Factor:</td>
                            <td>{data.profit_factor}</td>
                        </tr>
                        <tr>
                            <td>Risk Return Ratio:</td>
                            <td>{data.risk_return_ratio}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="Statinfo__dist">
                <Plot
                    data={
                        [{
                            type: 'histogram',
                            x: data.daily_return,
                            xbins: {
                                size: 0.1,
                            },
                            name: 'Occurrence',
                        }]
                    }
                    layout={{
                        width: window.innerWidth * 0.5,
                        height: 200,
                        autosize: true,
                        automargin: true,
                        shapes: [{
                            type: 'line',
                            x0: verticalVal[0],
                            y0: 0,
                            x1: verticalVal[0],
                            y1: verticalVal[1],
                            line: {
                                color: 'red',
                                width: 1.5,
                            }
                        }],
                        margin: {
                            l: 30, r: 20, b: 20, t: 30
                        },
                        title: {
                            text: 'Daily Return Distribution'
                        },
                        yaxis:{
                            title: {text:'Occurrence'}
                        },
                        hovermode: 'x unified',
                        plot_bgcolor: "#222838",
                        paper_bgcolor: "#222838",
                        font: {
                            family: "Open Sans, sans-serif",
                            size: 13,
                            color: "white"
                        },
                        legend: {
                            font: {
                                color: "#CCCCCC", size: 10
                            },
                            orientation: "v",
                            bgcolor: "rgba(0,0,0,0)",
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default Statinfo
