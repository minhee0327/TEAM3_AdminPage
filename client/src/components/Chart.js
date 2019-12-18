import React, {Component} from 'react';
import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2';
import "css/Chart.css";

class Chart extends Component{
    constructor(props){
        super(props);
        this.state={
            chartData:props.chartData
        }
    }
    static defaultProps = {
        displayTitle:true,
        displayLegend:true,
        legendPosition:'right',
        location:'City'
    }

    render(){
        return (
            <div className="chart">
            <div className="Bar-chart">
              <Bar 
              data={this.state.chartData} 
              options={{
                  title:{
                      display: this.props.displayTitle,
                      text:'연간 '+this.props.location,
                      fontSize:20
                  },
                  legend:{
                      display:this.props.displayLegend,
                      position:this.props.legendPosition
                  }
              }}/>
              </div>

              {/* 
              <div className="Line-chart">            
              <Line 
              data={this.state.chartData} 
              options={{
                  title:{
                      display:this.props.displayTitle,
                      text:'월간 ' +this.props.location,
                      fontSize:25
                  },
                  legend:{
                      display:this.props.displayLegend,
                      position:this.props.legendPosition
                  }
              }}/>
              </div> 
              <div className="Pie-chart">           
              <Pie 
              data={this.state.chartData} 
              options={{
                  title:{
                      display:this.props.displayTitle,
                      text:'주간 ' +this.props.location,
                      fontSize:25
                  },
                  legend:{
                      display:this.props.displayLegend,
                      position:this.props.legendPosition
                  }
              }}/> 
              </div>
              <div className="Doughnut-chart">            
              <Doughnut 
              data={this.state.chartData} 
              options={{
                  title:{
                      display:this.props.displayTitle,
                      text:'일간 ' +this.props.location,
                      fontSize:25
                  },
                  legend:{
                      display:this.props.displayLegend,
                      position:this.props.legendPosition
                  }
              }}/>
              </div> 
            */}           
            </div>

        )
    }
}

export default Chart;