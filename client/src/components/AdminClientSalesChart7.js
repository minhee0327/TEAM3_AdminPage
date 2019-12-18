import React,{Component} from 'react';
import axios from 'axios';
import BarChart4 from './BarChart4';

class AdminClientSalesChart7 extends Component{
    state={
        pair:'일일',
        data:[],
        data2:[]
    }

    handleChangePair = (pair) =>{
        this.setState({pair});
    }

    getData = async()=>{
        try{
            const response = await axios.get(`/api/clientDailySalesAnalysis`)
            console.log(response);
            const data = response.data.map(
                (candle) => ({
                  //date: candle.date, 
                  value: candle.sum
                })
              );
            
            const response1 = await axios.get(`/api/clientSalesDailyRefundAnalysis`)
            const data2 = response1.data.map(
                c=>({
                    //date2: c.mm,
                    value2: c.sum
                })
            );
            this.setState({
                data,
                data2
            });
        }catch(e){
            console.log(e);
        }
        }
    componentDidMount(){
        this.getData();
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.pair !== this.state.pair){
            this.getData();
        }
    }

    render(){
        return (
            <div>
               {this.state.data.length>0 && <BarChart4 data = {this.state.data} pair = {this.state.pair} data2={this.state.data2}/>}     
            </div>
        )
    }

}

export default AdminClientSalesChart7;