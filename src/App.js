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
      console.log("this.route: /");
      postsPage.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");
      postEditPage.setState({
        id,
      });
      postsPage.setState();
    }
  };

  this.route();

  initRouter(() => this.route());
}
