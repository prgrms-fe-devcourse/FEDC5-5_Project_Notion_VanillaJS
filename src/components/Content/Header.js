export default class Header {
  constructor({ $target, props }) {
    this.$target = $target
    this.state = props.title
    this.onEditing = props.onEditing
    this.setup()
    this.setEvent()
  }

  setup() {
    this.$header = document.createElement("h1")
    this.$header.setAttribute("id", "header")
    this.$header.contentEditable = true
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }

  render() {
    this.$header.innerText = `${this.state}`
    this.$target.appendChild(this.$header)
    this.timer = null
  }

  setEvent() {
    this.$header.addEventListener("keyup", e => {
      if (this.timer) {
        clearTimeout(this.timer) //debounce를 적용하여 유저가 입력을 멈춘 다음 일정 시간 이후에 api 요청을 한번만 보내게 됨
      }
      this.timer = this.onEditing("TITLE", e.target.innerText)
    })
  }
}
