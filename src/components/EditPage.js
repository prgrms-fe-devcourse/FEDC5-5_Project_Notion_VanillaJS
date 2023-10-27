import Editor from './Editor.js'
import { request } from '../utils/api.js'

export default function EditPage({ $target, initialState }) {
  const $page = document.createElement('div')
  $page.id = "document-contents"

  // {id, document: {title, content}, documents: []}
  this.state = initialState

  let timer = null

  // Editor 컴포넌트 생성
  const editor = new Editor({
    $target: $page,
    initialState: {
      title: '',
      content: '',
    },
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        this.setState({
          ...this.state,
          ...document
        })
        await fetchSaveContent()
      }, 1000)
    }
  })

  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id) {
      this.state = {...this.state, ...nextState}
      await fetchGetContent()
      return
    }
    const {id, title, content} = nextState
    this.state = {id, title, content}

    // API 불러올 때만 editor.setState
    if (nextState.updatedAt) {
      editor.setState({
        title: this.state.title ? this.state.title : "",
        content: this.state.content ? this.state.content : ""
      })
      this.render()
    }
  }

  this.render = async () => {
    $target.appendChild($page)
  }

  // 불러오기
  const fetchGetContent = async () => {
    const document = await request(`/documents/${this.state.id}`)
    this.setState(document)
  }
  // 수정
  const fetchSaveContent = async () => {
    const { id, title, content } = this.state
    await request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify({title, content})
    })
  }
}