import Editor from "../components/editor/Editor.js";

import { _GET, _POST, _PUT } from "../api/api.js";
import { NEW_DOCUMENT_INIT_ID } from "../utils/constants.js";
import { useDocsIndex, useDocument, useToolbar } from "../utils/store.js";
import {
  createDocumentTreeFromIndex,
  flattenDocumentIndex,
} from "../utils/updateDocumentsIndex.js";
import EditorToolbar from "../components/editor/EditorToolbar.js";

const DocumentProps = {
  id: "string",
  title: "string",
  content: "string",
  documents: [
    {
      id: "number",
      title: "string",
      createdAt: "string",
      updatedAt: "string",
    },
  ],
  createdAt: "string",
  updatedAt: "string",
};

const EditorViewProps = {
  documentId: "number",
  documentData: "DocumentProps",
  documentParentId: "number",
};

/**
 * @description 마크다운 편집기 뷰
 */
export default function EditorView({ $parent, initState }) {
  const $component = document.createElement("section");
  $component.setAttribute("id", "editor-view");
  $component.classList.add("view");

  let timer = null;
  let isCreate = false;

  // COMPONENTS =========================================================== //
  const editor = new Editor({
    $parent: $component,
    onEditing: (data) => {
      // JS 의 기초적인 Debounce 기법 //
      if (timer !== null) {
        // 에디팅이 발생하면 예약되어있던 setTimeout 지워줌 Debounce
        clearTimeout(timer);
      }
      // 그 후 새로운 setTimeout 을 실행시켜줌
      timer = setTimeout(async () => {
        // setItem(postLocalSaveKey, { ...post, tempSaveDate: new Date() });
        const isNew = this.state.documentId === NEW_DOCUMENT_INIT_ID;
        if (isNew) {
          const createdDocument = await _POST("documents", {
            title: data.title,
            parent: this.state.documentParentId,
          });
          // content 데이터 보정 - API body 에 content 가 포함되지 않기 때문에
          isCreate = true;
          createdDocument["content"] = data.content;

          history.replaceState(null, null, `/documents/${createdDocument.id}`);
          // removeItem(postLocalSaveKey);
          this.setState({
            documentId: createdDocument.id,
            documentData: createdDocument,
          });

          // 목차 낙관적 업데이트
          createDocumentTreeFromIndex(
            useDocsIndex.state.data,
            parseInt(this.state.documentParentId),
            {
              id: createdDocument.id,
              title: createdDocument.title,
              documents: [],
            }
          );

          const docsIndexData = useDocsIndex.state.data;
          const { arrayOfData, mapOfData } =
            flattenDocumentIndex(docsIndexData);
          useDocsIndex.setState({
            data: docsIndexData,
            flattenArrayData: arrayOfData,
            flattenMapData: mapOfData,
          });
        } else {
          await _PUT(`documents/${data.id}`, {
            title: data.title,
            content: data.content,
          });
          // removeItem(postLocalSaveKey);
        }
      }, 1000);
    },
  });

  const editorToolbar = new EditorToolbar({ $parent: $component });
  // =========================================================== COMPONENTS //

  this.state = initState;
  this.setState = async (nextState) => {
    // document data 업데이트가 필요한 상황
    if (this.state.documentId !== nextState.documentId) {
      this.state = { ...this.state, ...nextState };
      // 경로명이 new 인 경우 - 모든 editor 데이터를 초기화
      if (this.state.documentId === NEW_DOCUMENT_INIT_ID) {
        this.setState({
          documentId: NEW_DOCUMENT_INIT_ID,
          documentData: { id: NEW_DOCUMENT_INIT_ID, title: "", content: "" },
        });

        useDocument.setState({
          id: NEW_DOCUMENT_INIT_ID,
          title: "",
          content: "",
          documents: [],
          createdAt: "",
          updatedAt: "",
        });
        // this.render();
      } else {
        // 이전에 보던 경로와 다른 경우
        // 새 document fetch -> 다시 setState 호출
        // useDocument 데이터 삽입
        await fetchDocument();
      }
      return;
    }
    // document data 업데이트가 필요 없는 상황 -> 원본 데이터이므로 다시 데이터를 덮음
    this.state = { ...this.state, ...nextState };
    this.render();

    useDocument.setState(this.state.documentData);
    editor.render();
  };

  this.render = () => {
    $parent.appendChild($component);
  };
  this.render();

  // API CALL =========================================================== //
  const fetchDocument = async () => {
    const { documentId, documentData } = this.state;

    if (documentId !== NEW_DOCUMENT_INIT_ID) {
      const fethedData = await _GET(`documents/${documentId}`);

      // content 데이터 보정 - API body 에 content 가 포함되지 않기 때문에
      if (isCreate) {
        if (documentData.content?.length > 0) {
          fethedData.content = documentData.content;
        }
        isCreate = false;
      }

      this.setState({ ...this.state, documentData: fethedData });
    }
  };
  // =========================================================== API CALL //

  // subscribers //
  useToolbar.setState({
    subscribers: [editorToolbar],
  });
}
