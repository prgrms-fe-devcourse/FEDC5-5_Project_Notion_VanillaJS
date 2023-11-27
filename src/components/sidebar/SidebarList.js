
import {push} from "../../utils/router.js"
export default function SidebarList({
    $target,
    initialState,
    onAdd,
    onDelete
}) {
    const $sidebarList = document.createElement('div')
    $sidebarList.className = 'sidebar_list'
    $target.appendChild($sidebarList)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    const renderList = (list) => {
        return `
            <ul>
                ${list.map(list =>     
                    `<li data-id=${list.id}>${list.title}<button data-id=${list.id} data-name="createButton" >+</button><button data-id=${list.id} data-name="deleteButton">-</button>
                        ${list.documents.length > 0 ? renderList(list.documents) : ''}
                    </li>`).join('')}
            </ul>
        `
    };


    const $rootCreateButton = document.createElement('div')
    $rootCreateButton.className = 'sidebar_footer'
    $rootCreateButton.innerHTML = `<p>+새페이지</p>`

    this.render = () => {
        $sidebarList.innerHTML = renderList(this.state);
        $target.appendChild($rootCreateButton)
    }

    this.render()

    $rootCreateButton.addEventListener('click', () => {
        onAdd();
    });


    $sidebarList.addEventListener('click', (e) => {

        const $li = e.target.closest('li')
        const $button = e.target.closest('button')

        if ($button) {
            const {
                id,
                name
            } = $button.dataset
            if (name === 'createButton') {
                onAdd(id)
            } else if (name === 'deleteButton') {
                onDelete(id);
            }
        } else if ($li) {
            const {
                id
            } = $li.dataset
            push(`/documents/${id}`)
        }
    })
}
