class Loading {
  constructor() {
    this.el = document.querySelector('#loading')
    this.isHidden = this.el.classList.contains('hide')
  }

  start() {
    if (this.isHidden) {
      this.el.classList.remove('hide')
      this.isHidden = false
    }
  }

  stop() {
    if (!this.isHidden) {
      this.el.classList.add('hide')
      this.isHidden = true
    }
  }
}

export default new Loading()
