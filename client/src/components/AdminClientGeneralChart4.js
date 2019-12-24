import React,{Component} from 'react';
import axios from 'axios';
import AdminGeneralChart4 from './AdminGeneralChart4';

class AdminClientGeneralChart4 extends Component{
    state={
        pair:'연령별 가입자 비율 (%)',
        data:[],
    }

    handleChangePair = (pair) =>{
        this.setState({pair});
    }

    getData = async()=>{
        try{
            const response = await axios.get(`/api/clientByAge`)
            console.log(response);
            const data = response.data.map(
                (candle) => ({
                  date: candle.연령, 
                  value: candle.인원
                })
              );

            this.setState({
                data
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
               {this.state.data.length>0 && <AdminGeneralChart4 data = {this.state.data} pair = {this.state.pair} />}     
            </div>
        )
    }

}

export default AdminClientGeneralChart4;