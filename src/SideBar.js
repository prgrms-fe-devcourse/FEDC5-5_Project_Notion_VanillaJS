import SideBarList from "./SideBarList.js";

export default function SideBar({ $target, initialState }) {
    const $sideBar = document.createElement("div");
    $target.appendChild($sideBar);

    const sideBarList = new SideBarList({ $target: $sideBar, initialState });
    // console.log(Array.isArray(initialState));
    this.render = () => {};
    this.render();
}
