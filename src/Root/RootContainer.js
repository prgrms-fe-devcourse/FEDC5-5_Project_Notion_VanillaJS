import { request } from "../../library/api.js";
import RootList from "./RootList.js";
export default function RootContainer({
  $target,
  initialState,
  onRenderDoc,
  onAddDoc,
}) {
  const $page = document.createElement("div");
  $page.className = "RootContainer";
  $target.appendChild($page);

  this.state = initialState;
  const documentRoot = new RootList({
    $page,
    initialState,
    onClick: async (documentId) => {
      //DocumentRoot에서 받아서
      //const doc = await fetchDoc(documentId); //App에 doc정보 보내줘
      onRenderDoc(documentId);
    },
    addNewDoc: () => {
      onAddDoc();
    },
  });
  this.setState = (nextState) => {
    this.state = nextState;
    documentRoot.setState(this.state);
  };
}
