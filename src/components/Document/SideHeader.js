import SideMenuListHeader from './SideMenuListHeader.js';

export default function SideHeader({ $target, text, onNavCreate, onMainMove }) {
    const $header = document.createElement('header');
    $target.appendChild($header);

    this.render = () => {
        $header.innerHTML = `
            <h1>${text}</h1>
        `
    }

    this.render();

    $header.querySelector('h1').addEventListener('click', () => {
        onMainMove();
    })

    new SideMenuListHeader({
        $target: $header, 
        onNavCreate
    });
}