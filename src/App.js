import Sidebar from "./components/Sidebar/Sidebar.js";
import PostEditPage from "./components/Editor/PostEditPage.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  const sidebar = new Sidebar({ $target });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname.indexOf("/documents/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    } else {
      sidebar.setState();
    }
  };

  this.route();

  initRouter(() => this.route());
}
