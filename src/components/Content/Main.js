import { switchColorMode } from "../../utils/checkUserColorMode.js"
export default class Main {
  constructor({ $target }) {
    this.$target = $target
    this.state = []
  }

  render() {
    this.$target.innerHTML = this.template()
    this.$search = document.querySelector("#search")
    this.setEvent()
  }

  setEvent() {
    this.$search.addEventListener("click", switchColorMode)
  }

  setState(nextState) {
    this.state = nextState
  }

  template() {
    return `
         <div id='main'>
         Main페이지입니다
      <div>왼쪽의 문서를 클릭해보세요</div> 
      <button id='search'>다크모드 적용하기</button>
               </div>`
  }
}
