import PostList from "./components/PostList.js";
import PostEditPage from "./pages/PostEditPage.js";

import { initRouter, push } from "./utils/router.js";
import { request } from "./utils/api.js";

export default function App({ $target }) {
  const postList = new PostList({
    $target,
    initialState: [],
    handleDeletePost: async (selectedId) => await fetchDeletePost(selectedId),
    handleAddPost: async (selectedId) => await fetchAddPost(selectedId),
  });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      id: "new",
      post: {
        title: "제목 없음",
        content: "",
      },
    },
  });

  this.route = async () => {
    const posts = await request("/documents");
    postList.setState(posts);

    const { pathname } = window.location;

    // 루트 경로일 때 편집기가 보이지 않도록 설정
    if (pathname === "/" && $target.querySelector(".post-edit")) {
      $target.removeChild($target.querySelector(".post-edit"));
      return;
    }

    // 이 부분은 함수로 빼서 fetchDeletePost에서도 쓰기
    if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");
      console.log("URL 변경");

      if (id !== "new") {
        const post = await request(`/documents/${id}`);
        postEditPage.setState({
          id,
          post,
        });
      }
    }
  };

  // 뒤로가기, 앞으로 가기 동작하도록
  window.addEventListener("popstate", () => this.route());

  this.route();

  initRouter(() => this.route());

  // fetch - "DELETE" 요청
  const fetchDeletePost = async (selectedId) => {
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
  const fetchAddPost = async (selectedId) => {
    const createdPost = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음",
        parent: selectedId,
      }),
    });
    push(`/documents/${createdPost.id}`);
  };
}
