import PostsPage from "./pages/PostsPage.js";
import PostEditPage from "./pages/PostEditPage.js";

export default function App({ $target }) {
  // const postsPage = new PostsPage({ $target });
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

  // postsPage.setState();
  postEditPage.setState({ id: 102693 });
}
