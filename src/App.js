import { CSS_SELECTOR } from "./components/Editor/cssSelector.js";
import SideBar from "./components/SideBar.js";
import DocumentEditPage from "./pages/DocumentEditPage.js";
import { PATH } from "./routes/path.js";
import { initRouter, navigate } from "./routes/router.js";
import { getAllDocuments } from "./service/documents.js";
import { $ } from "./utils/dom.js";

export default function App({ $target }) {
  const $sideBar = new SideBar({
    $target,
    navigateToDocument: (id) => {
      navigate(`${PATH.DOCUMENTS}/${id}`);
    },
  });

  const $documentEditPage = new DocumentEditPage({
    $target,
    updateAllDocuments: async () => {
      const documentList = await getAllDocuments();
      $sideBar.setState(documentList);
    },
  });

  this.route = async () => {
    const { pathname } = window.location;

    const $editPageElement = $(`#${CSS_SELECTOR.EDIT.SECTION}`);
    $editPageElement.style.display = "none";

    if (pathname.indexOf(PATH.DOCUMENTS) === 0) {
      const [, , id] = pathname.split("/");
      $documentEditPage.setState({ id });
    }
  };

  this.route();

  initRouter(() => this.route());
}
