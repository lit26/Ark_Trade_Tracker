import React,{useState, useEffect} from 'react'
import Plot from 'react-plotly.js';

function Portfoliochart({data}) {
    const [market, setMarket] = useState([]);
    const [text, setText] = useState([]);

    useEffect(() =>  {
        let market_text = [];
        let market_value = [];
        data.slice(0,10).map(value =>{
            market_text.push(value[0]);
            market_value.push(value[1]);
            return '';
        })
        setText(market_text);
        setMarket(market_value)
    },[data])

    return (
        <Plot
            data={[{
                type: 'pie',
                values: market,
                labels: text,
                name: "Portfolio",
                hole: 0.5,
                showlegend:false,
            }]}
            layout={{
                width: 250,
                height: 200,
                autosize: true,
                automargin: true,
                margin: {
                    l: 30, r: 30, b: 10, t: 10
                },
                hovermode: 'closest',
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
                // title: `Top 15 ${choice} Cases Summary`,
            }}
        />
    )
}

export default Portfoliochart
