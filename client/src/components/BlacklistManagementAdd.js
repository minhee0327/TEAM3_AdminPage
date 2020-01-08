import React from 'react';
//import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class BlacklistManagementAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blacklist_id:'',
            user_id:'',
            reason_id:'',
            name:'',
            email:'',
            role:'',
            phone:'',
            delete_date:'',
            open: false
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.axios();
           
        this.setState({
            blacklist_id:'',
            user_id:'',
            reason_id:'',
            name:'',
            email:'',
            role:'',
            phone:'',
            delete_date:'',
            open: false
        })
        this.props.stateRefresh();
       // window.location.reload();
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        //console.log(e.target.name);
        this.setState(nextState);
    }
    /*
    axios({
        method:'post',
        url:'/users',
        params: {
          id: 1
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
      });
    */
    axios = () =>{
        var params = new URLSearchParams();
        params.append('blacklist_id', this.state.blacklist_id)
        params.append('user_id', this.state.user_id)
        params.append('reason_id', this.state.reason_id)
        params.append('name', this.state.name)
        params.append('email', this.state.email)
        params.append('role', this.state.role)
        params.append('phone', this.state.phone)
        params.append('delete_date', this.state.delete_date)
        axios.post('/api/blacklistManagement', params)
        .then((Response) => {
         console.log(Response);   
        }).catch((ex)=>{
         console.log(ex);
        })
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClose = () => {
        this.setState({
            blacklist_id:'',
            user_id:'',
            reason_id:'',
            name:'',
            email:'',
            role:'',
            phone:'',
            delete_date:'',
            open: false
        });
    }
    render() {
        //const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}> 블랙리스트 추가하기 </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>블랙리스트 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="블랙리스트 아이디" type="text" id="blacklist_id" name="blacklist_id" value={this.state.blacklist_id} onChange={this.handleValueChange} /><br />
                        <TextField label="유저 아이디" type="text" id = "user_id" name="user_id" value={this.state.user_id} onChange={this.handleValueChange} /><br />
                        <TextField label="사유번호" type="text" id = "reason_id" name="reason_id" value={this.state.reason_id} onChange={this.handleValueChange} /><br />
                        <TextField label="이름" type="text" id = "name" name="name" value={this.state.name} onChange={this.handleValueChange} /><br />
                        <TextField label="이메일" type="text" id="email" name="email" value={this.state.email} onChange={this.handleValueChange} /><br />
                        <TextField label="role" type="text" id="role" name="role" value={this.state.role} onChange={this.handleValueChange} /><br />
                        <TextField label="전화번호" type="text" id="phone" name="phone" value={this.state.phone} onChange={this.handleValueChange} /><br /><br />
                        <TextField label="삭제날짜" type="date" id="delete_date" InputLabelProps={{shrink: true}} name="delete_date" value={this.state.delete_date} onChange={this.handleValueChange} /><br />
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