import React from 'react';
import {post} from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';




class BlacklistManagementAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blacklist_id: '',
            user_id: '',
            reason_id: '',
            name: '',
            email: '',
            role: '',
            phone: '',
            delete_date: '',
            open: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addBlacklist = this.addBlacklist.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        

    }





    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addBlacklist()
        .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        })
        this.setState({
            blacklist_id: '',
            user_id: '',
            reason_id: '',
            name: '',
            email: '',
            role: '',
            phone: '',
            delete_date: '',
            open: false

        })
        

    }


    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
         

    addBlacklist = () => {
        const url = '/api/blacklistManagement';
        const formData = new FormData();
        formData.append('blacklist_id',this.state.blacklist_id)
        formData.append('user_id', this.state.user_id)
        formData.append('reason_id', this.state.reason_id)
        formData.append('email', this.state.email)
        formData.append('name', this.state.name)
        formData.append('role', this.state.role)
        formData.append('phone', this.state.phone)
        formData.append('delete_date', this.state.delete_date)
        
        
        return post(url,formData);
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            blacklist_id: '',
            user_id: '',
            reason_id: '',
            name: '',
            email: '',
            role: '',
            phone: '',
            delete_date: '',
            open: false
        });
    }

    render() {
        //const { classes } = this.props;
        return(

            <div>

<Button variant="contained" color="primary" onClick={this.handleClickOpen}>

블랙리스트 추가하기

</Button>

<Dialog open={this.state.open} onClose={this.handleClose}>

<DialogTitle>블랙리스트 추가</DialogTitle>

<DialogContent>


<TextField label="블랙리스트 아이디" type="text" name="blacklist_id" value={this.state.blacklist_id} onChange={this.handleValueChange} /><br/>

<TextField label="유저 아이디" type="text" name="user_id" value={this.state.user_id} onChange={this.handleValueChange} /><br/>

<TextField label="사유번호" type="text" name="reason_id" value={this.state.reason_id} onChange={this.handleValueChange} /><br/>

<TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br/>

<TextField label="이메일" type="text" name="email" value={this.state.email} onChange={this.handleValueChange} /><br/>

<TextField label="role" type="text" name="role" value={this.state.role} onChange={this.handleValueChange} /><br/>

<TextField label="전화번호" type="text" name="phone" value={this.state.phone} onChange={this.handleValueChange} /><br/>

<TextField label="" type="date" name="delete_date" value={this.state.delete_date} onChange={this.handleValueChange} /><br/>

</DialogContent>

<DialogActions>

<Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>

<Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>

</DialogActions>

</Dialog>

</div>

        )
    }


}

export default BlacklistManagementAdd;