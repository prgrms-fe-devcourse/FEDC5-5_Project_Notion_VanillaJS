import { urlchangeHandler } from "../../utils/urlChange.js"
export default class Footer {
  constructor({ $target, props }) {
    this.$target = $target
    this.state = props.documents //현재 문서의 자식 문서들
    this.setup()
  }

  setup() {
    this.$footer = document.createElement("footer")
    this.$footer.setAttribute("id", "footer")
  }
  setState(nextState) {
    this.state = nextState
    this.render()
  }
  render() {
    this.$footer.innerHTML = this.template()
    this.$target.appendChild(this.$footer)
    this.mounted()
  }

  template() {
    return `
      ${this.state
        .map(
          document => `<li class='nav'>
      <a href='/documents/${document.id}'>${document.id}</a>
      </li>`
        )
        .join("")}
      `
  }

  mounted() {
    this.$footer.addEventListener("click", e => {
      e.preventDefault()
      urlchangeHandler(e.target.href)
    })
  }
}
