import { fetchPost } from "../api/fetch.js"
import ChildrenPostButton from "../components/postEditSection/ChilderenPostButton.js"
import PostEditor from "../components/postEditSection/PostEditor.js"

export default function PostEditSection({$target, initialState, onChangeList}) {
    
    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        editor.setState({
            title: this.state.title,
            content: this.state.content
        })

        
        this.buttonsRender()
    }

    let timer = null

    const editor = new PostEditor({
        $target,
        initialState: this.state,
        onEdit: (post) => {
            const {id} = this.state

            if (id) {
                if (timer) {
                    clearTimeout(timer)
                }

                timer = setTimeout(async () => {
                    await fetchPost(id, {
                        method: 'PUT',
                        body: JSON.stringify(post)
                    })

                    if (this.state.title !== post.title) {
                        await onChangeList(post)
                    }
                    
                    this.setState({
                        ...this.state,
                        title: post.title,
                        content: post.content
                    })
                }, 1000)
            }
        }
    })

    this.buttonsRender = () => {
        const $editor = $target.querySelector('div')
        $target.replaceChildren($editor)

        if (this.state.documents.length)  {
            const $childButton = document.createElement('div')
            $childButton.className = 'postFooter'
            $target.appendChild($childButton)

            this.state.documents.forEach((post) => {
                new ChildrenPostButton({
                    $target: $childButton,
                    title: post.title ? post.title : 'Untitled',
                    id: post.id
                })
            })
        }
    }
}