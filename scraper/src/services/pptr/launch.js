'use strict'

const puppeteer = require('puppeteer')
const { pptr: c } = require('../../config')

module.exports = (options) => puppeteer.launch({
  defaultViewport: {
    width: 1920,
    height: 1080
  },
  slowMo: c.slowMo,
  headless: c.headless,
  ...options
})
