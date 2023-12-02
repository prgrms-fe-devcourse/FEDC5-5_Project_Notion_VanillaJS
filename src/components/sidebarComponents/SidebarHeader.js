export default function SidebarHeader({ $target, username }) {
  const $sidebarHeader = document.createElement("header");
  $sidebarHeader.className = "sidebar-header";
  $target.appendChild($sidebarHeader);

  this.render = () => {
    $sidebarHeader.innerHTML = `${username}의 Notion`;
  };

  this.render();
}
