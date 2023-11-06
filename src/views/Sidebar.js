import DocsIndexViewer from "../components/DocsViewer/DocsIndexViewer.js";

import { SIDEBAR_VIEW_MODE } from "../utils/constants.js";
import { useDocsIndex } from "../utils/store.js";

import { _GET } from "../api/api.js";
import { flattenDocumentIndex } from "../utils/updateDocumentsIndex.js";

const SidebarProps = {
  sidebarViewMode: "string",
};

/**
 * @description Sidbar root 컴포넌트
 */
export default function Sidebar({ $parent, initState }) {
  const $component = document.createElement("section");
  $component.setAttribute("id", "sidebar");
  $component.classList.add("slide");

  const docsIndexViewer = new DocsIndexViewer({
    $parent: $component,
  });

  const sidebarViewRender = async (sidebarViewMode) => {
    // init component render //
    $component.innerHTML = "";

    if (sidebarViewMode === SIDEBAR_VIEW_MODE.DOCS_INDEX_VIEWER) {
      // update data //
      const fetchData = await fetchDocuments();
      // render child component
      const { arrayOfData, mapOfData } = flattenDocumentIndex(fetchData);
      useDocsIndex.setState({
        data: fetchData,
        flattenArrayData: arrayOfData,
        flattenMapData: mapOfData,
      });
    }
  };

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    sidebarViewRender(this.state.sidebarViewMode);
    $parent.appendChild($component);
  };

  // API CALL ========================================================== //
  const fetchDocuments = async () => {
    const documents = await _GET("documents");

    return documents;
  };
  // ========================================================== API CALL //

  // subscribers //
  useDocsIndex.setState({
    subscribers: [...useDocsIndex.state.subscribers, docsIndexViewer],
  });
}
