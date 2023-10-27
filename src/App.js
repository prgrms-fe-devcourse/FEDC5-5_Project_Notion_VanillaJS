import { request } from "./api/api.js";
import Editor from "./components/Editor/Editor.js";
import PageList from "./components/PageManager/PageList.js";
import PageManagerHeader from "./components/PageManager/PageManagerHeader.js";
import { removeItem, setItem } from "./util/storage.js";
import { push, initRouter } from "./router.js";

export default function App({ $target }) {
  this.state = {
    pageList: [],
    targetPage: null,
    targetPageDocuments: null,
  };

  const fetchDocuments = async () => {
    const documents = await request("/documents");
    this.state = { ...this.state, pageList: documents };
    $pageList.setState(documents);
    //this.setState({ ...this.state, pageList: documents });
    //$pageList.setState(documents);
  };
  const $pageManagerContainer = document.createElement("div");
  const $editorContainer = document.createElement("div");

  $pageManagerContainer.className = "page_manager_container";
  $editorContainer.className = "editor_container";
  $editorContainer.style.display = "none";
  $target.appendChild($pageManagerContainer);
  $target.appendChild($editorContainer);

  const $pageManagerHeader = new PageManagerHeader({
    $target: $pageManagerContainer,
    onNewPageAdd: async () => {
      const createdPage = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: null,
        }),
      });
      this.setState({
        ...this.state,
        targetPage: createdPage,
        targetPageDocuments: null,
      });
      $editor.setState(createdPage);
      push(`/${createdPage.id}`);
    },
  });

  const $pageList = new PageList({
    $target: $pageManagerContainer,
    initialState: this.state.pageList,
    onPageSelect: async (pageId) => {
      const response = await request(`/documents/${pageId}`);
      this.setState({
        ...this.state,
        targetPage: response,
        targetPageDocuments: response.documents || [],
      });
      $editor.setState(response);
      push(`/${pageId}`);
    },
    onSubPageAdd: async (pageId) => {
      const createdPage = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: pageId,
        }),
      });
      this.setState({
        ...this.state,
        targetPage: createdPage,
        targetPageDocuments: createdPage.documents || null,
      });
      $editor.setState(createdPage);
      push(`/${createdPage.id}`);
    },
    onPageDelete: async (pageId) => {
      await request(`/documents/${pageId}`, {
        method: "DELETE",
      });
      this.setState({
        ...this.state,
        selectedDocument: null,
      });
    },
  });

  let timer = null;

  const $editor = new Editor({
    $target: $editorContainer,
    initialState: this.state.targetPage,
    onEditing: (page) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem("temp-post", {
          ...page,
          tempSaveDate: new Date(),
        });

        await request(`/documents/${page.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: page.title,
            content: page.content,
          }),
        });
        removeItem("temp-post");
        this.render();
      }, 1000);
    },
    validateLink: (linkId) => {
      return this.state.pageList.some((page) => page.id === linkId);
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = async () => {
    //console.log(this.state);
    await fetchDocuments();
    //$editor.render();
    if (this.state.targetPage) {
      $editorContainer.style.display = "block";
    } else {
      $editorContainer.style.display = "none";
    }
  };

  this.route = async () => {
    await fetchDocuments();
    const { pathname } = window.location;
    if (pathname === "/") {
      this.setState({
        ...this.state,
        targetPage: null,
        targetPageDocuments: null,
      });
    } else {
      const [, pageId] = pathname.split("/");
      //console.log(pageId);
      const response = await request(`/documents/${pageId}`);
      this.setState({
        ...this.state,
        targetPage: response,
        targetPageDocuments: response.documents || [],
      });
      $editor.setState(response);
    }
  };
  //fetchDocuments();
  // window.addEventListener("popstate", async () => {
  //   this.route();
  // });
  this.route();
  initRouter(() => this.render());
}
