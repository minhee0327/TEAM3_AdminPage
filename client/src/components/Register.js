import React, { Component } from 'react'
import { register } from './UserFunctions'

class Register extends Component {
    constructor() {
        super()
        this.state = {
          user_id: '',
          password: '',
          errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
      }
      onSubmit(e) {
        e.preventDefault()
    
        const newUser = {
          user_id: this.state.user_id,
          password: this.state.password
        }
    
        register(newUser).then(res => {
          if (res) {
            this.props.history.push('/login')
          }
        })
      }

      render() {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={this.onSubmit}>
                  <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                  <div className="form-group">
                    <label htmlFor="user_id">ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="user_id"
                      placeholder="Enter ID"
                      value={this.state.user_id}
                      onChange={this.onChange}
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
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Register!
                  </button>
                </form>
              </div>
            </div>
          </div>
        )
      }
}

export default Register