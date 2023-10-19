import Editor from "./Editor.js";
import Sidebar from "./Sidebar.js";
import { asyncDataObj, request } from "./api.js";
import router from "./router.js";

export default function App({ targetEl }) {
  this.isInit = false;

  this.state = {
    selectedDocumentId: null,
    documents: { ...asyncDataObj, isLoading: true },
    content: { ...asyncDataObj, isLoading: true },
  };

  const sidebar = new Sidebar({
    targetEl,
    initialState: {
      selectedDocumentId: this.state.selectedDocumentId,
      documents: this.state.documents,
    },
    onCreate: async (parent) => {
      const res = await this.createDocument(parent);
      await this.fetchDocuments();
      router.push(`/documents/${res.id}`);
    },
    onDelete: async (id) => {
      const res = await this.deleteDocument(id);
      router.replace(res.parent ? `/documents/${res.parent.id}` : "/");
      await this.fetchDocuments();
    },
  });

  let timer = null;

  const editor = new Editor({
    targetEl,
    initialState: {
      selectedDocumentId: this.state.selectedDocumentId,
      content: this.state.content,
    },
    onChange: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await this.updateContent(document);
        await this.fetchContent(document.id);
        await this.fetchDocuments();
      }, 3000);
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    sidebar.setState({
      selectedDocumentId: this.state.selectedDocumentId,
      documents: this.state.documents,
    });
    editor.setState({
      selectedDocumentId: this.state.selectedDocumentId,
      content: this.state.content,
    });

    this.render();
  };

  this.fetchDocuments = async () => {
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

  this.fetchContent = async (id) => {
    try {
      const res = await request(`/documents/${id.toString()}`);
      this.setState({
        ...this.state,
        content: { ...asyncDataObj, data: res },
      });
    } catch (e) {
      this.setState({
        ...this.state,
        content: { ...asyncDataObj, isError: e },
      });
    }
  };

  this.updateContent = async (document) => {
    const { id, title, content } = document;

    const body = { title, content };

    const res = await request(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    return res;
  };

  this.createDocument = async (parent) => {
    const body = { title: "제목 없음", parent };

    const res = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    return res;
  };

  this.deleteDocument = async (id) => {
    // if (!id || typeof id !== "number") {
    //   throw new Error("삭제할 문서의 id를 입력하세요!");
    // }

    const res = await request(`/documents/${id}`, { method: "DELETE" });

    return res;
  };

  this.onRouterChange = (pathname) => {
    const arr = pathname.substring(1).split("/");
    const id = arr.length > 1 ? Number(arr[1]) : null;

    if (typeof id === "number" && this.state.selectedDocumentId !== id) {
      this.setState({
        ...this.state,
        selectedDocumentId: id,
      });
      this.fetchContent(id);
    } else {
      // this.setState({
      //   ...this.state,
      //   selectedDocumentId: null,
      //   content: { ...asyncDataObj, isLoading: true }
      // })
    }
  };

  this.render = () => {
    if (!this.isInit) {
      router.init(this.onRouterChange);
      this.onRouterChange(window.location.pathname);

      sidebar.render();
      editor.render();

      this.fetchDocuments();

      this.isInit = true;
    }
  };

  this.render();
}
