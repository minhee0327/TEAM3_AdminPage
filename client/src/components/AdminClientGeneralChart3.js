import React,{Component} from 'react';
import axios from 'axios';
import AdminGeneralChart3 from './AdminGeneralChart3';

class AdminClientGeneralChart3 extends Component{
    state={
        pair:'유입률 (%)',
        data:[],
    }

    handleChangePair = (pair) =>{
        this.setState({pair});
    }

    getData = async()=>{
        try{
            const response = await axios.get(`/api/clientfunnel`)
            console.log(response);
            const data = response.data.map(
                (candle) => ({
                  date: candle.funnel_name, 
                  value: candle.count
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
               {this.state.data.length>0 && <AdminGeneralChart3 data = {this.state.data} pair = {this.state.pair} />}     
            </div>
        )
    }

}

export default AdminClientGeneralChart3;