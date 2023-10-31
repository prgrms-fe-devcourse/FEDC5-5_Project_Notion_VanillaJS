import { request } from "./api.js";
import { push } from "./router.js";
import { validDocument } from "./validation.js";

// fetch - "POST" 요청
export const fetchAddDocument = async (selectedId) => {
  const createdDocument = await request(`/documents`, {
    method: "POST",
    body: JSON.stringify({
      title: "",
      parent: selectedId,
    }),
  });
  push(`/documents/${createdDocument.id}`);
};

// fetch - "PUT" 요청
export const fetchPutDocument = async (selectedId, editedDocument) => {
  try {
    validDocument(editedDocument);
  } catch (error) {
    console.error(error);
  }

  await request(`/documents/${selectedId}`, {
    method: "PUT",
    body: JSON.stringify(editedDocument),
  });
};

// fetch - "DELETE" 요청
export const fetchDeleteDocument = async (selectedId) => {
  await request(`/documents/${selectedId}`, {
    method: "DELETE",
  });

  const { pathname } = window.location;
  if (pathname === "/") {
    push("/");
    return;
  }

  if (pathname.indexOf("/documents/") === 0) {
    const [, , id] = pathname.split("/");

    // 선택된(편집 중인) 문서를 삭제하면 루트 경로로 이동
    if (parseInt(id) === selectedId) {
      push("/");
    } else {
      push(pathname);
    }
  }
};
