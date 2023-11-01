import { request } from "../../utils/api.js";
import { push } from "../../utils/router.js";

export default function SidebarFooter({ $target, setState }) {
  const $sidebarFooter = document.createElement("div");
  $target.appendChild($sidebarFooter);
  $sidebarFooter.className = "sidebar-footer";

  this.render = () => {
    $sidebarFooter.textContent = `+ 페이지 추가`;
  };

  this.render();

  const addNewPage = async () => {
    await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음",
        parent: null,
      }),
    });

    push("/");
  };

  $sidebarFooter.addEventListener("click", addNewPage);
}
