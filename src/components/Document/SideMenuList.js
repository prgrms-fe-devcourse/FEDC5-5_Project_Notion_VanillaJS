import CreateMenu from './CreateMenu.js';
import { push } from '../../route/router.js';
import { getItem, removeItem } from '../../../utils/storage.js';

export default function SideMenuList({ $target, initialState, onNavRemove, onNavCreate }) {
    const $sideMenuList = document.createElement('div');
    $sideMenuList.classList.add('left-bar');
    $target.appendChild($sideMenuList);

    this.state = initialState;
    this.setState = newState => {
        this.state = newState;
        this.render();
    }

    this.render = () => {
        $sideMenuList.innerHTML = `
            <ul>
                ${CreateMenu(this.state)}
            </ul>
        `
    }

    $sideMenuList.addEventListener('click', e => {
        const { target }  = e;

        // 토글 메뉴
        const $li = target.closest('li');
        if(e.target.className === 'toggle') {
            $li.classList.toggle('hide');
        }

        if($li) {
            const { id } = $li.dataset;

            // 버튼 클릭 시 동작 (삭제, 추가)
            if(target.className === 'remove') {
                onNavRemove(Number(id));
            } else if(target.className === 'create') {
                onNavCreate(Number(id));
            }
        }

        if(target.nodeName === 'SPAN') {
            const { id } = $li.dataset;
            if(getItem('save')) removeItem('save');
            push(`/documents/${id}`)
        }
    })

    this.render();
}