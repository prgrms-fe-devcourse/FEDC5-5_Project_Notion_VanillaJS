import PostList from "../components/PostList.js";
import { request } from "../utils/api.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target: $page,
    initialState: [],
  });

  this.setState = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
