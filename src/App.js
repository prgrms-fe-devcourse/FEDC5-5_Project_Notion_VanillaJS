import PostsPage from "./pages/PostsPage.js";
import PostEditPage from "./pages/PostEditPage.js";

export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });
  // const postEditPage = new PostEditPage({ $target, initialState: DUMMY_DATA[0] });

  postsPage.setState();
}
