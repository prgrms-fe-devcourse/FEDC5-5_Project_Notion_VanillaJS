import SideMenu from './Document/SideMenu.js';
import PostEditPage from './Editor/PostEditPage.js';
import { request } from '../api/api.js';
import { push } from '../route/router.js';
import { getItem, removeItem } from '../../utils/storage.js';

export default function App({$target}) {

    this.state = [];
    this.setState = newState => {
        this.state = newState;
        sideMenu.setState(this.state);
    }

    const onNavRemove = async (id) => {
        if(confirm('정말 삭제하시겠습니까?')) {
            const res = await request(`/documents/${id}`, {
                method: 'DELETE',
            });
            fetchMenuList();

            if(id === Number(location.pathname.split('/')[2])) {
                alert('존재하지 않는 페이지입니다. 첫 페이지로 이동합니다.');
                history.replaceState(null, null, '/');
                document.querySelector('.editor-wrap').classList.remove('show');
            }
        }
    }

    const onNavCreate = async (id = null, value) => {
        const newMenu = {
            title: value,
            parent: id,
        }

        const createMenu = await request(`/documents`, {
            method: 'POST',
            body: JSON.stringify(newMenu),
        });

        push(`/documents/${createMenu.id}`);
        this.route();

        fetchMenuList();
    }

    const onMenuCorrection = () => {
        fetchMenuList();
        sideMenu.setState(this.state);
    }


    const onMainMove = () => {
        if(getItem('save') == null) {
            postEditPage.setState({
                id: 'new'
            })
        }
        removeItem('save');
        const editor = document.querySelector('.editor-wrap')
        if(editor) editor.classList.remove('show');
        
        push('/');
        fetchMenuList();
    }

    const sideMenu = new SideMenu({
        $target,
        initialState: this.state,
        onNavRemove,
        onNavCreate,
        onMainMove
    })

    const postEditPage = new PostEditPage({
        $target,
        initialState: {
            id: 'new',
        },
        onMenuCorrection,
    })

    const fetchMenuList = async () => {
        const menuList = await request(`/documents`, {
            method: 'GET'
        });
        this.setState([
            ...menuList
        ]);
    }

    fetchMenuList();


    this.route = () => {
        const { pathname } = window.location;
        
        if(pathname.indexOf(`/documents/`) === 0) {
            const [, , id] = pathname.split('/')
            postEditPage.setState({id});
            const editor = document.querySelector('.editor-wrap');
            if(editor) editor.classList.add('show');
        }
    }

    this.route();

    window.addEventListener('route-change', e => {
        const { nextUrl } = e.detail
        if(nextUrl) {
            history.pushState(null, null, nextUrl);
            this.route();
        }
    })
}