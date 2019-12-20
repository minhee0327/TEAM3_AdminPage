import React,{ Component } from 'react';
import CeoManagementTable from 'components/CeoManagementTable'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';


class CeoManagement extends Component{
    constructor(props) {
    super(props);
    this.state = {
      ceoManagement:'',
      completed:0,
      searchKeyword:''
    }
    this.stateRefresh = this.stateRefresh.bind(this);
  }

  stateRefresh = () => {
    this.setState({
      ceoManagement:'',
      completed:0,
      searchKeyword:''
  });
    this.callApi()
    .then(res => this.setState({ceoManagement: res}))
    .catch(err => console.log(err));
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({ceoManagement: res}))
    .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/ceoManagement');
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
        return <CeoManagementTable stateRefresh={this.stateRefresh} troup_name={c.troup_name} user_id={c.user_id} name={c.name} email={c.email} identification_number={c.identification_number}/>
      })
    }
    const cellList = ["극단명", "ID", "성명", "E-mail", "사업자번호", "삭제"]
    
    return (
      <div>
        
        <Container class="ceo_management_table">
        <Table >
        <TableHead>
          <TableRow>
            {cellList.map(c => {
              return <TableCell>{c}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.ceoManagement ? filteredComponents(this.state.ceoManagement) :
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

export default CeoManagement;