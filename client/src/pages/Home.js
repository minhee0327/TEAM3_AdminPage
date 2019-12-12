import React,{ Component } from 'react';
import Customer from 'components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { CircularProgress } from '@material-ui/core';


class Home extends Component{
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
        const response = await fetch('/api/clientList');
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
            return <Customer stateRefresh={this.stateRefresh} key={c.id} id ={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
          })
        }
        const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업"]
    return (
        <div>
           <h2>고객목록 리스트</h2>
            <Table >
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell key={c.id}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? filteredComponents(this.state.customers) :
              <TableRow>
                <TableCell colSpan="6" align ="center">
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

export default Home;