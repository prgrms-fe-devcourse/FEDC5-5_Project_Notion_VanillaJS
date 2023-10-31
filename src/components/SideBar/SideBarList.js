import checkNewComponent from "../../utils/checkNewComponent.js";
import { getDocumentList } from "../../utils/getDocumentList.js";

export default function SideBarList({
    $target,
    initialState,
    addSubDocument,
    deleteCurrDocument,
    onClick,
}) {
    const self = this;
    checkNewComponent(SideBarList, self);

    const $sideBarList = document.createElement("div");
    $target.appendChild($sideBarList);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const documentList = getDocumentList(this.state, "", "$sideBarList");

        $sideBarList.innerHTML = documentList;
    };
    this.render();

    $sideBarList.addEventListener("click", (e) => {
        const $li = e.target.closest("#documentContainer");

        if ($li) {
            const { id } = e.target;
            if (id === "documentContainer") return;
            const { documentid } = e.target.dataset;

            const actions = {
                addButton: addSubDocument,
                deleteButton: deleteCurrDocument,
                documentTitle: onClick,
            };
            actions[id](documentid);
            return;
        }
    });
}
