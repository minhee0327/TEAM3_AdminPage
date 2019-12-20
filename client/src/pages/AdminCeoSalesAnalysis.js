import React,{ Component } from 'react';
import CeoSalesList from 'components/CeoSalesList';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { CircularProgress } from '@material-ui/core';



class  AdminCeoSalesAnalysis extends Component{
        constructor(props) {
        super(props);
        this.state = {
          customers:null,
          completed:0,
          searchKeyword:''
        }
        this.stateRefresh = this.stateRefresh.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this)
      }
    
      stateRefresh = () => {
        this.setState({
          customers:'',
          completed:0,
          searchKeyword:''
      });
        this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err));
      }
    
      componentDidMount(){
        this.timer = setInterval(this.progress, 20);
        this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err));
      }
    
      callApi = async() => {
        const response = await fetch('/api/AdminCeoSales');
        const body = await response.json();
        return body;
      }
    
      progress = () => {
        const {completed} = this.state;
        this.setState({completed: completed >= 100 ? 0 : completed +1});
      };
    
      handleValueChange =(e) =>{
        let nextState = {}
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
      }
    
      render(){
        const filteredComponents = (data) =>{
         
          return data.map((c) => {
            return <CeoSalesList stateRefresh={this.stateRefresh}극단이름={c.극단이름} 사장님={c.사장님} 연락처={c.연락처} 극단별총매출={c.극단별총매출} />
          })
        }
        const cellList = ["극단이름","사장님","연락처","극단별총매출"]
    return (
        <div>
           <h3>사장님 매출 분석</h3>
            <Table >
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell key={c.toString()}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? filteredComponents(this.state.customers) :
              <TableRow>
                <TableCell colSpan="4" align ="center">
                  <CircularProgress  variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </div>
    );
};
}

export default AdminCeoSalesAnalysis;