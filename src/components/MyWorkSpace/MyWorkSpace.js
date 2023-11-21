import { getAllDocuments } from "../../service/documents.js";
import { createCustomElement } from "../../utils/dom.js";
import DocumentList from "../Document/DocumentList.js";
import MyWorkSpaceHeader from "./MyWorkSpaceHeader.js";
import { TAG } from "../../constants/tag.js";

export default function MyWorkSpace({ $target, navigateToDocument }) {
  const $myWorkSpace = createCustomElement({
    tag: TAG.DIV,
  });

  $target.appendChild($myWorkSpace);

  this.updateAllDocuments = async () => {
    const documentList = await getAllDocuments();
    $documentList.setState(documentList);
  };

  new MyWorkSpaceHeader({
    $target: $myWorkSpace,
    updateAllDocuments: this.updateAllDocuments,
  });

  const $documentList = new DocumentList({
    $target: $myWorkSpace,
    navigateToDocument,
  });

  this.setState = (nextState) => {
    $documentList.setState(nextState);
  };
}
