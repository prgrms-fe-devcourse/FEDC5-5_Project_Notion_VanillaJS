import SidebarList from './SidebarList.js'
import SidebarHeader from './SidebarHeader.js'
import {
    removeItem,
} from "../../utils/storage.js"
import {
    push
} from "../../utils/router.js"
import {
    request
} from '../../utils/api.js'
export default function NotionSidebar({
    $target,
    onAdd
}) {
    const $sidebar = document.createElement('div')
    $sidebar.className = 'sidebar'
    
    new SidebarHeader({
        $target:$sidebar,
        initialState: {
            name : '📚현진쓰 노션'
        } 
    })

    const sidebarList = new SidebarList({
        $target: $sidebar,
        initialState: [],
        onAdd,
        onDelete: async (id) => {
            alert('페이지가 삭제되었습니다.')
            push(`/`)
            await request(`/documents/${id}`, {
                method: 'DELETE'
            })
            history.replaceState(null, null, ``)
            removeItem(`temp-post-${this.id}`)
            this.setState()
        }
    })



    this.setState = async () => {
        const lists = await request('/documents')
        sidebarList.setState(lists)
        this.render()
    }

    this.render = async () => {
        $target.appendChild($sidebar)
    }

    this.setState()
}
