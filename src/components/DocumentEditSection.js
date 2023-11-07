import Editor from "./Editor.js";
import { request } from "../utils/api.js";
import { setItem, removeItem, getItem } from "../utils/storage.js";
import { replace } from "../utils/route.js";

export default function DocumentEditSection({
  $target,
  initialState,
  onChangeDocument,
}) {
  const $div = document.createElement("div");

  this.state = initialState;

  let documentLocalSaveKey = '';

  const defaultDocumentValue = {
    title: "",
    content: "",
  };

  let timer = null;

  const editor = new Editor({
    $target: $div,
    initialState: {
      documentId: this.state.documentId,
      document: this.state.document,
    },
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        documentLocalSaveKey = `temp-document-${
          document.id ? document.id : "new"
        }`;

        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveDate: new Date(),
        });

        if (this.state.documentId === "new") {
          const createDocument = await request("/documents", {
            method: "POST",
            body: JSON.stringify({
              title: document.title,
              parent: document.parentId,
            }),
          });

          replace(`/document/${createDocument.id}`, null);

          createDocument.content = getItem(
            documentLocalSaveKey,
            defaultDocumentValue
          ).content;

          await request(`/documents/${createDocument.id}`, {
            method: "PUT",
            body: JSON.stringify({
              title: createDocument.title,
              content: createDocument.content,
            }),
          });

          documentLocalSaveKey = `temp-document-${createDocument.id}`;

          setItem(documentLocalSaveKey, {
            ...createDocument,
            tempSaveDate: new Date(),
          });
          removeItem("temp-document-new");

          onChangeDocument({
            documentId: createDocument.id,
            document: createDocument,
          });
        } else if(this.state.documentId !== "new") {
          const updateDocument = await request(`/documents/${document.id}`, {
            method: "PUT",
            body: JSON.stringify({
              title: document.title,
              content: document.content,
            }),
          });

          onChangeDocument({
            documentId: document.id,
            document: updateDocument,
          });
          documentLocalSaveKey = `temp-document-${document.id}`;
          removeItem(documentLocalSaveKey);
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;

      if (this.state.documentId === "new") {
        const storedDocument = getItem("temp-document-new");
        if (storedDocument) {
          const confirmGetLocalData = window.confirm(
            "저장안된 임시 데이터가 존재합니다. 불러올까요??"
          );
          this.render();
          editor.setState(
            confirmGetLocalData ? storedDocument : defaultDocumentValue
          );
        } else {
          editor.setState(defaultDocumentValue);
        }
      } else if (this.state.documentId !== "new") {
        await fetchDocument();
        return;
      }
    }

    this.state = nextState;
    this.render();
    editor.setState(this.state.document);
  };

  this.render = () => {
    $target.appendChild($div);
  };

  const fetchDocument = async () => {
    const { documentId } = this.state;

    if (documentId === "new") return;

    documentLocalSaveKey = `temp-document-${documentId}`;

    const storedDocument = getItem(documentLocalSaveKey, defaultDocumentValue);
    const { tempSaveDate } = storedDocument;

    const document = await request(`/documents/${documentId}`);

    if (tempSaveDate && tempSaveDate > document.updatedAt) {
      if (confirm("저장안된 임시 데이터가 존재합니다. 불러올까요?")) {
        this.setState({
          ...this.state,
          document: storedDocument,
        });
        return;
      }
    }

    this.setState({
      documentId,
      document,
    });
  };
}
