export default function SidebarHeader({ $target, setState }) {
  const $sidebarHeader = document.createElement("div");
  $target.appendChild($sidebarHeader);
  $sidebarHeader.className = "sidebar-header";

  this.render = () => {
    $sidebarHeader.innerHTML = `
      <div>
          <h3>김나현의 Notion</h3>
      </div>
      `;
  };

  this.render();
}
