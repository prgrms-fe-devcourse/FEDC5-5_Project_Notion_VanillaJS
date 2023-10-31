import { routeTrigger } from "../../router/router.js"

const CLOSED_POSTS_ID_STORAGE_KEY = 'closedPostIdStorageKey'

export default function PostList({ $target, initialState, onAdd, onRemove }) {

    const $list = document.createElement('div')
    $list.className = 'postList'
    $target.appendChild($list)

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState
        this.render()
    }

    this.render = () => {
        $list.innerHTML = makeHtml(this.state.posts,1)
    }

    const listItemHtml = (id, title, depth) => `
        <li data-id="${id}" class="${this.state.selectedId == id ? 'selected' : ''} ${depth === 1 ? 'root' : ''}" style="padding-left: ${12*depth}px">
            <i class="toggle-right fas fa-regular fa-angle-right"></i>                           
            <p>${title ? title : 'Untitled'}</p>
            <div class="buttons">
                <button name="remove" class="remove"><i class="remove fas fa-regular fa-trash fa-sm"></i></button>
                <button name="add" class="add"><i class="add fas fa-solid fa-plus fa-sm"></i></button>
            </div>
        </li>`

    const makeHtml = (posts, depth) => {
        return posts.map(post => {
            if (!post.documents.length) {
                return `<ul>${listItemHtml(post.id, post.title, depth)}</ul>`
            }
            return `<ul>
                        ${listItemHtml(post.id, post.title, depth)}
                        ${makeHtml(post.documents, depth+1)}
                    </ul>`
        }).join('')
    }

    this.render()

    $list.addEventListener('click', async (e) => {
        const $li = e.target.closest('li')
        if ($li) {
            const id = $li.dataset.id

            if (e.target.classList.contains('add')) {
                onAdd(id)
            }
            else if (e.target.classList.contains('remove')) {   
                onRemove(id)
            } else {
                const isClosed = $li.classList.toggle("closed")
                console.log(isClosed)
                const currentOpened = JSON.parse(localStorage.getItem(CLOSED_POSTS_ID_STORAGE_KEY)) || []

                if (isClosed) {
                    currentOpened.push(id)
                    localStorage.setItem(CLOSED_POSTS_ID_STORAGE_KEY, JSON.stringify(currentOpened))
                } else {
                    const idx = currentOpened.indexOf(id)
                    currentOpened.splice(idx,1)
                    localStorage.setItem(CLOSED_POSTS_ID_STORAGE_KEY, JSON.stringify(currentOpened))
                }
                
                routeTrigger(`/posts/${id}`)
            }
        }

    })

}