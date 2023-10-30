import SidebarItem from "./SidebarItem.js"
import { documentStore } from "../../store/documentStore.js"
import { urlchangeHandler } from "../../utils/urlChange.js"
export default class Sidebar {
  constructor({ $target, props }) {
    this.$target = $target
    this.state = props //{
    //     documents: [],
    //     selectedDocument: 'root'
    //   }
    this.setup()
    this.sidebarItem = new SidebarItem({
      props: { document: null, selectedDocument: "root" }
    })
  }

  setup() {
    this.$sidebar = document.createElement("div")
    this.$sidebar.setAttribute("id", "sidebar")
    this.$sidebar.innerHTML = `
        <div id="directory" role='group'></div>
        <div role="button" id="add">Add New Document</div>
    `
    this.$target.appendChild(this.$sidebar)
    this.$directory = document.getElementById("directory")
    this.$add = document.getElementById("add")
    this.addEvent("#add", "click", e => this.handleAppendButton(e))
  }

  setState(nextState) {
    this.state = nextState
    this.render()
  }

  renderSidebarItem() {
    const { documents, selectedDocument } = this.state
    return documents
      .map(document =>
        this.sidebarItem.render({
          document,
          selectedDocument: selectedDocument.id
        })
      )
      .join("")
  }

  render() {
    this.$directory.innerHTML = this.renderSidebarItem()
    this.mounted()
  }

  mounted() {
    this.addEvent(".append", "click", e => {
      this.handleAppendButton(e)
    })

    this.addEvent(".delete", "click", e => {
      this.handleDeleteButton(e)
    })

    this.addEvent(".flip", "click", this.toggleSubDocuments)

    this.addEvent("a", "click", e => this.onClick(e))
  }

  async handleAppendButton(e) {
    const parentId = e.target.closest("div .title")?.dataset.id || null
    try {
      await documentStore.dispatch({
        type: "ADD",
        payload: parentId
      })
      const { id } = documentStore.getState().newDocument
      urlchangeHandler(`/documents/${id}`)
    } catch (err) {
      err.showAlert("문서 생성에 실패했습니다")
    }
  }

  async handleDeleteButton(e) {
    const { selectedDocument } = this.state
    const { id } = e.target.closest("div .title").dataset
    try {
      documentStore.dispatch({ type: "DELETE", payload: Number(id) })
      if (selectedDocument.id === Number(id)) {
        console.log("sdfsdf")
      }
    } catch (err) {
      err.showAlert("삭제에 실패했습니다")
    }
  }

  addEvent(selector, type, callback) {
    const targets = document.querySelectorAll(selector)
    if (!targets) {
      return
    }
    Array.from(targets).forEach(target => {
      target.addEventListener(type, e => {
        e.stopPropagation()
        callback(e)
      })
    })
  }

  onClick(e) {
    e.preventDefault()
    const urlchange = new CustomEvent("urlchange", {
      detail: {
        link: e.target.href
      }
    })
    history.pushState(null, null, e.target.href)
    window.dispatchEvent(urlchange)
  }

  toggleSubDocuments(e) {
    const { classList } = e.target
    if (classList.contains("unfold")) {
      classList.replace("unfold", "fold")
    } else {
      classList.replace("fold", "unfold")
    }

    e.target.parentNode.nextElementSibling.classList.toggle("hidden")
  }
}
