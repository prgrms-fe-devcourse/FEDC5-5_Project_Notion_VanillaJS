export default function SideMenuListHeader({$target, onNavCreate}) {
    const $sideMenuListHeader = document.createElement('div');

    $target.appendChild($sideMenuListHeader);

    this.render = () => {
        $sideMenuListHeader.innerHTML = `
            <strong>개인 페이지</strong>
            <button><span>+</span></button>
        `
    }

    this.render();

    $sideMenuListHeader.querySelector('button').addEventListener('click', e => {
        onNavCreate();
    })
}