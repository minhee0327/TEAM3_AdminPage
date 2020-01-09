import React,{Component} from 'react';
import axios from 'axios';
import AdminCeoSalesChartBarChart6 from './AdminCeoSalesChartBarChart6';

class AdminClientSalesChart6 extends Component{
    state={
        pair:'월간',
        data:[],
        data2:[]
    }

    handleChangePair = (pair) =>{
        this.setState({pair});
    }

    getData = async()=>{
        //const{pair} = this.state;
        try{
            const response = await axios.get(`/adminCeoSalesDetail6/`+this.props.phone)
            //const data = response.data.map(c=>c.sum)
            //console.log(response);
            const data = response.data.map(
                (candle) => ({
                  date: candle.mm, 
                  value: candle.sum
                })
              );
            console.log(data);
            const response1 = await axios.get(`/adminCeoSalesRefundDetail6/`+this.props.phone)
            //console.log(response1);
            const data2 = response1.data.map(
                c=>({
                    date2: c.mm,
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
               {this.state.data.length>0 && <AdminCeoSalesChartBarChart6 data = {this.state.data} pair = {this.state.pair} data2={this.state.data2}/>}     
            </div>
        )
    }

}

export default AdminClientSalesChart6;