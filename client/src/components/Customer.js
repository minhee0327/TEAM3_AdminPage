import React from 'react'; 
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Customer extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.user_id}</TableCell>
                <TableCell>{this.props.funnel_id}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.identification_number}</TableCell>
                <TableCell>{this.props.email}</TableCell>
                <TableCell>{this.props.role}</TableCell>
                <TableCell>{this.props.phone}</TableCell>
                <TableCell>{this.props.message_yn}</TableCell>
                {/* <TableCell>{this.props.dislike_genre}</TableCell>
                <TableCell>{this.props.wishlist}</TableCell> */}
                <TableCell>{this.props.noshow_count}</TableCell>
                <TableCell>{this.props.join_date}</TableCell>
            </TableRow>
        )
    }
}
export default Customer; 