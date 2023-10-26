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
        console.log(this.state);
        const docs = [];
        docs.push(this.state);
        console.log(docs);
        const documentList = getDocumentList(docs, "", "$documentPageList");

        $documentPageList.innerHTML = `${documentList}`;
    };
    this.render();
}
