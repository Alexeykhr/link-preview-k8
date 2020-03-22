'use strict'

const amqp = require('amqplib')
const parseWebsite = require('../pptr/parse')
const { amqp: c } = require('../../config')
const url = require('./url')

module.exports = {
  async run() {
    const conn = await amqp.connect(url)
    const ch = await conn.createChannel()
    await ch.assertQueue(c.channelName, {
      durable: false
    })

    ch.prefetch(c.prefetch)

    ch.consume(c.channelName, async (msg) => {
      try {
        await parseWebsite(msg.content.toString())
        // TODO Send to RabbitMQ
      } catch (e) {
        // TODO Check Why, send to RabbitMQ
      } finally {
        ch.ack(msg)
      }
    }, { noAck: false })
  }
}
