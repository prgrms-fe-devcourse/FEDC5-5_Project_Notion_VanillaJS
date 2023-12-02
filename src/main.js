import Sidebar from "./component/sidebar/Sidebar.js";
import Page from "./component/main/Page.js";
import SearchModal from "./component/modal/searchModal.js";

const rootElement = document.querySelector('#app');

const sidebar = new Sidebar({
    rootElement,
    onSetPage: (id) => {
        page.getDocument(id);
    },
    onDeleteItem: () => {
        page.showNotDataPage();
        history.replaceState(null, null, "/");
    }
});
const page = new Page({
    rootElement,
    onChangeTitle: (id, title) => {
        page.PageTitle.setBreadCrumb(id);
        sidebar.documentList.updateDocumentTitle(id, title);
    }
});

const searchModal = new SearchModal({
    rootElement, setPage: (id) => {
        page.getDocument(id);
    }
});