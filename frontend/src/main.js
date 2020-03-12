'use strict'

const input = document.querySelector('#input')
const loading = document.querySelector('#loading')

const TIMEOUT_MS = 500
let timeout

input.addEventListener('input', (evt) => {
  loading.classList.remove('hide')

  clearTimeout(timeout)

  timeout = setTimeout(() => {
    fetch('/api/website?input=' + decodeURI(evt.target.value))
      .then(() => {

      })
      .catch(() => {

      })
      .finally(() => {
        setTimeout(() => loading.classList.add('hide'), 250)
      })
  }, TIMEOUT_MS)
})
