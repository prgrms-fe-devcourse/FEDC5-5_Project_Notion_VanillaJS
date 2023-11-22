import { request } from "../utils/api.js";
import Documents from "./Documents.js";
import Header from "./Header.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("aside");
  $sidebar.className = "sidebar";

  new Header({
    $target: $sidebar,
    text: "개인 페이지",
  });

  const documents = new Documents({
    $target: $sidebar,
    initialState: "",
    onDeleteDocument: () => {
      this.setState();
    },
  });

  this.setState = async () => {
    const response = await request("/documents");
    documents.setState(response);
    this.render();
  };

  this.setState();

  this.render = () => {
    $target.appendChild($sidebar);
  };
}
