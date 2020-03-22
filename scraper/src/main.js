'use strict'

const amqp = require('./services/amqp')

amqp.run()
  .then(() => {
    console.log('Scraper running')
  })
  .catch((err) => {
    console.error(err)
  })
