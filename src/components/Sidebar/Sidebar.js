import DocumentList from './DocumentList.js';
import DocumentAddButton from './DocumentAddButton.js';
import SidebarHeader from './SidebarHeader.js';

import { fetchDocuments } from '../../utils/api.js';
import { isNew } from '../../utils/helper.js';
import { CLASS_NAME, TEXT } from '../../utils/constants.js';

export default function Sidebar({ $target, initialState, onAdd, onDelete }) {
  isNew(new.target);

  const $sidebar = document.createElement('div');
  $sidebar.className = CLASS_NAME.SIDEBAR;

  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  new SidebarHeader({
    $target: $sidebar,
    initialState: {
      workspaceName: '🎀 Kitty Notion',
    },
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: [],
      selectedId: this.state.selectedId,
    },
    onAdd,
    onDelete,
  });

  const documentAddButton = new DocumentAddButton({
    $target: $sidebar,
    initialState: {
      position: CLASS_NAME.SIDEBAR_BOTTOM,
      text: TEXT.NEW_PAGE,
    },
    onAdd,
  });

  this.render = async () => {
    const documents = await fetchDocuments(null);
    documentList.setState({
      documents,
      selectedId: this.state.selectedId,
    });
    documentAddButton.render();
  };

  this.render();
}
