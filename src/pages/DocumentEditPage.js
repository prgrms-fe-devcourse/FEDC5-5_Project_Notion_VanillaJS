import Editor from "../components/Editor/Editor.js";

import { getItem, setItem, removeItem } from "../utils/storage.js";
import { triggerURLChange } from "../utils/router.js";
import { fetchPutDocument } from "../utils/fetch.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $documentEditPage = document.createElement("div");
  $documentEditPage.className = "document-edit-page";

  this.state = initialState;

  const documentLocalSaveKey = `temp-document-`;
  let timer = null;

  const savedDocument = getItem(documentLocalSaveKey + this.state.id, {
    title: "",
    content: "",
    documents: "",
  });

  const editor = new Editor({
    $target: $documentEditPage,
    initialState: savedDocument,
    onEditing: (document) => {
      setItem(documentLocalSaveKey + this.state.id, {
        ...document,
        tempSaveDate: new Date(),
      });

      const initId = this.state.id;

      // 디바운스 (편집기 입력을 마치고 1.5초 뒤 실행)
      if (timer !== null) clearTimeout(timer);

      timer = setTimeout(async () => {
        // setTimeout 콜백 함수가 실행되기 전후로 id가 같은지 검사
        if (initId !== this.state.id) {
          return;
        }

        await fetchPutDocument(this.state.id, document);

        if (document !== this.state.document) {
          triggerURLChange(`/documents/${this.state.id}`);
        }

        removeItem(documentLocalSaveKey + this.state.id);
      }, 1500);
    },
  });

  this.setState = async (nextState) => {
    this.state = nextState;
    const tempDocument = getItem(documentLocalSaveKey + this.state.id, {
      title: "",
      content: "",
    });

    // 작성중인 내용이 서버에 저장되지 않은 경우
    if (
      tempDocument.tempSaveDate &&
      tempDocument.tempSaveDate > this.state.document.updatedAt
    ) {
      if (confirm("작성중인 글이 있습니다. 불러오시겠습니까?")) {
        editor.setState({
          ...tempDocument,
          documents: this.state.document.documents,
          originalContent: tempDocument.content,
        });
        this.state.document = tempDocument;

        await fetchPutDocument(this.state.id, {
          ...this.state,
          title: tempDocument.title,
          content: tempDocument.content,
        });

        if (tempDocument !== this.state.document) {
          triggerURLChange(`/documents/${this.state.id}`);
        }
      } else {
        removeItem(documentLocalSaveKey + this.state.id);
        triggerURLChange(`/documents/${this.state.id}`);
      }
    } else {
      editor.setState({
        title: this.state.document.title,
        content: this.state.document.content,
        documents: this.state.document.documents,
        originalContent: this.state.document.content,
      });
    }

    this.render();
  };

  this.render = () => {
    $target.appendChild($documentEditPage);
  };
}
