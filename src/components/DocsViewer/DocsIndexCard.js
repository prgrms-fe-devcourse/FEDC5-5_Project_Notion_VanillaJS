import { _DELETE } from "../../api/api.js";
import { Cross, Plus } from "../icons.js";
import { push } from "../../router.js";
import { useDocsIndex } from "../../utils/store.js";
import {
  deleteDocumentTreeFromIndex,
  flattenDocumentIndex,
} from "../../utils/updateDocumentsIndex.js";
import DocsButton from "./DocsButton.js";

const DocsIndexCardProps = {
  id: "string",
  title: "string",
};

/**
 * @description Document 목록 카드F
 */
export default function DocsIndexCard({ $parent, initState }) {
  const $component = document.createElement("div");
  $component.classList.add("docs-index-card");
  const $cardName = document.createElement("a");
  $cardName.classList.add("docs-index-a");
  const $buttonWrapper = document.createElement("div");

  $component.appendChild($cardName);
  $component.appendChild($buttonWrapper);
  $parent.appendChild($component);

  // 계층 구조 업데이트 & API CALL
  const addButton = new DocsButton({
    $parent: $buttonWrapper,
    initState: { content: Plus("icon-micro") },
    onClick: (event) => {
      event.stopPropagation();
      push(`/documents/new?parent=${this.state.id}`);
    },
  });

  const deleteButton = new DocsButton({
    $parent: $buttonWrapper,
    initState: {
      content: Cross("icon-micro"),
    },
    onClick: async (event) => {
      event.stopPropagation();
      push("/");

      // 목차 낙관적 업데이트
      deleteDocumentTreeFromIndex(
        useDocsIndex.state.data,
        parseInt(this.state.id)
      );

      const { data } = useDocsIndex.state;
      const { arrayOfData, mapOfData } = flattenDocumentIndex(data);
      useDocsIndex.setState({
        data,
        flattenArrayData: arrayOfData,
        flattenMapData: mapOfData,
      });

      await _DELETE(`documents/${this.state.id}`);
    },
  });

  this.state = initState;
  this.setState = async (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    $cardName.textContent = this.state.title;
  };
  this.render();
}
