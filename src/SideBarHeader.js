import { pushRoute } from "./utils/router.js";

export default function SideBarHeader({ $target }) {
  const $header = document.createElement("div");
  $header.className = "header";
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
    <div class="header_profile">
      <div class="header_profile_icon">
        👩🏻‍💻
      </div>
      <div class="header_profile_name">
        예진's 자체제작 노션
      </div>
    </div>
    `;
    $header.addEventListener("click", () => pushRoute("/"));
  };
  this.render();
}
