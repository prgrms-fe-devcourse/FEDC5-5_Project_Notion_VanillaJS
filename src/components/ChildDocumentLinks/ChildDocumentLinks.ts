import { DocumentMeta } from "@/types";
import { handleClickAnchor } from "@/utils";
import styles from "./childDocuments.module.scss";

interface ChildDocumentLinksProps {
  documents: DocumentMeta[];
}

const { s_childDocumentsList } = styles;

function ChildDocumentLinks({ documents }: ChildDocumentLinksProps) {
  const bindEvents = () => {
    const $childDocuments = window.document.querySelector(`.${s_childDocumentsList}`) as HTMLElement;

    $childDocuments.addEventListener("click", handleClickAnchor);
  };

  const documentLinks = documents
    .map(
      (childDocument) => `
      <li><a href="/documents/${childDocument.id}">${childDocument.title}</a></li>`,
    )
    .join("");

  return {
    element: `
    <ul class="${s_childDocumentsList}">
        ${documentLinks}
    </ul>
`,
    bindEvents,
  };
}

export default ChildDocumentLinks;
