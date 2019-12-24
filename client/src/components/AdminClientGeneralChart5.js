import React,{Component} from 'react';
import axios from 'axios';
import AdminGeneralChart5 from './AdminGeneralChart5';

class AdminClientGeneralChart5 extends Component{
    state={
        pair:'성별 가입자 비율 (%)',
        data:[],
    }

    handleChangePair = (pair) =>{
        this.setState({pair});
    }

    getData = async()=>{
        try{
            const response = await axios.get(`/api/clientGender`)
            console.log(response);
            const data = response.data.map(
                (candle) => ({
                  date: candle.gender, 
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
               {this.state.data.length>0 && <AdminGeneralChart5 data = {this.state.data} pair = {this.state.pair} />}     
            </div>
        )
    }

}

export default AdminClientGeneralChart5;