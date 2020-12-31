import React,{useState, useEffect} from 'react'
import Plot from 'react-plotly.js';

function Portfoliochart({data}) {
    const [market, setMarket] = useState([]);
    const [text, setText] = useState([]);
    const [hoverText, setHoverText] = useState([]);

    useEffect(() =>  {
        let market_text = [];
        let market_value = [];
        let hover_text = [];
        data.slice(0,10).map(value =>{
            market_text.push(value[0]);
            market_value.push(value[1]);
            hover_text.push(`${value[0]}<br>` +
            `${value[1].toLocaleString('en-US',{style: 'currency', currency: 'USD'})}<br>`)
            return '';
        })
        setText(market_text);
        setMarket(market_value);
        setHoverText(hover_text);
    },[data])

    return (
        <Plot
            data={[{
                type: 'pie',
                values: market,
                labels: text,
                textinfo:'percent',
                hoverinfo: 'text',
                text: hoverText,
                name: "Portfolio",
                hole: 0.5,
                showlegend:false,
            }]}
            layout={{
                width: 200,
                height: 200,
                autosize: true,
                automargin: true,
                margin: {
                    l: 10, r: 10, b: 10, t: 10
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
