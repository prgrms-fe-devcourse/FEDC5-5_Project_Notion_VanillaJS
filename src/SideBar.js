import SideBarHeader from "./SideBarHeader.js";
import SideBarList from "./SideBarList.js";
import { deleteDocument, getRootDocument, makeNewDocument } from "./api.js";
import { push } from "./router.js";
import { removeItem } from "./storage.js";

export default function SideBar({ $target }) {
    const $sideBar = document.createElement("div");
    new SideBarHeader({ $target: $sideBar });

    const self = this;

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

            // console.log(newDocument);
            // console.log(id);

            self.render();
        },
        deleteCurrDocument: async (documentId) => {
            await deleteDocument(`/${documentId}`);
            push("/");
            history.replaceState(null, null, "/");
            removeItem(`temp-post-${documentId}`);
            self.render();
        },
        onClick: async (documentId) => {
            push(`/documents/${documentId}`);
        },
    });

    const $addButton = document.createElement("button");
    $sideBar.appendChild($addButton);

    $addButton.innerText = `새로운 루트 페이지 추가`;
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
        const ALLDOCUMENT = await getRootDocument();
        sideBarList.setState(ALLDOCUMENT);
    };

    this.render = async () => {
        await getAllDocument();
        $target.prepend($sideBar);

        console.log(sideBarList.state);
    };
    this.render();
}
