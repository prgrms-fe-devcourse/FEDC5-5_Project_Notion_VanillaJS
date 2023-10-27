import DocumentList from "./DocumentList.js";
import { request } from "../utils/api.js";
import DocumentAddButton from "./DocumentAddButton.js";
import { ROUTE_DOCUMENTS } from "../utils/contants.js";
import SideHeader from "../SideBar/SideHeader.js";

export default function SideBar({ $target, onAdd, onDelete }) {
  const $sideBarContents = document.createElement("div");
  $sideBarContents.className = "sidebar";
  $target.appendChild($sideBarContents);

  new SideHeader({
    $target: $sideBarContents,
    initialState: {
      username: '박경빈의 Notion',
    },
  });
  
  const documentList = new DocumentList({
    $target: $sideBarContents,
    initialState: [],
    onDelete,
  });
  new DocumentAddButton({
    $target: $sideBarContents,
    initialState: {
      text: "새 페이지 추가",
    },
    onAdd,
  });

  this.render = async () => {
    const document = await request(ROUTE_DOCUMENTS);
    documentList.setState(document);
  };

  this.render();
}