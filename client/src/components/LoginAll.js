import React, {Component} from 'react';
import Menu from './Menu'
import Navbar from './Navbar';

class LoginAll extends Component{
    render(){
        return (
            <div>
                <Menu/>
                <Navbar/>
            </div>
        )
    }
}

export default LoginAll