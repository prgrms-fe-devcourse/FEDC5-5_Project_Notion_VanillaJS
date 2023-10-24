import Editor from './Editor.js';
import { request } from './api.js';

export default function NotePage({ $target, initialState }) {
  const $page = document.createElement('div');
  $page.classList.add('editor');

  this.state = initialState;

  const editor = new Editor({
    $target: $page,
    initialState: this.state.post,
    onEditing: async (post) => {
      const isNew = this.state.postId === 'new';

      if (isNew) {
        const createdPost = await request('/documents', {
          method: 'POST',
          body: JSON.stringify(post),
        });
        history.replaceState(null, null, `/documents/${createdPost.id}`);

        this.setState({
          postId: createdPost.id,
        });
      } else {
        await request(`/documents/${post.id}`, {
          method: 'PUT',
          body: JSON.stringify(post),
        });
      }
    },
  });

  this.setState = async (nextState) => {
    if (nextState.postId !== this.state.postId) {
      const post = await fetchPostTemp(nextState.postId);

      if (!post) {
        $page.style.display = 'none';
        return;
      }

      this.state = { postId: nextState.postId, post };
    } else {
      this.state = nextState;
    }
    this.render();
    editor.setState(this.state.post);
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPostTemp = async (postId) => {
    return await request(`/documents/${postId}`);
  };
}
