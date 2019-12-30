import React from 'react';

Authentication.prototype ={
    mode: React.prototype.bool,
    onLogin: React.prototype.func,
    onRegister: React.prototype.func
};

Authentication.defaultProps = {
    mode: true,
    onLogin : (id,pw) => {console.error("login function not defined");},
    onRegister: (id,pw) => {console.error("register function not defined");}
};

class Authentication extends React.Component {
    render() {
        return (
            <div>
                Auth
            </div>
        );
    }
}

export default Authentication;