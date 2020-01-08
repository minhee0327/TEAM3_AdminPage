import React, { Component } from 'react'
import { login } from './UserFunctions'
import {Link} from 'react-router-dom';
import '../css/Login.css';

class Login extends Component {
    constructor() {
        super()
        this.state = {
          user_id: '',
          password: '',
          nameEntered: '',
          isNameValid: false,
          errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }
     
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        this.validateName(e.target.value)
      }
      onSubmit(e) {
        e.preventDefault()
    
        const user = {
          user_id: this.state.user_id,
          password: this.state.password
        }
    
        login(user).then(res => {
          if (res) {
            this.props.history.push(`/userManagement`)
            //console.log(res.data)
          }
        })
      }
      validateName = nameEntered => {
        if (nameEntered.length > 1) {
          this.setState({
            isNameValid: true,
            nameEntered
          });
        } else {
          this.setState({
            isNameValid: false,
            nameEntered
          });
        }
      };

      isEnteredNameValid = () => {
  const { nameEntered, isNameValid } = this.state;

  if (nameEntered) return isNameValid;
};

inputClassNameHelper = boolean => {
  switch (boolean) {
    case true:
      return 'is-valid';
    case false:
      return 'is-invalid';
    default:
      return '';
  }
};
      render() {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={this.onSubmit}>
                  <h1 className="h3 mb-3 text-center font-weight-normal">Admin 로그인</h1>
                  <div className="form-group">
                    <label htmlFor="user_id">ID</label>
                    <input
                      type="text"
                      className={`form-control ${this.inputClassNameHelper(
                        this.isEnteredNameValid()
                      )}`}
                      name="user_id"
                      placeholder="Enter ID"
                      value={this.state.user_id}
                      onChange={this.onChange}
                      id="nameInput"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-dark btn-block">
                    Sign in
                  </button>
                  <Link to ='/register' className="btn btn-lg btn-dark btn-block">register</Link>
                </form>
              </div>
            </div>
          </div>
        )
      }
}

export default Login