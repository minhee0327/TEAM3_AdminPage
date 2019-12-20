import React from 'react'; 
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Customer extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.극단이름}</TableCell>
                <TableCell>{this.props.사장님}</TableCell>
                <TableCell>{this.props.연락처}</TableCell>
                <TableCell>{this.props.극단별총매출}</TableCell>
            </TableRow>
        )
    }
}
export default Customer; 