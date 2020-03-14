import input from './input'

class Ws {
  constructor() {
    this.ws = new WebSocket('ws://localhost:8080/ws/domains')

    this.onMessage()
  }

  sendDomain(domain) {
    this.ws.send(domain)
  }

  onMessage() {
    this.ws.onmessage = (evt) => {
      console.log(input.value)
      console.log(evt)
    }
  }
}

export default new Ws()
