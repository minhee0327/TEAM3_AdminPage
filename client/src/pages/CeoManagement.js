import React,{ Component } from 'react';
import CeoManagementTable from 'components/CeoManagementTable'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import { CircularProgress, InputBase } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  grow: {
      flexGrow: 1,
  },
  search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade('#e0e0e0', 0.25),
      '&:hover': {
      backgroundColor: fade('#bdbdbd', 0.27),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
      },
      float:'right'
      },
      searchIcon: {
          width: theme.spacing.unit * 9,
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          },
          inputRoot: {
          color: 'inherit',
          width: '100%',
          },
          inputInput: {
              paddingTop: theme.spacing.unit,
              paddingRight: theme.spacing.unit,
              paddingBottom: theme.spacing.unit,
              paddingLeft: theme.spacing.unit * 10,
              transition: theme.transitions.create('width'),
              width: '100%',
              [theme.breakpoints.up('sm')]: {
              width: 120,
              '&:focus': {
              width: 200,
              },
              },
              },
});





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

    console.log('stateRefresh()');

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
    
    console.log('componentDidMount()');
    
    //this.timer = setInterval(this.progress, 5000);
    this.callApi()
    .then(res => this.setState({ceoManagement: res}))
    .catch(err => console.log(err));
    console.log('1ceoManager 있는지 =>', this.state.ceoManagement)
  }
  
  callApi = async() => {
    
    console.log('callApi()');
    
    const response = await fetch('/api/ceoManagement');
    const body = await response.json();
    
    return body;
  }

  progress = () => {

    console.log('progress()');

    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed +1});
  };

  handleValueChange =(e) =>{

    console.log('handleValueChange()');

    let nextState = {}
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    
  }

  render(){

    //console.log('render()');
    //console.log('0번째 name', this.state.ceoManagement[0]['name']);

    //if(this.state.ceoManagement[0])
    //console.log(this.state.ceoManagement[0]['troup_name'])
    
    const filteredComponents = (data) =>{
       data = data.filter((c) => {
         return c.name.indexOf(this.state.searchKeyword) > -1;
       });
      return data.map((c) => {
        return <CeoManagementTable stateRefresh={this.stateRefresh} troup_name={c.troup_name} user_id={c.user_id} name={c.name} email={c.email} identification_number={c.identification_number}/>
      })
    }
    const { classes } = this.props;
    const cellList = ["극단명", "ID", "이름", "E-mail", "사업자번호", "삭제"]
    //const {ceoManagement} = this.state;
    
    //let a;
    //if(this.state.ceoManagement){
    //a = this.state.ceoManagement[0]['troup_name']
  //}

  //console.log(a)
    return (
     
      <div className={classes.root}>
              
                <h3>사장님 계정</h3>
                <div className={classes.grow} />
                <div className={classes.search}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
              
                {/* placeholder={a} */}
                <InputBase
                placeholder = "이름 검색"
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                }}
                name = "searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
                
                />
                </div>



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

export default withStyles(styles)(CeoManagement);