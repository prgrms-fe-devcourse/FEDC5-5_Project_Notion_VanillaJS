import Editor from './Editor.js';
import { request } from './api.js';
import { getItem, removeItem, setItem } from './storage.js';

export default function NotePage({ $target, initialState }) {
  const $page = document.createElement('div');

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, {
    title: '',
    content: '',
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.postId === 'new';

        if (isNew) {
          const createdPost = await request('/documents', {
            method: 'POST',
            body: JSON.stringify(post),
          });
          history.replaceState(null, null, `/documents/${createdPost.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            postId: createdPost.id,
          });
        } else {
          await request(`/documents/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
        }
      }, 500);
    },
  });

  this.setState = async (nextState) => {
    if (nextState.postId !== this.state.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      const post = await fetchPostTemp(nextState.postId);
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
