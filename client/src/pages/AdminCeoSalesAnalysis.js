import React,{ Component } from 'react';
import CeoSalesList from 'components/CeoSalesList';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { CircularProgress } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  
  search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade('#e0e0e0', 0.25),
      '&:hover': {
      backgroundColor: fade('#bdbdbd', 0.27),
      },
      float:'right',
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
      },
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
        const response = await fetch('/api/AdminCeoSales');
        console.log(response);
        console.log(response.data);
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
            return <CeoSalesList stateRefresh={this.stateRefresh} 극단이름={c.극단이름} 사장님={c.사장님} 연락처={c.연락처} 극단별총매출={c.극단별총매출} />
          })
        }
        const { classes } = this.props;
        const cellList = ["극단이름","사장님","연락처","극단별총매출"]
    return (
        <div>
           <h3>사장님 매출 분석</h3>
           <div className={classes.search}>
              <div className={classes.searchIcon}>
               <SearchIcon />
              </div>
              <InputBase placeholder="사장님 검색" classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                 name="searchKeyword" 
                 value={this.state.searchKeyword} 
                 onChange={this.handleValueChange}/>
            </div>
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

export default withStyles(styles)(AdminCeoSalesAnalysis);