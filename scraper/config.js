'use strict'

require('dotenv').config()

module.exports = {
  amqp: {
    addr: process.env.AMQP_ADDR || 'localhost:5672',
    user: process.env.AMQP_USER || 'guest',
    pass: process.env.AMQP_PASS || 'guest'
  }
}
