import DocumentDetail from '../components/template/DocumentDetail.js';
import NotionSideBar from '../components/template/NotionSideBar.js';
import { request } from '../services/api.js';
import { initRouter } from '../utils/router.js';
import { addSaveDocumentTitleEvent } from '../utils/saveDocumentTitle.js';
import { findDocumentDataById } from '../utils/findDocumentsPathData.js';
import createDOM from '../utils/createDOM.js';

/*
 * HomePage
 * - NotionSideBar
 * - DocumentDetail
 * */

export default function HomePage({ $target }) {
  const $homePage = createDOM({ $target, tagName: 'div', style: 'HomePage' });

  this.state = [];
  const initDocumentData = { id: null, title: '첫 화면', content: '내용을 채워주세요', documentPath: [] };
  let tempDocumentData;

  const notionSideBar = new NotionSideBar({ $target: $homePage, initialState: [] });
  const documentDetail = new DocumentDetail({
    $target: $homePage,
    documentState: initDocumentData,
  });

  this.handleRoute = async () => {
    const { pathname } = window.location;

    const newDocuments = await request(`/documents`);
    this.state = newDocuments;

    if (pathname === '/') {
      // home 보여주기
      notionSideBar.setState(this.state);
      documentDetail.setState(initDocumentData);
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      const documentContent = request(`/documents/${postId}`);
      const documentPathData = findDocumentDataById(this.state, Number(postId));

      // sidebar 업데이트
      notionSideBar.setState(this.state);

      // document 보여주기
      const { content } = await documentContent;

      const nextState = {
        id: postId,
        title: documentPathData.at(-1)?.title || '첫 화면',
        content: content || '내용을 채워주세요',
        documentPath: documentPathData,
      };
      tempDocumentData = nextState;
      documentDetail.setState(nextState);
    }
  };

  this.optimisticTitleUpdate = () => {
    notionSideBar.setState(this.state);
    documentDetail.setState(tempDocumentData);
  };

  this.init = () => {
    this.handleRoute();
    addSaveDocumentTitleEvent(this.optimisticTitleUpdate);
    initRouter(this.handleRoute);
    window.addEventListener('popstate', e => {
      this.handleRoute();
    });
  };

  this.init();
}
