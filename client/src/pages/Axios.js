import React,{Component} from 'react';
import axios from 'axios';

class Axios extends Component{
    state ={
        totalYearlySales: []
    };

    componentDidMount(){
        axios.get('/api/clientSalesYearlyChart')
        .then(res=>{
            //console.log(res);
            this.setState({totalYearlySales :res.data});
            //console.log(totalYearlySales);
            //this.props.setData(this.state.totalYearlySales)
            this.props.setData(this.state.totalYearlySales.map(i=>i.sum));
        })
    }

    render(){
        return(
            <ul>
            {this.state.totalYearlySales.map(totalYearlySales => <li key={totalYearlySales.id}>{totalYearlySales.sum}</li>)}
            </ul>
        )
    }
}

export default Axios;