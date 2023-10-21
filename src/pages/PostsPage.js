import PostList from "../components/PostList.js";
import { request } from "../utils/api.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "post-list";

  const postList = new PostList({
    $target: $page,
    initialState: [],
    handleDeletePost: async (id) => await fetchDeletePost(id),
  });

  this.setState = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchDeletePost = async (id) => {
    await request(`/documents/${id}`, {
      method: "DELETE",
    });
    this.setState();
  };
}
