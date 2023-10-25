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
        console.log(this.state);
        postLocalSaveKey = `temp-post-${documentId}`;
        console.log(postLocalSaveKey);

        console.log(documentId);
        if (documentId != null) {
            const selectedDocument = await getSelectedDocument(
                `/${documentId}`
            );
            console.log(selectedDocument);
            editor.setState(selectedDocument);
        }

        this.render();
    };
    let postLocalSaveKey = `temp-post-${this.state.documentId}`;
    console.log(postLocalSaveKey);

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
                setItem(postLocalSaveKey, {
                    ...post,
                    tempSaveDate: new Date(),
                });
                updateDocumentPage(post);
            }, 2000);
        },
    });

    const updateDocumentPage = async (post) => {
        console.log(post);
        const { title } = post;
        if (title == null || title.trim() === "") {
            return;
        }
        await updateDocument(`/${post.id}`, post);
        history.replaceState(null, null, `/documents/${post.id}`);
        updateSideBar();
    };

    this.render = () => {
        $target.appendChild($documentPage);
    };

    // this.render();
}
