import { fetchPost, fetchPostList } from "../api/fetch.js"
import { routeTrigger } from "../router/router.js"
import PostList from "../components/postListSection/PostList.js"

export default function PostListSection({ $target, initialState, onDelete, onAdd }) {
    
    const $section = document.createElement('div')
    $target.appendChild($section)

    const $header = document.createElement('div')
    $header.className = 'header'
    $header.innerHTML = '⭐️ 정은쓰의 Notion'
    $section.appendChild($header)

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        postList.setState(this.state)
    }

    const onAddPost = async (parentId) => {
        const newPost = await fetchPostList({
            method: 'POST',
            body: JSON.stringify({
                title: '',
                parent: parentId
            })
        })

        routeTrigger(`/posts/${newPost.id}`)

        onAdd()
    }

    const postList = new PostList({
        $target: $section,
        initialState: this.state,
        onAdd: (parentId) => onAddPost(parentId),
        onRemove : async (id) => {
            await fetchPost(id, {
                method: 'DELETE'
            })

            await onDelete(id)
        },
    })

    const $addPost = document.createElement('div')
    $addPost.className = 'addPostBottomButton'
    $target.appendChild($addPost)

    const $addPostButton = document.createElement('button')
    $addPostButton.textContent = "글 추가하기"
    $addPostButton.addEventListener('click', async () => {
        await onAddPost()
    })
    $addPost.appendChild($addPostButton)
}