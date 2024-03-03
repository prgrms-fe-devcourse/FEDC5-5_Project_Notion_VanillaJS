import { initRouter, push } from './router/router.js'
import Splitter from './components/Common/Splitter/index.js'
import { debounce } from './utils/debounce.js'
import {
  addDocument,
  editDocument,
  removeDocument,
  getRootDocuments,
  getSelectedDocument,
} from './api/documentHandler.js'
import DocumentPage from './pages/DocumentPage/index.js'
import EditPage from './pages/EditPage/index.js'
import NotFoundPage from './pages/NotFoundPage/index.js'

export default function App({ $target }) {
  this.state = {
    selectedDocument: null,
    subDocuments: null,
  }

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = async () => {
    const rootDocuments = await getRootDocuments()
    documentPage.setState(rootDocuments)

    const { selectedDocument } = this.state
    if (selectedDocument) {
      notFoundPage.close()
    } else {
      notFoundPage.show()
    }
    editPage.toggle()
  }

  this.handleAddRootDocument = async () => {
    const addedDocument = await addDocument(null)
    this.setState({
      ...this.state,
      selectedDocument: addedDocument,
    })
    editPage.setState({ ...editPage.state, selectedDocument: addedDocument })
    push(`/${addedDocument.id}`)
  }

  this.handleClickDocument = async (id) => {
    const selectedDocument = await getSelectedDocument(id)

    this.setState({
      ...this.state,
      selectedDocument,
      subDocuments: selectedDocument.documents,
    })

    editPage.setState({
      selectedDocument: selectedDocument,
      subDocuments: selectedDocument.documents,
    })
    push(`/${id}`)
  }

  this.handleAddDocument = async (id) => {
    const addedDocument = await addDocument(id)

    this.setState({
      ...this.state,
      selectedDocument: addedDocument,
    })

    editPage.setState({ ...editPage.state, selectedDocument: addedDocument })
    push(`/${addedDocument.id}`)
  }

  this.handleRemoveDocument = async (id) => {
    await removeDocument(id)
    this.setState({
      ...this.state,
      selectedDocument: null,
    })
    editPage.setState({ selectedDocument: {}, subDocuments: []})
  }

  this.handleEditDocument = async (document) => {
    debounce(async () => {
      await editDocument(document.id, document.title, document.content)
    }, 1000)
  }

  this.handleClickSubDocument = async (id) => {
    const selectedDocument = await getSelectedDocument(id)
    this.setState({
      ...this.state,
      selectedDocument,
      subDocuments: selectedDocument.documents,
    })

    editPage.setState({
      selectedDocument: selectedDocument,
      subDocuments: selectedDocument.documents,
    })
    push(`/${id}`)
  }

  this.handleOnSelectDocument = (selectedDocument) => {
    this.setState({
      ...this.state,
      selectedDocument,
      subDocuments: selectedDocument.documents,
    })

    editPage.setState({
      selectedDocument: selectedDocument,
      subDocuments: selectedDocument.documents,
    })
  }

  const documentPage = new DocumentPage({
    $target,
    initialState: [],
    onAddRootDocument: this.handleAddRootDocument,
    onClickDocument: this.handleClickDocument,
    onAddDocument: this.handleAddDocument,
    onRemoveDocument: this.handleRemoveDocument,
  })

  const splitter = new Splitter({ $target })

  const editPage = new EditPage({
    $target,
    initialState: {
      selectedDocument: this.state.selectedDocument
        ? this.state.selectedDocument
        : {},
      subDocuments: this.state.subDocuments ? this.state.subDocuments : [],
    },
    onEditDocument: this.handleEditDocument,
    onClickSubDocument: this.handleClickSubDocument,
  })

  const notFoundPage = new NotFoundPage({ $target })

  // 라우팅
  this.route = async () => {
    const rootDocuments = await getRootDocuments()
    if (rootDocuments) {
      documentPage.setState(rootDocuments)
    }
    const { pathname } = window.location
    if (pathname === '/') {
      this.setState({
        ...this.state,
        selectedDocument: null,
      })
    } else {
      const id = pathname.slice(1)
      const selectedDocument = await getSelectedDocument(id)
      this.handleOnSelectDocument(selectedDocument)
    }
  }

  // 뒤로가기, 앞으로가기 처리
  window.addEventListener('popstate', async () => {
    this.route()
  })

  this.route()
  initRouter(() => this.route())
}
