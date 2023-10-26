import Editor from "../component/Editor.js";
import EditHeader from "../component/EditHeader.js";
import { getItem, setItem } from "../../util/storage.js";
import { request } from "../../util/api.js";
import { removeItem } from "../../util/storage.js";

export default function EditorPage({ $target, initialState, onListRender }) {
  const $eidtor = document.createElement("div");
  $eidtor.classList = "editor-div";
  this.state = initialState;
  let docLocalSaveKey = `temp-doc-content-${this.state.selectedID}`;

  const post = getItem(docLocalSaveKey, {
    title: "",
    content: "",
  });

  const editHeader = new EditHeader({
    $target: $eidtor,
    initialState: { ...this.state, isLoading: false },
  });

  let timer = null;

  const editor = new Editor({
    $target: $eidtor,
    initialState: post,
    onEditing: (post) => {
      setItem(docLocalSaveKey, {
        ...post,
        tempSaveDate: new Date(),
      });
      if (timer !== null) {
        clearTimeout(timer);
      }
      editHeader.setState({
        isLoading: true,
        selectedDocument: this.state.selectedDocument,
      });
      timer = setTimeout(async () => {
        await request(`/documents/${post.id}`, {
          method: "PUT",
          body: JSON.stringify(post),
        });
        editHeader.setState({
          isLoading: false,
          selectedDocument: this.state.selectedDocument,
        });
        removeItem(docLocalSaveKey);
        onListRender();
      }, 2000);
    },
  });
  this.setState = async (nextState) => {
    if (this.state.selectedID !== nextState.selectedID) {
      docLocalSaveKey = `temp-doc-content-${nextState.selectedID}`;
      this.state = nextState;
      await fetchDocument();
      return;
    }
    this.state = nextState;
    this.render();

    editor.setState(this.state.selectedDocument || { title: "", content: "" });
    editHeader.setState(
      this.state || { selectedDocument: [], isLoading: false }
    );
  };

  this.render = () => {
    $target.appendChild($eidtor);
  };

  const fetchDocument = async () => {
    //state에 selectedid만 받아오면 되는것 같다.
    // id를 갖고 data를 가져오는
    const { selectedID } = this.state;

    if (selectedID !== "main") {
      const selectedDocument = await request(`/documents/${selectedID}`);
      const tempPost = getItem(docLocalSaveKey, {
        title: "",
        content: "",
      });

      if (
        tempPost.tempSaveDate &&
        tempPost.tempSaveDate > selectedDocument.updatedAt
      ) {
        if (confirm("저장되지 않은 임시데이터가 있습니다. 불러올까요?")) {
          this.setState({
            ...this.state,
            selectedDocument: tempPost,
            isLoading: false,
          });
          return;
        }
      }

      this.setState({
        ...this.state,
        selectedDocument,
        isLoading: false,
      });
    }
  };

  fetchDocument();
}
