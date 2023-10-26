import { push } from "../../router.js";
import checkNewComponent from "../../utils/checkNewComponent.js";

export default function SideBarHeader({ $target }) {
    const self = this;
    checkNewComponent(SideBarHeader, self);

    const $header = document.createElement("h3");

    $target.appendChild($header);

    this.render = () => {
        $header.innerText = `Notion Home`;
    };
    this.render();

    $header.addEventListener("click", () => {
        push("/");
    });
}
