import PostList from "./components/PostList.js";
import PostEditPage from "./pages/PostEditPage.js";

import { initRouter, push } from "./utils/router.js";
import { request } from "./utils/api.js";

export default function App({ $target }) {
  const postList = new PostList({
    $target,
    initialState: [],
    handleDeletePost: async (id) => await fetchDeletePost(id),
    handleAddPost: async () => await fetchAddPost(),
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

    // if (pathname === "/") {
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

  const fetchDeletePost = async (id) => {
    await request(`/documents/${id}`, {
      method: "DELETE",
    });

    const posts = await request("/documents");
    postList.setState(posts);
  };

  const fetchAddPost = async () => {
    const createdPost = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음",
      }),
    });
    push(`/documents/${createdPost.id}`);
  };
}
