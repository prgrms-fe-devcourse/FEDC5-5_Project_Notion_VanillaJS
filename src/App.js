import PostsPage from "./pages/PostsPage.js";
import PostEditPage from "./pages/PostEditPage.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      id: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      postsPage.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");
      postsPage.setState();
      postEditPage.setState({
        id,
      });
    }
  };

  // 뒤로가기, 앞으로 가기 동작하도록
  window.addEventListener("popstate", () => this.route());

  this.route();

  initRouter(() => this.route());
}
