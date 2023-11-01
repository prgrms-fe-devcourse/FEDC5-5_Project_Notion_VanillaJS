import DocumentList from '../components/Sidebar/DocumentList.js';
import SidebarHeader from '../components/Sidebar/SidebarHeader.js';

export default function Sidebar({
  $target,
  initialState = [],
  onDocumentFoldToggle,
  onDocumentAdded,
  onDocumentClick,
}) {
  const $sidebar = document.createElement('div');
  $target.appendChild($sidebar);
  $sidebar.className = 'sidebar';

  this.state = initialState;

  const sidebarHeader = new SidebarHeader({
    $target: $sidebar,
    onDocumentAdded: (documentId) => {
      onDocumentAdded(documentId);
    },
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState,
    onDocumentFoldToggle: (documentId) => {
      onDocumentFoldToggle(documentId);
    },
    onDocumentAdded: (documentId) => {
      onDocumentAdded(documentId);
    },
    onDocumentClick: (documentId) => {
      onDocumentClick(documentId);
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    documentList.setState(this.state);
  };
}
