import { push } from "../../../utils/index.js";

export default function DocumentLink({ $target, id, title }) {
  const $documentLinkWrapper = document.createElement("div");
  $documentLinkWrapper.contentEditable = false;
  $target.appendChild($documentLinkWrapper);

  const $documentLink = document.createElement("a");
  $documentLink.className = "document-link";
  $documentLink.innerText = title;

  $documentLinkWrapper.appendChild($documentLink);

  $documentLink.addEventListener("click", (event) => {
    event.preventDefault();
    push(`${id}`);
  });

  return $documentLink;
}
