import { createComponent } from "@/core";
import { DocumentItem } from "@/components";
import { handleClickAnchor, navigateTo } from "@/utils";
import { DocumentPostRequest, DocumentPostResponse, DocumentResponse } from "@/types";
import styles from "./sidebar.module.scss";

const { s_sidebar, s_button } = styles;

interface SidebarProps {
  documents: DocumentResponse[];
  createDocument: ({ title, parent }: DocumentPostRequest) => Promise<DocumentPostResponse>;
  removeDocument: (id: number) => void;
}

function Sidebar({ documents, createDocument, removeDocument }: SidebarProps) {
  const handleClickAddDocumentButton = (id: number) => {
    createDocument({ title: "Untitled", parent: id });
  };

  const handleClickDeleteButton = (id: number) => {
    removeDocument(id);
    navigateTo("/");
  };

  const handleClickAddRootDocumentButton = () => {
    createDocument({ title: "Untitled", parent: null });
  };

  const handleToggleDocuments = (target: HTMLElement) => {
    const $clickedItem = target.closest(".documentItem") as HTMLElement;
    const $firstChildList = $clickedItem.querySelector(".childrenDocumentList:first-of-type") as HTMLElement;

    if ($firstChildList) {
      $firstChildList.classList.toggle("show");
    }

    target.classList.toggle("rotated");
  };

  const handleClickDocumentItem = (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("documentToggle")) {
      handleToggleDocuments(target);
    }

    if (target && target.dataset.id) {
      const { id } = target.dataset;

      navigateTo(`/documents/${id}`);
    }

    if (target.parentElement && !isNaN(Number(target.parentElement.dataset.parentId))) {
      const $button = target.parentElement as HTMLButtonElement;
      const parentId = Number(target.parentElement.dataset.parentId);

      if ($button.classList.contains("addDocumentButton") && parentId) {
        handleClickAddDocumentButton(parentId);
      }

      if ($button.classList.contains("deleteDocumentButton") && parentId) {
        handleClickDeleteButton(parentId);
      }
    }
  };

  const bindEvents = () => {
    const $addRootDocumentButton = window.document.querySelector(".addRootDocumentButton") as HTMLButtonElement;
    const $documentList = window.document.querySelector(".documentList") as HTMLUListElement;
    const $notionLogo = window.document.querySelector(".notionLogo") as HTMLAnchorElement;

    $addRootDocumentButton.addEventListener("click", handleClickAddRootDocumentButton);
    $documentList.addEventListener("click", handleClickDocumentItem);
    $notionLogo.addEventListener("click", handleClickAnchor);
  };

  const documentList = documents
    .map((document) => {
      const documentItemComponent = createComponent(DocumentItem, { document });

      return documentItemComponent.element;
    })
    .join("");

  return {
    element: `
      <div class=${s_sidebar}>
        <a href="/" class="notionLogo">
          <img src="/assets/svg/notion.svg" alt="노션 로고"/>
          <span>Notion</span>
        </a>
        <button data-parent-id="null" class="addRootDocumentButton ${s_button}" aria-label="새 문서 추가" type="button">+ 페이지 추가</button>
        <ul class="documentList">
          ${documentList}
        </ul>
      </div>
    `,
    bindEvents,
  };
}

export default Sidebar;
