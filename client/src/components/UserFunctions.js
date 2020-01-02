import axios from 'axios'


export const register = newUser => {
    return axios
      .post('api/register', {
        user_id: newUser.user_id,
        password: newUser.password,
        funnel_id: newUser.funnel_id
      })
      .then(response => {
        console.log('Registered')
        return response.data
      })
  }

  export const login = user => {
    return axios
      .post('api/login', {
        user_id: user.user_id,
        password: user.password
      })
      .then(response => {
        localStorage.setItem('usertoken', response.data)
        console.log(response.data)
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
  }