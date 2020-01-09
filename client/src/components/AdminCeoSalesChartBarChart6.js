import React, { Component } from "react";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

class AdminCeoSalesChartBarChart6 extends Component{
    chart = null;
    draw(){
        if(this.chart){
            this.chart.destroy();
            this.chart = null;
        }
        //신년 월별 계산은 조금 달라서 수정함 (2020-01-09 기준/ => 원래는 연말 기준으로 연산되있었다가 수정됨...ㅠㅠ 하...)
        //왜냐면... 데이터 받아올때 11, 12, 1월 순으로 받아오니까 sort시 1, 11, 12 혹은 12, 11, 1순임..
        //하지만 내가 원하는것은 11, 12, 1 순이기 때문에 새로 계산함..........필요하면 읽어보삼.....ㅠㅠ
        //원래 data2를 받는 것 처럼 받는게 맞음
        //혹시 나중에 누구라도 공부할까봐 미리 적어둠 
        
        const {data, pair,data2} = this.props;
        let a = data.map(d=>d.date);
        //console.log(a);
        let first = a[2];
        let second =a[1];
        let third = a[0];
        
        let b = data.map(d=>d.value);
        console.log(b);
        let first1 = b[2];
        let second1 =b[1];
        let third1 = b[0];
        const config = {
            type:"bar",
            data: {
                labels: [second, first, third],
                datasets: [
                {
                    label: "매출액",
                    data: [second1, first1, third1],
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
                }, plugins:{
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

export default AdminCeoSalesChartBarChart6;