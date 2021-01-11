import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './Statmodal.css'
import Plot from 'react-plotly.js';
import Statinfo from './Statinfo'

function Statmodal({ ticker,fund, show, handleClose, tradeData, holdingData }) {
    const [nTrades, setNTrades] = useState(0);
    const [nBuyTrades, setNBuyTrades] = useState(0);
    const [nSellTrades, setNSellTrades] = useState(0);
    const [plotData, setPlotData] = useState([[[], []], [[], []]]);
    const [chartType, setChartType] = useState('action');
    const [layout, setLayout] = useState({})

    useEffect(() => {
        setNTrades(tradeData.length);
        let buy_trades = tradeData.filter(trade => trade.action === 'Buy');
        let sell_trades = tradeData.filter(trade => trade.action === 'Sell');
        setNBuyTrades(buy_trades.length);
        setNSellTrades(sell_trades.length);
        let w = window.innerWidth * 0.7;
        if(chartType === 'action'){
            setPlotData([
                {
                    type: 'bar',
                    x: buy_trades.map(data => data.date),
                    y: buy_trades.map(data => data.shares),
                    name: 'Buy',
                    marker: { color: 'green' }
                },
                {
                    type: 'bar',
                    x: sell_trades.map(data => data.date),
                    y: sell_trades.map(data => -data.shares),
                    name: 'Sell',
                    marker: { color: 'red' }
                }
            ])
            setLayout({
                width: w,
                barmode: 'stack',
                autosize: true,
                hovermode: 'x unified',
                plot_bgcolor: "#222838",
                paper_bgcolor: "#222838",
                font: {
                    family: "Open Sans, sans-serif",
                    size: 13,
                    color: "white"
                },
                yaxis: {
                    title:{
                        text: 'Shares'
                    },
                    zeroline: false,
                    gridcolor: '#6c6c6c',
                },
            });
        }else{
            let holdings = holdingData.map(data => data.holding);
            let min = Math.round(Math.min( ...holdings )*0.99),
                max = Math.round(Math.max( ...holdings )*1.01);
            setPlotData([
                {
                    type: 'bar',
                    x: holdingData.map(data => data.date),
                    y: holdings,
                    name: 'Holding',
                }
            ]);
            setLayout({
                width: w,
                barmode: 'stack',
                autosize: true,
                hovermode: 'x unified',
                plot_bgcolor: "#222838",
                paper_bgcolor: "#222838",
                font: {
                    family: "Open Sans, sans-serif",
                    size: 13,
                    color: "white"
                },
                yaxis: {
                    title:{
                        text: 'Shares'
                    },
                    zeroline: false,
                    gridcolor: '#6c6c6c',
                    range: [min, max]
                },
            });
        }
    },[chartType, tradeData, holdingData])

    return (
        <Modal
            dialogClassName="modal-90w"
            show={show}
            onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ticker}-{fund}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal__content">
                    <div className="modal__chart">
                        <div className="modal__summary">
                            <div className="modal__nTrades">
                                <p>No. Trades: {nTrades}</p>
                                <p>No. Buy/Sell: {nBuyTrades} / {nSellTrades}</p>
                            </div>
                            <div className="modal__chartSetting">
                                <Button onClick={() => setChartType('action')}>Action</Button>
                                <Button onClick={() => setChartType('holding')}>Holding</Button>
                            </div>
                        </div>
                        <Plot
                            data={plotData}
                            layout={layout}
                        />
                    </div>
                    <hr />
                    <div className="modal__stat">
                        <h4>Stat</h4>
                        <Statinfo ticker={ticker}/>
                    </div>
                </div>

            </Modal.Body >
        </Modal >
    )
}

export default Statmodal
