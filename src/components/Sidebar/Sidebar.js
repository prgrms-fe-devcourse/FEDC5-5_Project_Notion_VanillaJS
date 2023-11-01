import SidebarHeader from "./SidebarHeader.js";
import SidebarBody from "./SidebarBody.js";
import SidebarFooter from "./SidebarFooter.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");
  $target.appendChild($sidebar);
  $sidebar.className = "sidebar";

  new SidebarHeader({
    $target: $sidebar,
  });

  const sidebarBody = new SidebarBody({
    $target: $sidebar,
  });

  new SidebarFooter({
    $target: $sidebar,
    setState: this.setState,
  });

  this.setState = (newState) => {
    sidebarBody.setState(newState);
  };

  this.render = () => {
    $target.appendChild($sidebar);
  };

  this.render();
}
