export default class Editor {
  constructor({ $target, props }) {
    this.$target = $target
    this.state = props.content
    this.onEditing = props.onEditing
    this.setup()
    this.setEvent()
  }

  setup() {
    this.$editor = document.createElement("div")
    this.$editor.setAttribute("id", "editor")
    this.$editor.contentEditable = true
    this.$editor.placeholder = "내용을 입력하세요"
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }

  render() {
    this.$editor.innerText = `${this.state || ""}`
    this.$target.appendChild(this.$editor)
    this.timer = null
  }

  setEvent() {
    this.$editor.addEventListener("keyup", e => {
      if (this.timer) {
        //debounce를 적용하여 유저가 입력을 멈춘 다음 일정 시간 이후에 api 요청을 한번만 보내게 됨
        clearTimeout(this.timer)
      }
      this.timer = this.onEditing("CONTENT", e.target.innerText)
    })
  }
}
