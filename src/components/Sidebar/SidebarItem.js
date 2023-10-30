export default class SidebarItem {
  constructor({ props }) {
    this.state = props
  }
  template(item) {
    const { id, title, documents } = item
    return `
    <div>
    <div class="title ${
      id === this.state.selectedDocument ? "clicked" : ""
    }" data-id=${id}>
    <button class='flip unfold'>
    </button>
    <a href=/documents/${id}>${title}</a>
    <div class='tool hidden'>
    <button class='append'>+</button>
    <button class='delete'>X</button>
    </div>
    </div>          
        <div class="sub">${documents
          .map(document => this.template(document))
          .join("")}</div>
    </div>
      `
  }
  render(nextState) {
    this.state = nextState
    return this.template(this.state.document)
  }
}
