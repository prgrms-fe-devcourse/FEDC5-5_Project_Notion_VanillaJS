import debounce from "lodash.debounce";

import { createComponent, useEffect, useState } from "@/core";
import { ChildDocumentLinks, NotFound } from "@/components";
import { getDocument } from "@/apis";
import { DocumentMeta, DocumentPutRequest, DocumentPutResponse } from "@/types";
import styles from "./editor.module.scss";

const { s_editorForm, s_editorInput, s_editorContent, s_childDocuments } = styles;

interface EditorProps {
  documentId: number;
  modifyDocument: ({ id, title, content }: DocumentPutRequest) => Promise<DocumentPutResponse>;
}

function Editor({ documentId, modifyDocument }: EditorProps) {
  const [childDocuments, setChildDocuments] = useState<DocumentMeta[]>([]);
  const [documentForm, setDocumentForm] = useState({ title: "", content: "" });
  const [isDocumentNotFound, setIsDocumentNotFound] = useState(false);

  useEffect(() => {
    const fetchDocument = async (id: number) => {
      try {
        const { title, content, documents } = await getDocument(id);

        setDocumentForm({ title, content: content ?? "" });
        setChildDocuments(documents);
        setIsDocumentNotFound(false);
      } catch (error) {
        console.error(error);
        setIsDocumentNotFound(true);
      }
    };

    fetchDocument(documentId);
  }, [documentId]);

  const debouncedUpdate = debounce(async (title, content) => {
    try {
      const modifiedDocument = await modifyDocument({ id: documentId, title, content });

      setDocumentForm({ title: modifiedDocument.title, content: modifiedDocument.content });
    } catch (error) {
      console.error(error);
    }
  }, 1000);

  const handleKeydownForm = (event: Event) => {
    event.preventDefault();

    const $title = window.document.querySelector("#title") as HTMLInputElement;
    const $content = window.document.querySelector("#content") as HTMLDivElement;
    const $childDocuments = window.document.querySelector(`.${s_childDocuments}`) as HTMLDivElement;

    const contentHtmlWithoutLinks =
      $content.innerHTML && $childDocuments
        ? $content.innerHTML.replace($childDocuments.outerHTML, "")
        : $content.innerHTML || "";

    if (!$title.value) {
      $title.setAttribute("placeholder", "제목을 입력해주세요");
    }

    const title = $title.value || "Untitled";

    debouncedUpdate(title, contentHtmlWithoutLinks);
  };

  const childDocumentLinksComponent = createComponent(ChildDocumentLinks, { documents: childDocuments });

  const bindEvents = () => {
    const $form = window.document.querySelector(`.${s_editorForm}`) as HTMLFormElement;

    $form.addEventListener("keyup", handleKeydownForm);
    childDocumentLinksComponent.bindEvents?.();
  };

  if (isDocumentNotFound) {
    return createComponent(NotFound);
  }

  return {
    element: `
      <form class=${s_editorForm}>
        <fieldset>
          <legend class="a11yHidden">새 문서 작성</legend>
          <label for="title" class="a11yHidden">제목</label>
          <input id="title" type="text" class="${s_editorInput}" value="${documentForm.title}" placeholder="제목을 입력해주세요"/>
          <div id="content" class="${s_editorContent}" contenteditable="true">
            ${documentForm.content}
          </div>
          <div class="${s_childDocuments}" contenteditable="false">
            ${childDocumentLinksComponent.element}
          </div>
        </fieldset>
      </form>
           
    `,
    bindEvents,
  };
}

export default Editor;
