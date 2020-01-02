import React, { Component } from "react";
import Chart from "chart.js";

let date = new Date();
let dd = date.getDate();

class BarChart4 extends Component{
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
                labels: [dd-2,dd-1,dd],
                datasets: [
                {
                    label: "매출액",
                    data: data.map(d => d.value),
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 0.6)',
                    lineTension: 0,
                    pointRadius: 0,
                    datalabels: {
                        color: '#FFCE56'
                    }
                    //barPercentage: 0.5
                },
                {
                    label: "환불액",
                    data: data2.map(d => d.value2),
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                    lineTension: 0,
                    pointRadius: 0,
                    //barPercentage: 0.5
                }
                ]
            },
            options:{
                responsive: true,
                title: {
                    display: true,
                    text: `${pair} 매출액`
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
         
                },
                hover: {
                    mode: "nearest",
                    intersect: true
                },
                //chartjs-plugin-datalabels : 값이 차트 맨 위에 뿌려질 수 있도록 하기.(모듈설치: https://chartjs-plugin-datalabels.netlify.com/guide/getting-started.html#configuration)
                plugins:{
                    datalabels: {
                        formatter : function(value,ctx){
                            return null;
                        }
                    }
                },
                //(x,y축)설정 => API 참조.. 하다가 일단 넘어감(시간상)
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

export default BarChart4;