import { SideHeader, SideMenuList, SideFooter } from './index.js';

export default function SideMenu({ $target, initialState, onNavRemove, onNavCreate, onMainMove }) {
    const $sideMenu = document.createElement('div');
    $sideMenu.classList.add('side-bar')
    $target.appendChild($sideMenu);

    this.state = initialState;
    this.setState = newState => {
        this.state = newState;
        sideMenuList.setState(this.state);
    }

    new SideHeader({
        $target: $sideMenu,
        text: '조승현의 Notion',
        onNavCreate,
        onMainMove
    })
    
    const sideMenuList = new SideMenuList({
        $target: $sideMenu,
        initialState: this.state,
        onNavRemove,
        onNavCreate,
    })

    new SideFooter({
        $target: $sideMenu
    })
}