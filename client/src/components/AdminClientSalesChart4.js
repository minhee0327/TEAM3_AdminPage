import React,{Component} from 'react';
import axios from 'axios';
import BarChart1 from './BarChart1';

class AdminClientSalesChart4 extends Component{
    state={
        pair:'연간',
        data:[],
        data2:[]
    }

    handleChangePair = (pair) =>{
        this.setState({pair});
    }

    getData = async()=>{
        //const{pair} = this.state;
        try{
            const response = await axios.get(`/api/clientSalesYearlyChart`)
            //const data = response.data.map(c=>c.sum)
            console.log(response);
            const data = response.data.map(
                // 필요한 값만 추출해서 날짜, 값이 들어있는 객체 생성
                (candle) => ({
                  date: candle.yyyy, // 시간만 나타나도록 설정
                  value: candle.sum
                })
              );
            
            const response1 = await axios.get(`/api/clientSalesYearlyRefundAnalysis`)
            const data2 = response1.data.map(
                c=>({
                    date2: c.ryyyy,
                    value2: c.rsum
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
               {this.state.data.length>0 && <BarChart1 data = {this.state.data} pair = {this.state.pair} data2={this.state.data2}/>}     
            </div>
        )
    }

}

export default AdminClientSalesChart4;