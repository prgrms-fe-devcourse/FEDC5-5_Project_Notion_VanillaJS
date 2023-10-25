import PostsPage from "./PostsPage.js";
import PostEditPage from "./PostEditPage.js";
import { initRouter } from "./router.js";

// /posts/{id} -> id에 해당하는 post 생성
// /posts/new -> 새 post 생성
export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });
  const postEditPage = new PostEditPage({
    $target,
    initialState: { postId: "new", post: { title: "", content: "" } },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      postsPage.render();
    } else if (pathname.indexOf("/document/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
