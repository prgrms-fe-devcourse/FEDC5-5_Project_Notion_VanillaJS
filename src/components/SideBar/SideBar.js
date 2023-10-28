import { SideBarHeader, SideBarList } from "./index.js";
import {
    deleteDocument,
    getRootDocument,
    makeNewDocument,
} from "../../service/api.js";
import { push } from "../../router.js";
import { removeItem } from "../../utils/storage.js";
import checkNewComponent from "../../utils/checkNewComponent.js";

export default function SideBar({ $target }) {
    const self = this;
    checkNewComponent(SideBar, self);

    const $sideBar = document.createElement("div");
    $sideBar.className = "sidebar";
    new SideBarHeader({ $target: $sideBar });

    const sideBarList = new SideBarList({
        $target: $sideBar,
        initialState: [],
        addSubDocument: async (documentId) => {
            const newDocument = await makeNewDocument("", {
                title: null,
                parent: documentId,
            });
            const { id } = newDocument;
            push(`/documents/${id}`);

            self.render();
        },
        deleteCurrDocument: async (documentId) => {
            await deleteDocument(`/${documentId}`);
            removeItem(`temp-post-${documentId}`);

            push("/");
            history.replaceState(null, null, "/");

            self.render();
        },
        onClick: async (documentId) => {
            push(`/documents/${documentId}`);
        },
    });

    const $addButton = document.createElement("button");
    $sideBar.appendChild($addButton);
    $addButton.className = "addButton";

    $addButton.innerText = `새로운 페이지 추가`;
    $addButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const newDocument = await makeNewDocument("", {
            title: null,
            parent: null,
        });

        const { id } = newDocument;
        push(`/documents/${id}`);

        self.render();
    });

    const getAllDocument = async () => {
        const allDocument = await getRootDocument();
        sideBarList.setState(allDocument);
    };

    this.render = async () => {
        await getAllDocument();
        $target.prepend($sideBar);
    };
    this.render();
}
