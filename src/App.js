import { fetchPost, fetchPostList } from "./api/fetch.js"
import PostEditSection from "./page/PostEditSection.js"
import PostListSection from "./page/PostListSection.js"
import { initRouter, routeTrigger } from "./router/router.js"

export default function App({ $target, initialState }) {

    const $listContainer = document.createElement('div')
    $listContainer.className = 'listContainer';
    const $editorContainer = document.createElement('div')
    $editorContainer.className = 'editorContainer';

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        postListSection.setState({
            posts: this.state.postList,
            selectedId: this.state.selectedPost?.id
        })

        if (this.state.selectedPost) {
            postEditSection.setState(this.state.selectedPost)
        }
    }

    const postListSection = new PostListSection({
        $target: $listContainer,
        initialState: {
            posts: this.state.postList,
            selectedId: null
        },
        onAdd: async () => {
            const postList = await fetchPostList()

            this.setState({
                ...this.state,
                postList
            })
        },
        onDelete: async (deleteId) => {
            const postList = await fetchPostList()

            this.setState({
                ...this.state,
                postList
            })

            if (deleteId == this.state.selectedPost?.id) {
                this.setState({
                    ...this.state,
                    selectedPost: null
                })

                routeTrigger("/")

                return
            }

            const deletedIdx = this.state.selectedPost?.documents.findIndex(post => post.id == deleteId)
            if (deletedIdx && deletedIdx !== -1) {
                const newPost = {...this.state.selectedPost}

                newPost.documents.splice(deletedIdx,1)
                this.setState({
                    ...this.state,
                    selectedPost: newPost
                })
            }
        }
    })

    const postEditSection = new PostEditSection({
        $target: $editorContainer,
        initialState: this.state.selectedPost,
        onChangeList: async (editedPost) => {
            const postList = await fetchPostList()
 
            this.setState({
                ...this.state,
                postList,
                selectedPost: {
                    ...this.state.selectedPost,
                    ...editedPost
                }
            })
        }
    })

    const route = async () => {
        const {pathname} = window.location

        $target.innerHTML = ''

        $target.appendChild($listContainer)

        if (pathname.startsWith('/posts/')) {
            const id = pathname.split('/posts/')[1]

            if (id) {
                const selectedPost = await fetchPost(id)

                this.setState({
                    ...this.state,
                    selectedPost
                })
                
                if (selectedPost) {
                    $target.appendChild($editorContainer)
                }
            }           
        }
    }

    const init = async () => {
        const postList = await fetchPostList()

        this.setState({
            ...this.state,
            postList,
            selectedPost: null
        })

        route()

        initRouter(route)
    }
    
    init()
}