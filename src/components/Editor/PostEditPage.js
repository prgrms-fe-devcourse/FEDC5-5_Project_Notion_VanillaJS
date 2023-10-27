import { EditorPages, EditorPagesFooter } from './index.js';
import { getItem, removeItem, setItem } from '../../../utils/storage.js';
import { request } from '../../api/api.js';


export default function PostEditPage({$target, initialState, onMenuCorrection}) {
    const $page = document.createElement('div');
    $page.classList.add('editor-wrap')


    this.state = initialState;

    let postLocalSaveKey = `post-temp-${this.state.id}`;
    const post = getItem(postLocalSaveKey, {
        title: '',
        content: ''
    })

    let timer = null;

    const editor = new EditorPages({
        $target: $page,
        initialState: post,
        onEditing: (post) => {
            if(timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                setItem(postLocalSaveKey, {
                    ...post,
                    tempSaveDate: new Date()
                })

                if(this.state.id === 'new') {
                    const createdPosts = await request('/documents', {
                        method: 'POST',
                        body: JSON.stringify(post),
                    })

                    history.replaceState(null, null, `/documents/${createdPosts.id}`);
                    removeItem(postLocalSaveKey);
                } else {
                    await request(`/documents/${post.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(post),
                    });
                    removeItem(postLocalSaveKey);
                }

                onMenuCorrection();
            }, 1000);
        }
    });

    this.setState = async (newState) => {
        if(this.state.id !== newState.id) {
            this.state = newState;
            postLocalSaveKey = `post-temp-${this.state.id}`;
            await fetchPost();
        }

        this.state = newState;
        
        this.render();

        if(this.state.post) {
            editor.setState(this.state.post);
            editorFooter.setState(this.state.post);
        }
    }


    this.render = () => {
        $target.appendChild($page);
    }

    const fetchPost = async () => {
        const { id } = this.state
        if(id !== 'new') {
            const post = await request(`/documents/${id}`);

            const tempPost = getItem(postLocalSaveKey, {
                title: '',
                content: ''
            })

            
            this.setState({
                ...this.state,
                post
            })

            if(tempPost.tempSaveDate && tempPost.tempSaveDate > post.updatedAt) {
                if(confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
                    this.setState({
                        ...this.state,
                        post: tempPost
                    })
                }
            }
        }
    }

    const editorFooter = new EditorPagesFooter({
        $target: $page,
        initialState: this.state,
    })
}