import NotionTitle from '../molecules/NotionTitle.js';
import DocumentsList from '../organisms/DocumentsList.js';
import createDOM from '../../utils/createDOM.js';
import NewDocumentButton from '../molecules/NewDocumentButton.js';
import { request } from '../../services/api.js';
import { push } from '../../utils/router.js';

/*
 * NotionSideBar
 * - NotionTitle
 * - DocumentsList
 * */

export default function NotionSideBar({ $target, initialState }) {
  const $notionSideBar = createDOM({
    $target,
    tagName: 'div',
    style: 'NotionSideBar',
  });

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    documentList.setState(this.state);
  };

  const onCreateDocument = async () => {
    const postResponse = await request('/documents', {
      method: 'POST',
      body: { title: '첫 화면', parent: null },
    });
    push(`/documents/${postResponse.id}`);
  };

  new NotionTitle({ $target: $notionSideBar, title: "Hun's Notion" });

  const $documentsContainer = createDOM({
    $target: $notionSideBar,
    setAttribute: [['data-container', 'documentsContainer']],
  });

  const documentList = new DocumentsList({
    $target: $documentsContainer,
    initialState: this.state,
    isOpenDocuments: [],
  });

  new NewDocumentButton({ $target: $documentsContainer, onCreateDocument, isFullSize: true });
}
