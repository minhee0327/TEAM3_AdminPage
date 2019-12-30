const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user',
  {
    user_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    funnel_id: {
      type: Sequelize.INTEGER
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: 'user',
    timestamps: false
  }
)