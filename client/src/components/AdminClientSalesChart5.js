import React,{Component} from 'react';
import axios from 'axios';
import BarChart2 from './BarChart2';

class AdminClientSalesChart5 extends Component{
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
            const response = await axios.get(`/api/clietMonthlySalesAnalysis`)
            //const data = response.data.map(c=>c.sum)
            console.log(response);
            const data = response.data.map(
                // 필요한 값만 추출해서 날짜, 값이 들어있는 객체 생성
                (candle) => ({
                  date: candle.mm, // 시간만 나타나도록 설정
                  value: candle.sum
                })
              );
            
            const response1 = await axios.get(`/api/clientSalesMonthlyRefundAnalysis`)
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
               {this.state.data.length>0 && <BarChart2 data = {this.state.data} pair = {this.state.pair} data2={this.state.data2}/>}     
            </div>
        )
    }

}

export default AdminClientSalesChart5;