'use strict'

import { TIMEOUT_MS } from './config/input'
import loading from './modules/loading'
import input from './modules/input'
import ws from './modules/ws'

let timeout

input.el.addEventListener('input', () => {
  if (input.isEmpty) {
    loading.stop()
    return
  }

  const domains = input.existsDomain
  if (!domains) {
    loading.stop()
    return
  }

  loading.start()

  clearTimeout(timeout)

  timeout = setTimeout(() => {
    ws.sendDomain(domains[0])
  }, TIMEOUT_MS)
})
