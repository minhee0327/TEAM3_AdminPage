import React, { Component } from "react";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

class BarChart1 extends Component{
    chart = null;
    //AdminClientSalesChart4에서 데이터 받아옵니다.
    //AdiminClientSalesAnalysis.js에 첫번째 그래프 출력정보입니다.
    draw(){
        if(this.chart){
            this.chart.destroy();
            this.chart = null;
        }
        const {data, pair,data2} = this.props;

        const config = {
            type:"bar",
            data: {
                labels: data.map(d => d.date),
                datasets: [
                {
                    label: "매출액",
                    data: data.map(d => d.value),
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 0.6)',
                    lineTension: 0,
                    pointRadius: 0
                },
                {
                    label: "환불액",
                    data: data2.map(d => d.value2),
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                    lineTension: 0,
                    pointRadius: 0,
                }
                ]
            },
            plugins:[
                ChartDataLabels
            ],
            options:{
                responsive: true,
                title: {
                    display: true,
                    text: `${pair} 매출액`
                },
                tooltips: {
                    mode: "index",
                    intersect: false
                },
                hover: {
                    mode: "nearest",
                    intersect: true
                },
                plugins:{
                    datalabels: {
                        formatter : function(value,ctx){
                            return null;
                        }
                    }
                },
                scales:{
                    xAxes:[{
                        display: true,
                        /*
                        id:'newId',
                        gridLines:{
                            lineWidth:0
                        }
                        */
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            scaleBeginAtZero : true,
                            beginAtZero: true
                        }
                    }]
                }
            }
        };
        const ctx = this.canvas.getContext("2d");
        this.chart = new Chart(ctx, config);
    }
    componentDidMount(){
        this.draw();
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.data !== this.props.data){
            this.draw();
        }
    }
    componentWillUnmount(){
        if(this.chart){
            this.chart.destroy();
        }
    }
    render(){
        return(
            <div className="">
                <canvas ref = {ref => (this.canvas = ref)}/>
            </div>
        );
    }
}

export default BarChart1;