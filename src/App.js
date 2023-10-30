import Sidebar from "./components/Sidebar/Sidebar.js"
import Content from "./components/Content/Content.js"
import Route from "./route/Route.js"
import { checkUserColorMode } from "./utils/checkUserColorMode.js"
import { documentStore } from "./store/documentStore.js"
export default class App {
  constructor({ $target }) {
    this.$target = $target
    this.sidebar = new Sidebar({
      $target,
      props: {
        documents: [],
        selectedDocument: null
      }
    })
    this.content = new Content({
      $target,
      props: {
        documents: [],
        selectedDocument: null
      }
    })
    this.route = new Route()
    this.store()
    this.init()
  }
  store() {
    documentStore.subscribe(() => {
      this.setState(documentStore.getState())
    })
  }

  setState(nextState) {
    const { documents, selectedDocument, error, deletedDocument } = nextState
    this.sidebar.setState({ documents, selectedDocument })
    this.content.setState({
      documents,
      selectedDocument,
      deletedDocument,
      error
    })
  }

  init() {
    document.body.classList.add(checkUserColorMode())
  }
}
//상위 컴포넌트인 App에서 DocumentStore 구독 -> 변경 시  Sidebar , Content 컴포넌트 재렌더링
