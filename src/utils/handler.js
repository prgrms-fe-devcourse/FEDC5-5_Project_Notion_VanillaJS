import { fetchAddDocument, fetchDeleteDocument } from "./fetch.js";
import { push } from "./router.js";

const handleToggle = (event) => {
  const $childrenUl = event.target.closest("li").querySelector(".toggle-ul");

  if ($childrenUl.children[0] === "div") {
    return;
  }

  const $toggleImg = event.target;

  if ($childrenUl.classList.contains("toggle-off")) {
    $childrenUl.classList.remove("toggle-off");
    $toggleImg.src = "/src/icons/arrow-bottom.svg";
  } else {
    $childrenUl.classList.add("toggle-off");
    $toggleImg.src = "/src/icons/arrow-right.svg";
  }
};

const handleAddDocument = async (
  isRoot = false,
  selectedId = "",
  event = {}
) => {
  push(`/documents/new`);
  await fetchAddDocument(selectedId);

  if (!isRoot) {
    handleToggle(event);
  }
};

const handleDeleteDocument = async (selectedId) => {
  await fetchDeleteDocument(selectedId);
};

const handleClickDocument = (selectedId) => {
  const { pathname } = location;

  if (pathname === "/") {
    push(`/documents/${selectedId}`);
  }

  if (pathname.indexOf("/documents/") === 0) {
    const [, , currentId] = pathname.split("/");

    if (currentId !== selectedId) {
      push(`/documents/${selectedId}`);
    }
  }
};

export const handleClickEvent = (event) => {
  // 루트 문서 생성
  if (event.target.closest("div").matches(".add-root-document")) {
    handleAddDocument(true);
    return;
  }

  if (!event.target.closest("li")) return;
  const { id } = event.target.closest("li").dataset;

  // 문서 열람 & 편집
  if (event.target.matches(".document-title")) {
    handleClickDocument(id);
    return;
  }

  // 문서 삭제
  if (event.target.matches(".delete-document-img")) {
    handleDeleteDocument(id);
    return;
  }

  // 자식 문서 생성
  if (event.target.matches(".add-child-img")) {
    handleAddDocument(false, id, event);
    return;
  }

  // 하위 문서 토글
  if (event.target.matches(".toggle-img")) {
    handleToggle(event);
    return;
  }
};
