import React,{ Component } from 'react';
import CeoGeneralList from 'components/CeoGeneralList';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { CircularProgress } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

class  AdminCeoGeneralAnalysis extends Component{
        constructor(props) {
        super(props);
        this.state = {
          customers:null,
          completed:0,
          searchKeyword:''
        }
        this.stateRefresh = this.stateRefresh.bind(this);
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
          data = data.filter((c) =>{
            return c.사장님.indexOf(this.state.searchKeyword)>-1;
          })

          return data.map((c) => {
            return <CeoGeneralList stateRefresh={this.stateRefresh} 극단이름={c.극단이름} 사장님={c.사장님} 연락처={c.연락처} />
          })
        }
        const cellList = ["극단이름","사장님","연락처"]
    return (
        <div>
           <h3>사장님 매출 분석</h3>
           
           <InputBase
            placeholder="사장님 이름으로 검색하기"
            name="searchKeyword"
            value={this.state.searchKeyword}
            onChange={this.handleValueChange}/>

            <Table >
            <TableHead>
              <TableRow>
                <div>
                {cellList.map(c => {
                  return <TableCell key={c.toString()}>{c}</TableCell>
                })}
                </div>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? filteredComponents(this.state.customers) :
              <TableRow>
                <TableCell colSpan="3" align ="center">
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

export default AdminCeoGeneralAnalysis;