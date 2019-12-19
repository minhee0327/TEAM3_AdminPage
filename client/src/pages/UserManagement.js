import React,{ Component } from 'react';
import UserManagementTable from 'components/UserManagementTable'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';

class UserManagement extends Component{
    constructor(props) {
    super(props);
    this.state = {
      userManagement:'',
      completed:0,
      searchKeyword:''
    }
    this.stateRefresh = this.stateRefresh.bind(this);
  }

  stateRefresh = () => {
    this.setState({
      userManagement:'',
      completed:0,
      searchKeyword:''
  });
    this.callApi()
    .then(res => this.setState({userManagement: res}))
    .catch(err => console.log(err));
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({userManagement: res}))
    .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/userManagement');
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
         return c.user_id.indexOf(this.state.searchKeyword) > -1;
       });
      return data.map((c) => {
        return <UserManagementTable stateRefresh={this.stateRefresh} user_id={c.user_id} identification_number={c.identification_number} email={c.email} funnel_name={c.funnel_name}/>
      })
    }
    const cellList = ["ID", "주민등록번호", "E-mail", "유입경로","블랙리스트"]

    return (
      <div>
        
        <Container class="user_management_table">
        <Table >
        <TableHead>
          <TableRow>
            {cellList.map(c => {
              return <TableCell>{c}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.userManagement ? filteredComponents(this.state.userManagement) :
          <TableRow>
            <TableCell colSpan="6" align ="center">
              <CircularProgress  variant="determinate" value={this.state.completed}/>
            </TableCell>
          </TableRow>
  }
        </TableBody>
      </Table>
      </Container>
      </div>
    );
};
}

export default UserManagement;