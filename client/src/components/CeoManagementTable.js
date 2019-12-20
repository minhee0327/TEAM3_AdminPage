import React from 'react'; 
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CeoManagementBlack from './CeoManagementBlack';

class CeoManagementTable extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.troup_name}</TableCell>
                <TableCell>{this.props.user_id}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.email}</TableCell>
                <TableCell>{this.props.identification_number}</TableCell>
                <TableCell><CeoManagementBlack stateRefresh={this.props.stateRefresh} identification_number={this.props.identification_number}/></TableCell>
            </TableRow>
        )
    }
}
export default CeoManagementTable;