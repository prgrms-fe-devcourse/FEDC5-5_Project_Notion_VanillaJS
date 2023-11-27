import NotionSidebar from "./components/sidebar/NotionSidebar.js"
import NotionEditPage from "./components/editPage/NotionEditPage.js"
import {
    initRouter,
    push
} from "./utils/router.js"
import {
    setItem,
    removeItem,
    getItem
} from "./utils/storage.js"
import {
    request
} from "./utils/api.js"

export default function App({
    $target
}) {

    const $Sidebar = document.createElement('aside')
    const $Document = document.createElement('div')
    $target.style.display = 'flex';
    $target.appendChild($Sidebar)
    $target.appendChild($Document)



    let timer = null

    const onEdit = (post) => {
        let notionLocalSaveKey = `temp-post-${notionEditPage.state.postId}`

        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(async () => {
            setItem(notionLocalSaveKey, {
                ...post,
                tempSaveDate: new Date()
            })

            const editedDocument = await request(`/documents/${post.id}`, {
                method: 'PUT',
                body: JSON.stringify(post)
            })

            removeItem(notionLocalSaveKey)
        

            notionEditPage.setState({	
                postId: editedDocument.id,	
                post: editedDocument,	
            });
          
            notionSidebar.setState()
            
        }, 500)

    }


    const onAdd = async (id) => {
        let notionLocalSaveKey = `temp-post-${notionEditPage.state.postId}`

        push(`/documents/${id}new`)
        parent = id;
        const createdPost = await request('/documents', {
            method: 'POST',
            body: JSON.stringify({
                title: '',
                parent: parent,
            }),
        })

        history.replaceState(null, null, `/documents/${createdPost.id}`)
        removeItem(notionLocalSaveKey)
        notionEditPage.setState({
            postId: createdPost.id
        })
        notionSidebar.setState()


    }





    const notionSidebar = new NotionSidebar({
        $target: $Sidebar,
        onAdd
    })

    const notionEditPage = new NotionEditPage({
        $target: $Document,
        initialState: {
            postId: 'new',
            post: {
                title: '',
                content: ''
            }
        },
        onEdit
    })

    this.route = () => {
        $Document.innerHTML = ''
        const {
            pathname
        } = window.location

        if (pathname === '/') {
            notionSidebar.setState()
        } else if (pathname.indexOf(`/documents/`) === 0) {
            const [, , postId] = pathname.split('/')
            notionEditPage.setState({
                postId
            })
        }
    }

    this.route()

    initRouter(() => {
        this.route()
    })

}
