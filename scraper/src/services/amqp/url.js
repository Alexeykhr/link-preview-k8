'use strict'

const { amqp: c } = require('../../config')

module.exports = `amqp://${c.user}:${c.pass}@${c.addr}/`
