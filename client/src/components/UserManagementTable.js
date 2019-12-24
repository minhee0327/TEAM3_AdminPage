import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UserManagementBlack from './UserManagementBlack';

class UserManagementTable extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.user_id}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.identification_number}</TableCell>
                <TableCell>{this.props.email}</TableCell>
                <TableCell>{this.props.funnel_name}</TableCell>
                <TableCell><UserManagementBlack stateRefresh={this.props.stateRefresh} identification_number={this.props.identification_number} /></TableCell>
            </TableRow>
        )
    }
}
export default UserManagementTable;