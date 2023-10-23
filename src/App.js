import DocumentsList from './DocumentsList.js';
import NotePage from './NotePage.js';
import { initRouter } from './router.js';

export default function App({ $target }) {
  const documentsList = new DocumentsList({
    $target,
    onSelect: (id) => {
      notePage.setState({ postId: id });
      window.history.pushState(null, '', `/documents/${id}`);
    },
  });

  const notePage = new NotePage({
    $target,
    initialState: {
      postId: 'new',
      post: {
        title: '',
        content: '',
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      documentsList.setState();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      notePage.setState({ postId });
    }
  };

  initRouter(() => this.route());
}
