import Header from "./Header.js"
import Editor from "./Editor.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import { findDocumentById, editDocument } from "../../apis/documents.js"
import { documentStore } from "../../store/documentStore.js"
import { HTTPError } from "../../apis/documents.js"
export default class Content {
  DELAY_TIME = 1000
  constructor({ $target, props }) {
    this.$target = $target
    this.state = props //현재 url의 id값
    this.setup()
  }

  setup() {
    this.$content = document.createElement("div")
    this.$content.setAttribute("id", "content")
    this.main = new Main({ $target: this.$content })

    this.header = new Header({
      $target: this.$content,
      props: { title: "", onEditing: this.onEditing.bind(this) }
    })

    this.editor = new Editor({
      $target: this.$content,
      props: {
        content: "",
        onEditing: this.onEditing.bind(this)
      }
    })

    this.footer = new Footer({
      $target: this.$content,
      props: {
        documents: documentStore.getState().documents || []
      }
    })

    this.$target.appendChild(this.$content)
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }

  render() {
    const { documents, selectedDocument, error, deletedDocument } = this.state
    if (error) {
      this.$content.innerHTML = "<div>해당 문서를 찾을 수 없습니다</div>"
      return
    }
    if (selectedDocument?.id === deletedDocument?.id) {
      this.$content.innerHTML = "<div>해당 문서는 삭제되었습니다</div>"
      return
    }
    this.$content.innerHTML = ""
    if (selectedDocument.id === "root") {
      this.main.render()
      return
    }
    this.header.setState(selectedDocument.title)
    this.editor.setState(selectedDocument.content)
    this.findRelatedDocuments()
  }

  onEditing(type, payload) {
    //자동 문서 저장
    const { id, title, content } = this.state.selectedDocument
    if (type === "TITLE") {
      //Header 컴포넌트에 입력한 경우
      return setTimeout(async () => {
        await editDocument(id, { title: payload, content })
        documentStore.dispatch({ type: "FETCH", payload: id }) //title이 변경되었음을 알려 Sidebar 컴포넌트가 재렌더링됨
      }, 1000)
    }
    if (type === "CONTENT") {
      //Content 컴포넌트에 입력한 경우
      return setTimeout(async () => {
        editDocument(id, { title, content: payload })
      }, this.DELAY_TIME)
    }
  }

  onFail() {
    this.$content.innerHTML = `<div>삭제된 페이지입니다</div>`
  }

  findRelatedDocuments() {
    this.findChildDocuments(this.state.documents, this.state.id)
  }

  findChildDocuments(data, currentId) {
    for (const document of data) {
      if (document.id === currentId) {
        this.footer.setState(document.documents)
        return
      }
      if (document.documents.length) {
        this.findChildDocuments(document.documents, currentId)
      }
    }
  }
}

//ID값에 따라서 documents 자료에서 id값을 찾음 - 여기에 들어있는 것들이
