import React,{ Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class BlacklistManagementTable extends Component{
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.blacklist_id}</TableCell>
                <TableCell>{this.props.user_id}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.email}</TableCell>
                <TableCell>{this.props.phone}</TableCell>
                <TableCell>{this.props.delete_date}</TableCell>
                <TableCell>{this.props.reason_content}</TableCell>
            </TableRow>
        )
    }
}
export default BlacklistManagementTable;