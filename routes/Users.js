const express = require('express')
const user = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
user.use(cors())
process.env.SECRET_KEY = 'secret'

user.post('/login', (req, res) => {
  User.findOne({
    where: {
      user_id: req.body.user_id
    }
  }).then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      } else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
})



user.post('/register', (req, res) => {
  //const today = new Date().toDateString()
  
  const userData = {
    user_id: req.body.user_id,
    funnel_id: req.body.funnel_id,
    password: req.body.password
  }
  //console.log(req.body)

  User.findOne({
    where: {
      user_id: req.body.user_id
      //funnel_id: req.body.funnel_id
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          //console.log(userData)
          User.create(userData)
            .then(user => {
              res.json({ status: user.user_id + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


user.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      user_id: decoded.user_id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = user