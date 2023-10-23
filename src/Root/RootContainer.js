import { request } from "../../library/api.js";
import RootList from "./RootList.js";
export default function RootContainer({
  $target,
  initialState,
  onRenderDoc,
  onAddDoc,
}) {
  this.setState = (nextState) => {
    this.state = nextState;
    rootList.setState(this.state);
  };
  const $page = document.createElement("div");
  $page.className = "RootContainer";
  $target.appendChild($page);

  this.state = initialState;
  const rootList = new RootList({
    $page,
    initialState,
    onClick: async (documentId) => {
      //DocumentRoot에서 받아서
      //const doc = await fetchDoc(documentId); //App에 doc정보 보내줘
      onRenderDoc(documentId); //이제 onRender보내주고 push를 해야해 클릭한 id가 올라감
    },
    addNewDoc: () => {
      onAddDoc();
    },
  });
}
