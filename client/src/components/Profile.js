import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
          user_id: '',
          errors: {}
        }
      }
      componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
          user_id: decoded.user_id,
        })
      }
      render() {
        return (
          <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>USER ID</td>
                <td>{this.state.user_id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        )
      }
}

export default Profile