import React,{Component} from 'react';
import axios from 'axios';
import AdminCeoSalesChartBarChart7 from './AdminCeoSalesChartBarChart7';

class AdminClientSalesChart7 extends Component{
    state={
        pair:'주간',
        data:[],
        data2:[]
    }

    handleChangePair = (pair) =>{
        this.setState({pair});
    }

    getData = async()=>{
        //const{pair} = this.state;
        try{
            const response = await axios.get(`/adminCeoSalesDetail7/`+this.props.phone)
            //const data = response.data.map(c=>c.sum)
            //console.log(response);
            const data = response.data.map(
                (candle) => ({
                  //date: candle.mm, 
                  value: candle.sum
                })
              );
            
            const response1 = await axios.get(`/adminCeoSalesRefundDetail7/`+this.props.phone)
            //console.log(response1);
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
               {this.state.data.length>0 && <AdminCeoSalesChartBarChart7 data = {this.state.data} pair = {this.state.pair} data2={this.state.data2}/>}     
            </div>
        )
    }

}

export default AdminClientSalesChart7;