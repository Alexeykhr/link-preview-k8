const amqp = require('amqplib')
// const puppeteer = require('puppeteer')
// const redis = require('redis')
const config = require('./config')

// const client = redis.createClient()
//
// client.on('error', function (error) {
//   console.error(error)
// })

;(async () => {
  const conn = await amqp.connect(`amqp://${config.amqp.user}:${config.amqp.pass}@${config.amqp.addr}/`)
  const ch = await conn.createChannel()
  await ch.assertQueue('link-preview', {
    durable: false
  })
  ch.prefetch(1)

  ch.consume('link-preview', (msg) => {
    console.log(msg.content.toString())
    ch.ack(msg)
  }, { noAck: false })
})()

// ;(async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://example.com')
//   await page.screenshot({ path: 'example.png' })
//
//   await browser.close()
// })()
