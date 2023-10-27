import PostList from "../components/PostList/PostList.js";
import PostListTitle from "../components/PostList/PostListTitle.js";

import { fetchDeletePost, fetchAddPost } from "../utils/fetch.js";

export default function PostListPage({ $target }) {
  const $postListPage = document.createElement("div");
  $postListPage.className = "post-list-page";
  $target.appendChild($postListPage);

  new PostListTitle({
    $target: $postListPage,
  });

  const postList = new PostList({
    $target: $postListPage,
    initialState: {
      posts: [],
      selectedId: null,
    },
    handleDeletePost: async (selectedId) => await fetchDeletePost(selectedId),
    handleAddPost: async (selectedId) => await fetchAddPost(selectedId),
  });

  this.setState = (nextState) => {
    postList.setState(nextState);
  };
}
