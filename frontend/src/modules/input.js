import { domain as domainRegex } from '../helper/rejex'

class Input {
  constructor() {
    this.el = document.querySelector('#input')
  }

  get value() {
    return this.el.value
  }

  get existsDomain() {
    return this.value.match(domainRegex)
  }

  get isEmpty() {
    return !this.value
  }
}

export default new Input()
