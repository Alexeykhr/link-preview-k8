class Loading {
  constructor() {
    this.el = document.querySelector('#loading')
    this.isVisible = this.el.classList.contains('show')
  }

  start() {
    if (!this.isVisible) {
      this.el.classList.add('show')
      this.isVisible = true
    }
  }

  stop() {
    if (this.isVisible) {
      this.el.classList.remove('show')
      this.isVisible = false
    }
  }
}

export default new Loading()
