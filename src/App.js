import NotionEditPage from "./components/NotionEditPage.js"
import SideBar from "./components/SideBar.js"
import { push, initRouter } from "./utils/router.js"
import { fetchDocuments, addDocument, deleteDocument } from  "./service/fetchDocuments.js"

export default function App({$target}) {
    this.state = []

    this.setState = nextState => {
        this.state = nextState
    }

    const fetchState = async() => { 
        const documents = await fetchDocuments()
        this.setState(documents)
        sideBar.setState(documents)
    }

    const sideBar = new SideBar({
        $target, 
        initialState: this.state,
        onAdd: async (parentId) => {
            const document = await addDocument(parentId)
            push(`../documents/${document.id}`)
            this.route();
        },
        onDelete: async(id) => {
            await deleteDocument(id)
            history.replaceState(null, null, "/");
            this.route();
        }
    })

    const notionEditPage = new NotionEditPage({
        $target, 
        fetchDocuments: fetchState
    })

    this.route = () => {
        const {pathname} = window.location

        fetchState()

        if(pathname === '/') {
            notionEditPage.setState('')
        }
        else if(pathname.indexOf('/documents/') === 0) {
            const [, , id] = pathname.split('/')
            notionEditPage.setState({id})
        }  
    }

    this.route()

    initRouter(() => this.route())
}