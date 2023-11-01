import SidebarList from './SidebarList.js';
import SidebarHeader from './SidebarHeader.js';
import { request } from '../api/api.js';
import { push } from '../router/router.js';

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement('section');
  $sidebar.className = 'sidebar';

  new SidebarHeader({
    $target: $sidebar,
    addDocument: async () => {
      const document = {
        title: '새 폴더',
        parent: null,
      };
      const createdDocument = await request('', {
        method: 'POST',
        body: JSON.stringify(document),
      });
      console.log(createdDocument);
      this.setState({ ...this.state, createdDocument });
    },
  });

  const sidebarList = new SidebarList({
    $target: $sidebar,
    initialState: [],
    delDocument: async (docId) => {
      const deletedDocuments = await request(`/${docId}`, {
        method: 'DELETE',
      });
      // 삭제가 제대로 된 경우
      if (deletedDocuments) {
        this.setState();
      }
      // 삭제가 제대로 되지 않은 경우
      else {
        console.log('삭제가 제대로 되지 않았습니다.');
      }
    },

    addDocument: async (id) => {
      const document = {
        title: '새 폴더',
        parent: id,
      };
      const updatedDocuments = await request(``, {
        method: 'POST',
        body: JSON.stringify(document),
      });
      // 추가가 제대로 된 경우
      if (updatedDocuments) {
        // 새로 들어온 디렉토리 편집화면
        push(`/posts/${updatedDocuments.id}`);
        this.setState();
      }
    },
  });

  this.setState = async () => {
    const documents = await request('');
    sidebarList.setState(documents);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($sidebar);
  };

  this.render();
}
