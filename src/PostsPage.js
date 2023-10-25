import PostList from "./PostList.js";
import { request } from "./api.js";
import { push } from "./router.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");

  const postList = new PostList({ $target, initialState: [] });

  const $newPostButton = document.createElement("button");
  $newPostButton.textContent = "New Post";
  $page.appendChild($newPostButton);

  $newPostButton.addEventListener("click", () => {
    push("/documents/new");
  });

  const fetchPosts = async () => {
    const posts = await request("/documents");

    postList.setState(posts);
  };

  this.render = async () => {
    await fetchPosts();
    $target.appendChild($page);
  };
}
