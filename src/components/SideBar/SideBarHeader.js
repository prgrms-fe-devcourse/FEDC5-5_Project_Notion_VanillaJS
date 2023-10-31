import { push } from "../../router.js";
import checkNewComponent from "../../utils/checkNewComponent.js";

export default function SideBarHeader({ $target }) {
    const self = this;
    checkNewComponent(SideBarHeader, self);

    const $header = document.createElement("div");
    $header.className = "sidebar-header";

    $target.appendChild($header);

    this.render = () => {
        $header.innerHTML = `<img class="notion-icon" src="/images/Notion_app_logo.png"><h3>JongUk의 Notion Home</h3>`;
    };
    this.render();

    $header.addEventListener("click", () => {
        push("/");
    });
}
