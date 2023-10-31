import { Editor, DocumentPageList } from "./index.js";
import { getSelectedDocument, updateDocument } from "../../service/api.js";
import { getItem, setItem } from "../../utils/storage.js";
import checkNewComponent from "../../utils/checkNewComponent.js";

export default function DocumentPage({ $target, initialState, updateSideBar }) {
    const self = this;
    checkNewComponent(DocumentPage, self);

    const $documentPage = document.createElement("div");
    $documentPage.className = "documentPage";

    this.state = initialState;

    this.setState = async (nextState) => {
        this.state = nextState;
        const { documentId } = this.state;

        postLocalSaveKey = `temp-post-${documentId}`;

        if (documentId != null) {
            const selectedDocument = await getSelectedDocument(
                `/${documentId}`
            );

            editor.setState(selectedDocument);
            documentPageList.setState(selectedDocument);
        }

        this.render();
    };

    let postLocalSaveKey = `temp-post-${this.state.documentId}`;

    const post = getItem(postLocalSaveKey, {
        title: "",
        content: "",
    });

    const updateDocumentPage = async (post) => {
        const { title } = post;
        if (title == null || title.trim() === "") {
            alert("제목을 작성해야 문서가 저장됩니다.");
            return false;
        }
        await updateDocument(`/${post.id}`, post);

        updateSideBar();
        return true;
    };

    let timer = null;
    const editor = new Editor({
        $target: $documentPage,
        initialState: post,
        onEditing: (post) => {
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                const isValidDocument = await updateDocumentPage(post);
                if (isValidDocument) {
                    setItem(`temp-post-${post.id}`, {
                        ...post,
                        tempSaveDate: new Date(),
                    });
                }
            }, 1000);
        },
    });

    const documentPageList = new DocumentPageList({
        $target: $documentPage,
        initialState: [],
    });

    this.render = () => {
        $target.appendChild($documentPage);
    };
}
