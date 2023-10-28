import checkNewComponent from "../../utils/checkNewComponent.js";
import { getDocumentList } from "../../utils/GetDocumentList.js";

export default function DocumentPageList({ $target, initialState }) {
    const self = this;
    checkNewComponent(DocumentPageList, self);

    const $documentPageList = document.createElement("div");
    $target.appendChild($documentPageList);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const documentList = getDocumentList(
            [{ ...this.state }],
            "",
            "$documentPageList"
        );

        $documentPageList.innerHTML = `${documentList}`;
    };
    this.render();
}
