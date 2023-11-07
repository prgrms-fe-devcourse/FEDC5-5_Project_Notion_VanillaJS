import Editor from "./Editor.js"
import { setItem, getItem, removeItem } from "../utils/storage.js"
import { request } from "../service/request.js"
import { updateDocument } from "../service/fetchDocuments.js"
import { debounce } from "../utils/debounce.js"

export default function NotionEditPage({$target, fetchDocuments}) {
    const $page = document.createElement('div')
    $page.className = 'notion-edit-page'

    this.state = {}

    this.setState = async nextState => {
        const { id } = nextState
        
        if (id) {
            const document = await request(`/documents/${id}`);
            this.state = document;
            editor.setState(this.state);
            this.render();
        } 
        else if($target.childNodes.length >= 2) {
            $target.removeChild($page);
        }
    }

    this.render = () => {
        $target.appendChild($page)
    }

    this.render()

    const DOCUMENT_LOCAL_SAVE_KEY = 'temp-post'

    const editor = new Editor({
        $target : $page,
        initialState: {
            title: '',
            content: ''
        },
        onEditing : debounce(async(document) => {
            setItem(DOCUMENT_LOCAL_SAVE_KEY, {
                ...document,
                updatedAt: new Date()
            })

            updateDocument(getItem(DOCUMENT_LOCAL_SAVE_KEY) )

            removeItem(DOCUMENT_LOCAL_SAVE_KEY);
      
            fetchDocuments();
        })
    })
}