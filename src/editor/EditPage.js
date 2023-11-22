import { insertDocument, request, updateDocument } from "../utils/api.js";
import { CREATED_DOCUMENTS_PARENT_ID_KEY } from "../utils/key.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import AutoSave from "./AutoSave.js";
import Editor from "./Editor.js";

export default function EditPage({ $target, initialState, onCreateDocument }) {
  const $editPage = document.createElement("div");
  $editPage.className = "editPage";

  this.state = initialState;

  let postLocalSaveKey = `temp-docs-${this.state.documentId}`;

  const post = getItem(postLocalSaveKey, {
    title: "",
    content: "",
  });
  let timer = null;

  const editor = new Editor({
    $target: $editPage,
    initialState: post,
    onEditing: (docs) => {
      // 디바운스를 위한 코드
      clearTimeout(timer);
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...docs,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.documentId === "new";
        if (isNew) {
          const isParent = getItem(CREATED_DOCUMENTS_PARENT_ID_KEY, null);
          const state = {
            ...docs,
            parent: isParent,
          };
          const createPost = await insertDocument(state);
          state.title === "" ? (state.title = "제목 없음") : state.title;
          await updateDocument({
            ...state,
            id: createPost.id,
          });
          history.replaceState(null, null, `/documents/${createPost.id}`);
          removeItem(postLocalSaveKey);
          removeItem(CREATED_DOCUMENTS_PARENT_ID_KEY);
          onCreateDocument();

          this.setState({
            documentId: createPost.id,
          });
        } else {
          await updateDocument({ ...docs, id: this.state.documentId });
          removeItem(postLocalSaveKey);
        }
        autoSave.setState(true);
      }, 2000);
    },
    onCreateDocument,
  });

  const autoSave = new AutoSave({
    $target: $editPage,
    initialState: false,
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      postLocalSaveKey = `temp-docs-${nextState.documentId}`;
      this.state = nextState;

      if (this.state.documentId === "new") {
        const post = getItem(postLocalSaveKey, {
          title: "",
          content: "",
        });
        this.render();
        editor.setState(post);
      } else {
        await fetchPost();
      }
      return;
    }

    this.state = { ...this.state, ...nextState };
    this.render();
    editor.setState(
      this.state.post || {
        title: "",
        content: "",
      }
    );
  };

  this.render = () => {
    $target.appendChild($editPage);
  };

  this.render();

  const fetchPost = async () => {
    const { documentId } = this.state;

    if (documentId !== "new") {
      const post = await request(`/documents/${documentId}`);

      const tempPost = getItem(postLocalSaveKey, {
        title: "",
        content: "",
      });

      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updatedAt) {
        if (confirm("임시 저장된 내용이 있습니다. 불러오시겠습니까?")) {
          this.setState({
            ...this.state,
            post: tempPost,
          });
          return;
        }
      }

      this.setState({
        ...this.state,
        post,
      });
    }
  };
}
