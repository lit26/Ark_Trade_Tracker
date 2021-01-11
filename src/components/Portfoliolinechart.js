import React,{useEffect, useState} from 'react'
import Plot from 'react-plotly.js';

function Portfoliolinechart({data}) {
    const [chartData, setChartData] = useState([])

    useEffect(() =>  {
        let fundData = [];
        let allfunds = ['ARKK','ARKQ','ARKW','ARKG','ARKF','PRNT','IZRL'];
        allfunds.map(fundValue =>{
            let temp = data.filter(trade => trade.fund === fundValue);
            if (temp.length > 0){
                let xValue = [];
                let yValue = [];
                temp.reverse().map(value => {
                    xValue.push(value['date']);
                    yValue.push(value['weight(%)'])
                    return '';
                })
                fundData.push({
                    type: 'scatter',
                    x: xValue,
                    y: yValue,
                    name: fundValue,
                    showlegend:false,
                })
                
            }
            return '';
        })
        setChartData(fundData);

    },[data])
    return (
        <Plot
            data={chartData}
            layout={{
                width: 250,
                height: 300,
                autosize: true,
                automargin: true,
                hovermode: 'x unified',
                margin: {
                    l: 20, r: 10, b: 40, t: 10
                },
                // hovermode: 'closest',
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
    )
}

export default Portfoliolinechart
