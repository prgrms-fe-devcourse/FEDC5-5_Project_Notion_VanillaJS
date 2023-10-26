import Finder from "./Finder.js";
import Editor from "./Editor.js";
import Indicator from "./Indicator.js";
import router from "./util/router.js";
import { asyncDataObj, request } from "./util/api.js";
import {
  setItem,
  getItem,
  removeItem,
  getLocalSaveKey,
} from "./util/storage.js";
import { UNTITLED, compareObject } from "./util/index.js";

export default function App({ targetEl }) {
  this.isInit = false;

  this.state = {
    selectedDocumentId: null,
    documents: { ...asyncDataObj, isLoading: true },
    document: { ...asyncDataObj },
  };

  this.setState = (nextState) => {
    const prevState = JSON.parse(JSON.stringify(this.state));

    if (compareObject(prevState, nextState).isDifferent) {
      this.state = nextState;

      // 선택된 문서가 변경된 경우, 문서 목록이 변경된 경우
      if (
        compareObject(
          prevState.selectedDocumentId,
          nextState.selectedDocumentId
        ).isDifferent ||
        compareObject(prevState.documents, nextState.documents).isDifferent
      ) {
        finder.setState({
          selectedDocumentId: this.state.selectedDocumentId,
          documents: this.state.documents,
        });
      }

      // 항상
      editor.setState({ ...this.state });

      this.render();
    }
  };

  const onCreate = async (parent) => {
    const res = await createDocument(parent);

    await fetchDocuments();

    if (res.id) {
      router.push(`/documents/${res.id}`);
    } else {
      throw new Error("문서 생성 과정에서 에러가 발생하였습니다!");
    }
  };

  const onDelete = async (id) => {
    const res = await deleteDocument(id);
    router.replace(res.parent?.id ? `/documents/${res.parent.id}` : "/");
    await fetchDocuments();
  };

  let serverUpdateTimer = null;
  let localSaveTimer = null;
  let optimisticUpdateTimer = null;

  const onEditing = (document) => {
    clearTimeout(serverUpdateTimer);
    clearTimeout(localSaveTimer);
    clearTimeout(optimisticUpdateTimer);
    serverUpdateTimer = setTimeout(async () => {
      await updateDocument(document);

      const LOCAL_SAVE_KEY = getLocalSaveKey(document.id);
      removeItem(LOCAL_SAVE_KEY);

      await fetchDocument(document.id);

      await fetchDocuments();
    }, 3000);
    localSaveTimer = setTimeout(async () => {
      localSaveDocument(document);
    }, 250);
    optimisticUpdateTimer = setTimeout(async () => {
      optimisticUpdate(document);
    }, 50);
  };

  const indicator = new Indicator({
    targetEl,
    initialState: false,
  });

  const finder = new Finder({
    targetEl,
    initialState: {
      selectedDocumentId: this.state.selectedDocumentId,
      documents: this.state.documents,
    },
    onCreate,
    onDelete,
  });

  const editor = new Editor({
    targetEl,
    initialState: { ...this.state },
    onEditing,
  });

  const optimisticUpdate = async ({ id, title }) => {
    const spanEl = document.querySelector(
      `.documents li[data-id="${id}"] .document-title span`
    );

    if (spanEl) {
      spanEl.innerHTML = title.length ? title : UNTITLED;
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await request("/documents");

      this.setState({
        ...this.state,
        documents: { ...asyncDataObj, data: res },
      });
    } catch (e) {
      this.setState({
        ...this.state,
        documents: { ...asyncDataObj, isError: e },
      });
    }
  };

  const fetchDocument = async (id) => {
    if (id === null) {
      this.setState({
        ...this.state,
        document: { ...asyncDataObj },
      });

      return null;
    }

    if (id !== this.state.document.data?.id) {
      this.setState({
        ...this.state,
        document: { ...asyncDataObj, isLoading: true },
      });
    }

    const LOCAL_SAVE_KEY = getLocalSaveKey(id);
    const storedData = getItem(LOCAL_SAVE_KEY, false);

    try {
      const res = await request(`/documents/${id.toString()}`);

      const savedAt = new Date(storedData.localSaveDate).getTime();
      const updatedAt = new Date(res.updatedAt).getTime();

      if (
        savedAt > updatedAt &&
        window.confirm("로컬에 저장된 최신 정보가 있습니다. 가져오시겠습니까?")
      ) {
        delete storedData.localSaveDate;

        this.setState({
          ...this.state,
          document: { ...asyncDataObj, data: storedData },
        });
      } else {
        this.setState({
          ...this.state,
          document: { ...asyncDataObj, data: res },
        });
      }

      this.setState({
        ...this.state,
        document: {
          ...asyncDataObj,
          data: savedAt > updatedAt ? storedData : res,
        },
      });
    } catch (e) {
      this.setState({
        ...this.state,
        document: { ...asyncDataObj, isError: e },
      });
    }
  };

  const updateDocument = async (document) => {
    const { id, title, content } = document;

    const body = { title, content };

    const res = await request(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    return res;
  };

  const createDocument = async (parent) => {
    const body = { title: "", parent };

    const res = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    return res;
  };

  const deleteDocument = async (id) => {
    if (!id || typeof id !== "number") {
      throw new Error("삭제할 문서의 id를 입력하세요!");
    }

    const res = await request(`/documents/${id}`, { method: "DELETE" });

    return res;
  };

  const localSaveDocument = async (document) => {
    if (
      this.state.document.data.id === document.id &&
      (this.state.document.data.title !== document.title ||
        this.state.document.data.content !== document.content)
    ) {
      const LOCAL_SAVE_KEY = getLocalSaveKey(document.id);
      setItem(LOCAL_SAVE_KEY, { ...document, localSaveDate: new Date() });
    }
  };

  const menualUpdateDocument = async (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();

      await updateDocument(editor.state.document.data);

      const LOCAL_SAVE_KEY = getLocalSaveKey(editor.state.document.data.id);
      removeItem(LOCAL_SAVE_KEY);

      await fetchDocument(editor.state.document.data.id);
      await fetchDocuments();
    }
  };

  const onRouterChange = (pathname) => {
    const pattern = new RegExp(/^\/documents\/(?<id>\d+)/);
    const match = pattern.exec(pathname);
    const id = match?.groups?.id ? Number(match.groups.id) : null;

    if (pathname === "/" || (match && id)) {
      if (id !== this.state.selectedDocumentId) {
        this.setState({
          ...this.state,
          selectedDocumentId: id,
        });

        fetchDocument(id);
      }
    } else {
      router.replace("/");
    }

    clearTimeout(serverUpdateTimer);
    clearTimeout(localSaveTimer);
    clearTimeout(optimisticUpdateTimer);
  };

  this.init = () => {
    router.init(onRouterChange);
    onRouterChange(window.location.pathname);
    window.addEventListener("keydown", menualUpdateDocument);

    indicator.render();
    finder.render();
    editor.render();

    fetchDocuments();
  };

  this.render = () => {
    if (!this.isInit) {
      this.init();
      this.isInit = true;
    }
  };

  this.render();
}
