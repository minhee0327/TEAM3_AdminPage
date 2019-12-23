import React from 'react'; 
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link, Route } from 'react-router-dom';

import Test from '../pages/Test';


class Customer extends React.Component{
    handleClick =() =>{
        //const url = '/api/ceoSalesList/'+this.props.연락처;
        //console.log(url);
        //console.log(this.props.연락처);
    }

    render(){
        return(
            <div>
            <TableRow>
                <TableCell>{this.props.극단이름}</TableCell>
                <TableCell onClick={this.handleClick}><Link to = {`/tests/${this.props.연락처}/${this.props.사장님}`}>{this.props.사장님}</Link></TableCell>
                <TableCell>{this.props.연락처}</TableCell>
                <TableCell>{this.props.극단별총매출}</TableCell>
            </TableRow>
            <Route path ="/tests/:phone" component={Test}></Route>
            </div>
        )
    }
}
export default Customer; 