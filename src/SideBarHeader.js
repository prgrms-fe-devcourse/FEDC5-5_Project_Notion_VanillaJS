export default function SideBarHeader({ $target }) {
    const Header = document.createElement("h3");
    $target.appendChild(Header);

    this.render = () => {
        Header.innerText = `JongUk's Notion Home`;
    };
    this.render();
}
