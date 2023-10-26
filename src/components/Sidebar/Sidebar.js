import SidebarHeader from "./SidebarHeader.js";
import DocumentList from "./DocumentList.js";
import NewDocumentButton from "./NewDocumentButton.js";
import { validateConstructorUsage } from "../../utils/validation.js";
import { isEqual } from "../../utils/helper.js";
import { CLASS_NAME } from "../../utils/constants.js";

export default function Sidebar({ $target, initialState, onDelete, onAdd }) {
  validateConstructorUsage(new.target);

  const $sidebar = document.createElement("div");
  $sidebar.className = CLASS_NAME.SIDEBAR;

  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    if (isEqual(this.state, nextState)) return;

    this.state = { ...this.state, ...nextState };
    this.render();
  };

  new SidebarHeader({
    $target: $sidebar,
    initialState: "세인의 Notion",
  });

  new NewDocumentButton({
    $target: $sidebar,
    onAdd,
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: [],
      isOpen: {},
    },
    onDelete,
    onAdd,
  });

  this.render = () => {
    documentList.setState(this.state);
  };
}
