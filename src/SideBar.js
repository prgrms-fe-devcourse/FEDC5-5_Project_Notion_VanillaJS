import SideBarHeader from "./SideBarHeader.js";
import SideBarList from "./SideBarList.js";
import { deleteDocument, getRootDocument, makeNewDocument } from "./api.js";

export default function SideBar({ $target }) {
    const $sideBar = document.createElement("div");
    new SideBarHeader({ $target: $sideBar });

    const self = this;

    const sideBarList = new SideBarList({
        $target: $sideBar,
        initialState: [],
        addSubDocument: async (documentId) => {
            const data = await makeNewDocument("", {
                title: "빈 페이지",
                parent: documentId,
            });
            const { id } = data;
            console.log(data);
            console.log(id);

            self.render();
        },
        deleteCurrDocument: async (documentId) => {
            await deleteDocument(`/${documentId}`);

            self.render();
        },
    });

    const $addButton = document.createElement("button");
    $sideBar.appendChild($addButton);

    $addButton.innerText = `새로운 루트 페이지 추가`;
    $addButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const data = await makeNewDocument("", {
            title: "빈 페이지",
            parent: null,
        });

        self.render();
    });

    const getAllDocument = async () => {
        const ALLDOCUMENT = await getRootDocument();
        sideBarList.setState(ALLDOCUMENT);
    };

    this.render = async () => {
        await getAllDocument();
        $target.appendChild($sideBar);

        console.log(sideBarList.state);
    };
    this.render();
}
