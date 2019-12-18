import React,{ Component } from 'react';
import Customer from 'components/Customer';
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
        const response = await fetch('/api/test');
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
          data = data.filter((c) => {
            return c.name.indexOf(this.state.searchKeyword) > -1;
          });
          return data.map((c) => {
            return <Customer stateRefresh={this.stateRefresh} key={c.user_id} user_id ={c.user_id} funnel_id={c.funnel_id} name={c.name} password={c.password} 
            identification_number={c.identification_number} email={c.email} role={c.role} phone={c.phone} message_yn ={c.message_yn} noshow_count={c.noshow_count} join_date={c.join_date} />
          })
        }
        const cellList = ["id","funnel_id", "이름", "식별번호", "이메일", "역할","phone","message_yn","noshow_count","join_date"]
    return (
        <div>
           <h2>고객목록 리스트</h2>
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
                <TableCell colSpan="10" align ="center">
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