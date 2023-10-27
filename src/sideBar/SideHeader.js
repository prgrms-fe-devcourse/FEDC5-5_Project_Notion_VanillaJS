import { notionIcon } from "../svg/notion.js";

export default function SideHeader({ $target, initialState }) {
  const $sideHeader = document.createElement("div");
  $target.appendChild($sideHeader);
  $sideHeader.className = "sidebar-header";
  this.state = initialState;

  this.render = () => {
    $sideHeader.innerHTML = `${notionIcon}<span>${this.state.username}</span>`;
  };
  this.render();
}