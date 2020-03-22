'use strict'

require('dotenv').config()

module.exports = {
  amqp: {
    addr: process.env.AMQP_ADDR || 'localhost:5672',
    user: process.env.AMQP_USER || 'guest',
    pass: process.env.AMQP_PASS || 'guest',
    channelName: process.env.AMQP_CHANNEL || 'link-preview',
    prefetch: +process.env.AMQP_PREFETCH || 3
  },
  pptr: {
    headless: process.env.PPTR_HEADLESS || false,
    slowMo: +process.env.PPTR_SLOW_MO || 0,
  }
}
