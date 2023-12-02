import classNames from "classnames";

import { createComponent } from "@/core";
import { DocumentResponse } from "@/types";
import styles from "./documentItem.module.scss";

interface DocumentItemProps {
  document: DocumentResponse;
}

interface DocumentItemReturnType {
  element: string;
  bindEvents?: () => void;
}

const {
  s_documentItem,
  s_childrenDocumentList,
  s_documentTitle,
  s_buttonContainer,
  s_titleContainer,
  s_contentContainer,
} = styles;

function DocumentItem({ document }: DocumentItemProps): DocumentItemReturnType {
  const { id, title, documents } = document;

  const childrenDocuments = documents.length
    ? `<ul class="${classNames("childrenDocumentList", s_childrenDocumentList)}">
    ${documents
      .map((childDocument) => {
        const childDocumentItemComponent = createComponent(DocumentItem, { document: childDocument });

        return childDocumentItemComponent.element;
      })
      .join("")}
    </ul>`
    : "";

  return {
    element: `
      <li data-id="${id}" class="${classNames("documentItem", s_documentItem)}">
        <div class="${s_contentContainer}" >
          <img src="/assets/svg/arrow.svg" class="documentToggle" alt="문서 토글" tabindex="0"/>
          <div class="${s_titleContainer}">
            <span data-id="${id}" tabindex="0" class="${classNames("documentTitle", s_documentTitle)}">${title}</span>
            <div class="${s_buttonContainer}">
              <button data-parent-id="${id}" class="addDocumentButton" tabindex="0" type="button">
                <img src="/assets/svg/plus.svg" alt="하위 문서 추가" />
              </button>
              <button data-parent-id="${id}" class="deleteDocumentButton" type="button">
                <img src="/assets/svg/delete.svg" alt="문서 삭제" />
              </button>
            </div>
          </div>
        </div>
        ${childrenDocuments}
      </li>
    `,
  };
}

export default DocumentItem;
