import { SideBar } from "./components/SideBar/index.js";
import { DocumentPage } from "./components/DocumentEditor/index.js";
import { initRouter } from "./router.js";
import checkNewComponent from "./utils/checkNewComponent.js";

export default function App({ $target }) {
    const self = this;
    checkNewComponent(App, self);

    const sideBar = new SideBar({
        $target,
    });

    const documentPage = new DocumentPage({
        $target,
        initialState: {
            title: "",
            content: "",
            documentId: null,
        },
        updateSideBar: () => sideBar.render(),
    });

    const ToggleDocumentVisibility = (parent) => {
        const childDocument = document.querySelector(".documentPage") || null;
        if (childDocument == null) {
            return;
        }
        parent.removeChild(childDocument);
    };

    this.route = () => {
        const { pathname } = window.location;

        if (pathname === "/") {
            ToggleDocumentVisibility($target);
            sideBar.render();
        } else if (pathname.includes("/documents/")) {
            sideBar.render();
            const [, , documentId] = pathname.split("/");
            documentPage.setState({ documentId });
        }
    };
    this.route();

    initRouter(() => this.route());
}
