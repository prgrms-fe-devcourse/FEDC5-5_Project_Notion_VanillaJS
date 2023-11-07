import DocumentTree from "./DocumentTree.js"
import { push } from "../utils/router.js"

export default function SideBar({ $target, initialState, onAdd, onDelete}) {
    const $sideBar = document.createElement('div')
    $sideBar.className = 'sideBar'

    $target.appendChild($sideBar)

    const $header = document.createElement('div')
    $header.innerHTML= `<img class="notion-icon" src="../../images/notion.png" /><h3>hyunjoo의 Notion</h3>`
    $header.className = 'document-header'

    const $addButton = document.createElement('div')
    $addButton.innerHTML= '<input type="button" data-name="addButton" class="new-page-add-button" value="새로운 페이지 생성">'
    $addButton.className='new-page-add-span'
    $addButton.dataset.name = 'addButton'

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $sideBar.innerHTML = ''
        $sideBar.appendChild($header)

        new DocumentTree({
            $target: $sideBar, 
            initialState: this.state
        });

        $sideBar.appendChild($addButton)
    }  

    $sideBar.addEventListener('click', e => {
        const $button = e.target.closest('input[type=button]')
        const $header = e.target.closest('.document-header')
        const $li = e.target.closest('li')

        const $arrowButton = e.target.closest('.arrow-button')

        if($button) {
            const {id, name} = $button.dataset
            if(name === 'addButton') {
                onAdd(id)
            }
            else if(name === 'deleteButton'){
                onDelete(id)
            }
        }

        else if($header) {
            push('/')
        }

        else if($li) {
            const {id} = $li.dataset
            push(`/documents/${id}`)
        }       
    })
}