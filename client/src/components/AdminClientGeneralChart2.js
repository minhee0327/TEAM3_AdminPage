import React,{Component} from 'react';
import axios from 'axios';
import AdminGeneralChart2 from './AdminGeneralChart2';

class AdminClientGeneralChart2 extends Component{
    state={
        pair:'장르별 예매율 (%)',
        data:[],
    }

    handleChangePair = (pair) =>{
        this.setState({pair});
    }

    getData = async()=>{
        try{
            const response = await axios.get(`/api/clientgenre`)
            console.log(response);
            const data = response.data.map(
                (candle) => ({
                  date: candle.genre_name, 
                  value: candle.sum
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
               {this.state.data.length>0 && <AdminGeneralChart2 data = {this.state.data} pair = {this.state.pair} />}     
            </div>
        )
    }

}

export default AdminClientGeneralChart2;