import { 
    getItem,
    removeItem,
    setItem
} from "../../utils/storage.js"
import Editor from "./DocumentEditor.js"
import EditPageFooter from "./EditPageFooter.js"
import {
    request
} from "../../utils/api.js"
import EditPageHeader from "./EditPageHeader.js"

export default function NotionEditPage({
    $target,
    initialState,
    onEdit
}) {
    const $page = document.createElement('div')
    this.state = initialState 
    $page.className = "editPage"

    let notionLocalSaveKey = `temp-post-${this.state.postId}`

    const defaultState = {
        id: '',
        title: '',
        content: ''
    }

    const post = getItem(notionLocalSaveKey,defaultState )

    let timer = null

    const editPageHeader = new EditPageHeader({
        $target: $page,
        initialState: post
    })

    const editor = new Editor({
        $target: $page,
        initialState: post,
        onEdit
    })
    const editPageFooter = new EditPageFooter({
        $target: $page,
        initialState: post,
    })

    this.setState = async (nextState) => {
        if (this.state.postId !== nextState.postId) {
            notionLocalSaveKey = `temp-post-${nextState.postId}`
            this.state = nextState

            const isNew = isNaN(this.state.postId) && this.state.postId.includes("new")
            
            if(isNew) {
                const post = getItem(notionLocalSaveKey,defaultState)
                this.render()
                editor.setState(post)
                editPageFooter.setState(post)
                editPageHeader.setState(post)
            }else {
                await fetchPost()
            }
            
            return
        }

        if(nextState.post){
            this.state = { ...this.state, ...nextState };
      
        }
        editor.setState(this.state.post || defaultState)
        editPageFooter.setState(this.state.post || defaultState)
        editPageHeader.setState(this.state.post || defaultState)
        this.render()
        
    }

    this.render = () => {
        if(!$target.querySelector(`.editpage`)){//?
            $target.appendChild($page)
        }
    }

    const fetchPost = async () => {
        const {
            postId
        } = this.state
        if (postId !== 'new') {
            const post = await request(`/documents/${postId}`) 

            this.setState({
                ...this.state,
                post
            }
            )
        }
    }
    
}
