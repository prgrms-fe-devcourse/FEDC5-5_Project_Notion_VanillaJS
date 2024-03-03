import DocumentFooter from '../../components/Document/DocumentFooter/index.js'
import DocumentHeader from '../../components/Document/DocumentHeader/index.js'
import DocumentList from '../../components/Document/DocumentList/index.js'
import { createDOM } from '../../utils/dom.js'
// import './style.scss'

export default function DocumentPage({
  $target,
  initialState,
  onAddRootDocument,
  onClickDocument,
  onAddDocument,
  onRemoveDocument,
}) {
  const $documentPageContainer = createDOM({
    tag: 'div',
    className: 'document-page-container',
  })

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    documentList.setState(this.state)
  }

  const documentHeader = new DocumentHeader({
    $target: $documentPageContainer,
    onClickPageAddButton: onAddRootDocument,
  })

  const documentList = new DocumentList({
    $target: $documentPageContainer,
    initialState: this.state,
    onClickDocument: onClickDocument,
    onClickAddButton: onAddDocument,
    onClickRemoveButton: onRemoveDocument,
  })

  const documentFooter = new DocumentFooter({
    $target: $documentPageContainer,
    onOpen: () => {},
  })

  $target.appendChild($documentPageContainer)

  this.render()
}
