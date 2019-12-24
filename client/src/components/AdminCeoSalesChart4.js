import React,{ Component } from 'react';
import TotalClientSales from 'components/TotalClientSales';
import { CircularProgress } from '@material-ui/core';

class AdminCeoSalesChart4 extends Component{
    //올해 총 매출액
    constructor(props){
        super(props);
        this.state={
            chart:'',
            completed:0
        }
        this.stateRefresh = this.stateRefresh.bind(this);
    }
    stateRefresh=() =>{
        this.setState({
            chart:'',
            completed:0
        });
        this.callApi()
        .then(res => this.setState({chart: res}))
        .catch(err => console.log(err));
    }

    componentDidMount(){
        this.timer = setInterval(this.progress, 20);
        this.callApi()
        .then(res => this.setState({chart:res}))
        .catch(err => console.log(err));
    }
    /*
    componentWillMount(){
        clearInterval(this.timer);
    }
    */
    callApi = async() =>{
        const response = await fetch('/adminCeoSalesDetail4/'+this.props.phone);
        //console.log(response);
        const body = await response.json();
        return body;
    }


    progress = () => {
        const {completed} = this.state;
        this.setState({completed: completed >=100 ? 0: completed +1 });
    };

    handleValueChange = (e) =>{
        let nextState = {}
        nextState[e.target.name] = e.tartget.value;
        this.setState(nextState);
    }
    render(){
        const filteredComponents = (data) =>{
            return data.map((c)=>{
                return <TotalClientSales stateRefresh={this.stateRefresh} key={c.toString()} sum={c.sum}/>
            })
        }
        return(
            <span>
                일간 총 매출액 : {this.state.chart ? filteredComponents(this.state.chart) :<CircularProgress  variant="determinate" value={this.state.completed}/>}
            </span>
        );
    }
}

export default AdminCeoSalesChart4;