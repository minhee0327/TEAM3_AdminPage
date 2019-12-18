import React, {Component} from 'react';
import AdminClientSalesChart1 from '../components/AdminClientSalesChart1';
import AdminClientSalesChart2 from '../components/AdminClientSalesChart2';
import AdminClientSalesChart3 from '../components/AdminClientSalesChart3';
import AdminClientSalesChart4 from '../components/AdminClientSalesChart4';
import AdminClientSalesChart5 from '../components/AdminClientSalesChart5';
import AdminClientSalesChart6 from '../components/AdminClientSalesChart6';
import "css/TotalClientSales.css";

class AdminClientSalesAnalysis extends Component{
   constructor(props){
       super(props);
       this.state = {
        chartData:[],
        completed:0,
        data:[],
        totalYearlySales: []
       }
       this.stateRefresh = this.stateRefresh.bind(this);
   }
   
   stateRefresh = () => {
    this.setState({
      chartData:{},
      completed:0,
      searchKeyword:''
    });
    
    this.callApi()
    .then(res => this.setState({test: res.data}))
    .catch(err => console.log(err));
    }   

    callApi = async() => {
        const response = await fetch('/api/clientSalesYearlyChart');
        const body = await response.json();
        return body;
    }
    
    progress = () => {
        const {completed} = this.state;
        this.setState({completed: completed >= 100 ? 0 : completed +1});
    };
 
    render(){
       return (
            <div>
             <h3>회원 매출 분석</h3>
             <AdminClientSalesChart1/>
             <AdminClientSalesChart2/>
             <AdminClientSalesChart3/>
             <AdminClientSalesChart4/>
             <AdminClientSalesChart5/>
             <AdminClientSalesChart6/>
            </div>
    );
}
}

export default AdminClientSalesAnalysis;