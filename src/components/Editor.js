export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement('div')
  $editor.className = 'editor-wrap'

  let isInitialize = false
  // {title, content}
  this.state = initialState

  $target.appendChild($editor)

  this.setState = (nextState) => {
    this.state = nextState
    $editor.querySelector('[name=title]').value = this.state.title
    $editor.querySelector('[name=content]').value = this.state.content
    this.render()
  }

  this.render = () => {
    const { title, content } = this.state
    if (!isInitialize) {
      $editor.innerHTML = `
        <input class="editor-title" type="text" name="title" style="width: 600px;" placeholder="제목 없음" value="${title}" />
        <textarea class="editor-content" name="content" style="width: 600px; height: 400px;" placeholder="내용을 입력하세요">${content}</textarea>
      `
      isInitialize = true
    }
  }

  this.render()

  $editor.addEventListener('keyup', (e) => {
    const { target } = e
    const name = target.getAttribute('name')

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value
      }
      
      this.setState(nextState)
      onEditing(this.state)
    }
  })
}