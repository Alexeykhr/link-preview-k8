'use strict'

const crypto = require('crypto')
const launch = require('./launch')

// null - means browser is closed
let browser

const newPage = async () => {
  if (!browser || !browser.isConnected()) {
    browser = await launch()

    // Take the first blank page
    const pages = await browser.pages()
    return pages[0]
  }

  return browser.newPage()
}

module.exports = async (url) => {
  const page = await newPage()

  try {
    // TODO Check protocol (append?)
    await page.goto(url)
    // TODO Get title, description
    // TODO Temporary path
    await page.screenshot({ path: crypto.createHash('md5').update(url).digest('hex')+'.png' })
  } finally {
    await page.close()
  }
}
