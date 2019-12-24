import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ReviewDelete from './ReviewDelete';

class AdminReviewTable extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.show_title}</TableCell>
                <TableCell>{this.props.user_id}</TableCell>
                <TableCell>{this.props.review_content}</TableCell>
                <TableCell><ReviewDelete stateRefresh={this.props.stateRefresh} user_id={this.props.user_id} /></TableCell>
            </TableRow>
        )
    }
}
export default AdminReviewTable;