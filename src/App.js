import SideBar from "./SideBar.js";
import DocumentPage from "./DocumentPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
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

    const ToggleDocumentVisibility = (visible) => {
        const documentVisibility =
            document.querySelector(".documentItem") || null;
        if (documentVisibility == null) {
            return;
        }
        documentVisibility.style.display = visible;
    };
    const removeDocumentVisibility = (parent) => {
        const childDocument = document.querySelector(".documentItem") || null;
        if (childDocument == null) {
            return;
        }
        parent.removeChild(childDocument);
    };

    this.route = () => {
        const { pathname } = window.location;

        if (pathname === "/") {
            // ToggleDocumentVisibility("none");
            removeDocumentVisibility($target);

            sideBar.render();
        } else if (pathname.includes("/documents/")) {
            const [, , documentId] = pathname.split("/");
            documentPage.setState({ documentId });

            // ToggleDocumentVisibility("block");
        }
    };
    this.route();

    initRouter(() => this.route());
}
