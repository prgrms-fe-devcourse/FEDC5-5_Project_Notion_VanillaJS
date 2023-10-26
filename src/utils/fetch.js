import { request } from "./api.js";
import { push } from "./router.js";

// fetch - "DELETE" 요청
export const fetchDeletePost = async (selectedId) => {
  await request(`/documents/${selectedId}`, {
    method: "DELETE",
  });

  // 함수로 빼기
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

// fetch - "POST" 요청
export const fetchAddPost = async (selectedId) => {
  const createdPost = await request(`/documents`, {
    method: "POST",
    body: JSON.stringify({
      title: "제목 없음",
      parent: selectedId,
    }),
  });
  push(`/documents/${createdPost.id}`);
};
