import Editor from "./Editor.js";
import { getSelectedDocument, updateDocument } from "./api.js";
import { getItem, setItem } from "./storage.js";

export default function DocumentPage({ $target, initialState, updateSideBar }) {
    const $documentPage = document.createElement("div");
    $documentPage.className = "documentItem";

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
        }

        this.render();
    };
    let postLocalSaveKey = `temp-post-${this.state.documentId}`;

    const post = getItem(postLocalSaveKey, {
        title: "",
        content: "",
    });

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
                    // 디바운싱 중에 다른 문서 선택하면 로컬 스토리지에 다른 문서로 저장됨
                    setItem(`temp-post-${post.id}`, {
                        ...post,
                        tempSaveDate: new Date(),
                    });
                }
            }, 2000);
        },
    });

    const updateDocumentPage = async (post) => {
        const { title } = post;
        if (title == null || title.trim() === "") {
            alert("제목을 작성해야 문서가 저장됩니다.");
            return false;
        }
        await updateDocument(`/${post.id}`, post);
        history.replaceState(null, null, `/documents/${post.id}`);
        updateSideBar();
        return true;
    };

    this.render = () => {
        $target.appendChild($documentPage);
    };

    // this.render();
}
