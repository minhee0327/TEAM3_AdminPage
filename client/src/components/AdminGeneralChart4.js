import React, { Component } from "react";
import Chart from "chart.js";

class AdminGeneralChart4 extends Component{
    chart = null;
    //AdminClientSalesChart4에서 데이터 받아옵니다.
    //AdiminClientSalesAnalysis.js에 첫번째 그래프 출력정보입니다.
    draw(){
        if(this.chart){
            this.chart.destroy();
            this.chart = null;
        }
        const {data, pair} = this.props;

        const config = {
            type:"pie",
            data: {
                labels: data.map(d => d.date + '대'),
                datasets: [
                {
                    label: "연령별 가입자수",
                    data: data.map(d => d.value),
                    fill: false,
                    backgroundColor: ['rgba(255, 99, 132, 0.6)',
                                        'rgba(54, 162, 235, 0.6)',
                                        'rgba(255, 206, 86, 0.6)',
                                        'rgba(75, 192, 192, 0.6)',
                                        'rgba(153, 102, 255, 0.6)',
                                        'rgba(255, 159, 64, 0.6)'],
                    borderColor:     'rgba(255, 255, 255, 0.6)',
                    lineTension: 0,
                    pointRadius: 0 
                }
                ]
            },
            options:{
                responsive: true,
                title: {
                    display: true,
                    text: `${pair}`
                },
                tooltips: {
                    mode: "index",
                    intersect: false
                },
                hover: {
                    mode: "nearest",
                    intersect: true
                },
                legend:{
                    position: 'right'
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

export default AdminGeneralChart4;