import { request } from "./api.js";
import { push } from "./router.js";
import { validPost } from "./validation.js";

// fetch - "POST" 요청
export const fetchAddPost = async (selectedId) => {
  const createdPost = await request(`/documents`, {
    method: "POST",
    body: JSON.stringify({
      title: "",
      parent: selectedId,
    }),
  });
  push(`/documents/${createdPost.id}`);
};

// fetch - "PUT" 요청
export const fetchPutPost = async (selectedId, editedPost) => {
  try {
    validPost(editedPost);
  } catch (error) {
    console.error(error);
  }

  await request(`/documents/${selectedId}`, {
    method: "PUT",
    body: JSON.stringify(editedPost),
  });
};

// fetch - "DELETE" 요청
export const fetchDeletePost = async (selectedId) => {
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
