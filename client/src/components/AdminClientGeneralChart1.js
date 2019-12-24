import React,{Component} from 'react';
import axios from 'axios';
import AdminGeneralChart1 from './AdminGeneralChart1';

class AdminClientGeneralChart1 extends Component{
    state={
        pair:'회원가입자 & 탈퇴수',
        data:[],
        data2:[]
    }

    handleChangePair = (pair) =>{
        this.setState({pair});
    }

    getData = async()=>{
        try{
            const response = await axios.get(`/api/userCount`)
            console.log(response);
            const data = response.data.map(
                (candle) => ({
                  date: candle.joindate, 
                  value: candle.users
                })
              );
            
            const response1 = await axios.get(`/api/userBlacklist`)
            const data2 = response1.data.map(
                c=>({
                    date2: c.deletedate,
                    value2: c.blacklist
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
               {this.state.data.length>0 && <AdminGeneralChart1 data = {this.state.data} pair = {this.state.pair} data2={this.state.data2}/>}     
            </div>
        )
    }

}

export default AdminClientGeneralChart1;